import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";
import { JSZip } from "https://deno.land/x/jszip@0.11.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface InvoiceData {
  company_id: string;
  invoice_number: string;
  invoice_prefix: string;
  cufe: string;
  vendor_nit: string;
  buyer_nit: string;
  issue_date: string;
  due_date: string;
  payment_method: string;
  subtotal: number;
  total_tax: number;
  total_amount: number;
}

interface InvoiceItem {
  item_name: string;
  description: string | null;
  quantity: number;
  unit_value: number;
  discount: number;
  tax_percent: number;
  tax_value: number;
  total_item_value: number;
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get form data
    const formData = await req.formData()
    const zipFile = formData.get('zip') as File
    const companyId = formData.get('company_id')

    if (!zipFile || !companyId) {
      throw new Error('Missing required files or company ID')
    }

    console.log('Processing ZIP file:', zipFile.name)

    // Generate a single UUID for the entire invoice process
    const invoiceId = crypto.randomUUID()
    
    // Read and process ZIP file
    const zipArrayBuffer = await zipFile.arrayBuffer()
    const zip = new JSZip()
    await zip.loadAsync(zipArrayBuffer)
    
    let xmlContent: string | null = null
    let pdfFile: Uint8Array | null = null
    let xmlFileName: string | null = null
    let pdfFileName: string | null = null

    // Extract files from ZIP
    for (const [filename, file] of Object.entries(zip.files)) {
      if (filename.toLowerCase().endsWith('.xml')) {
        xmlContent = await file.async('text')
        xmlFileName = filename
      } else if (filename.toLowerCase().endsWith('.pdf')) {
        pdfFile = await file.async('uint8array')
        pdfFileName = filename
      }
    }

    if (!xmlContent || !pdfFile) {
      throw new Error('ZIP file must contain both XML and PDF files')
    }

    // Parse XML content
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlContent, 'text/xml')

    if (!xmlDoc) {
      throw new Error('Failed to parse XML document')
    }

    // Extract invoice data from XML (simplified example - adjust according to your XML structure)
    const invoiceData: InvoiceData = {
      company_id: companyId as string,
      invoice_number: xmlDoc.querySelector('InvoiceNumber')?.textContent ?? '',
      invoice_prefix: xmlDoc.querySelector('InvoicePrefix')?.textContent ?? '',
      cufe: xmlDoc.querySelector('CUFE')?.textContent ?? '',
      vendor_nit: xmlDoc.querySelector('VendorNIT')?.textContent ?? '',
      buyer_nit: xmlDoc.querySelector('BuyerNIT')?.textContent ?? '',
      issue_date: xmlDoc.querySelector('IssueDate')?.textContent ?? '',
      due_date: xmlDoc.querySelector('DueDate')?.textContent ?? '',
      payment_method: xmlDoc.querySelector('PaymentMethod')?.textContent ?? '',
      subtotal: parseFloat(xmlDoc.querySelector('Subtotal')?.textContent ?? '0'),
      total_tax: parseFloat(xmlDoc.querySelector('TotalTax')?.textContent ?? '0'),
      total_amount: parseFloat(xmlDoc.querySelector('TotalAmount')?.textContent ?? '0'),
    }

    // Extract invoice items from XML
    const itemNodes = xmlDoc.querySelectorAll('InvoiceItem')
    const invoiceItems: InvoiceItem[] = Array.from(itemNodes).map(item => ({
      item_name: item.querySelector('Name')?.textContent ?? '',
      description: item.querySelector('Description')?.textContent ?? null,
      quantity: parseFloat(item.querySelector('Quantity')?.textContent ?? '0'),
      unit_value: parseFloat(item.querySelector('UnitValue')?.textContent ?? '0'),
      discount: parseFloat(item.querySelector('Discount')?.textContent ?? '0'),
      tax_percent: parseFloat(item.querySelector('TaxPercent')?.textContent ?? '0'),
      tax_value: parseFloat(item.querySelector('TaxValue')?.textContent ?? '0'),
      total_item_value: parseFloat(item.querySelector('TotalValue')?.textContent ?? '0'),
    }))

    // Upload files to storage
    const xmlPath = `invoices/${invoiceId}/${xmlFileName}`
    const pdfPath = `invoices/${invoiceId}/${pdfFileName}`
    const zipPath = `invoices/${invoiceId}/${zipFile.name}`

    // Upload all files to storage
    const [xmlUpload, pdfUpload, zipUpload] = await Promise.all([
      supabase.storage
        .from('invoice-files')
        .upload(xmlPath, new Blob([xmlContent], { type: 'application/xml' }), {
          contentType: 'application/xml',
          upsert: false
        }),
      supabase.storage
        .from('invoice-files')
        .upload(pdfPath, pdfFile, {
          contentType: 'application/pdf',
          upsert: false
        }),
      supabase.storage
        .from('invoice-files')
        .upload(zipPath, zipFile, {
          contentType: 'application/zip',
          upsert: false
        })
    ])

    if (xmlUpload.error) throw xmlUpload.error
    if (pdfUpload.error) throw pdfUpload.error
    if (zipUpload.error) throw zipUpload.error

    // Get public URLs for the uploaded files
    const [xmlUrl, pdfUrl, zipUrl] = await Promise.all([
      supabase.storage.from('invoice-files').getPublicUrl(xmlPath),
      supabase.storage.from('invoice-files').getPublicUrl(pdfPath),
      supabase.storage.from('invoice-files').getPublicUrl(zipPath)
    ])

    // Start a database transaction
    const { error: invoiceError } = await supabase
      .from('invoices')
      .insert({
        id: invoiceId,
        ...invoiceData
      })

    if (invoiceError) throw invoiceError

    // Insert invoice items
    const { error: itemsError } = await supabase
      .from('invoice_items')
      .insert(
        invoiceItems.map(item => ({
          invoice_id: invoiceId,
          ...item
        }))
      )

    if (itemsError) throw itemsError

    // Insert file metadata
    const { error: filesError } = await supabase
      .from('invoice_files')
      .insert({
        id: crypto.randomUUID(),
        invoice_id: invoiceId,
        xml_url: xmlUrl.data.publicUrl,
        pdf_url: pdfUrl.data.publicUrl,
        zip_url: zipUrl.data.publicUrl
      })

    if (filesError) throw filesError

    return new Response(
      JSON.stringify({
        success: true,
        invoice_id: invoiceId,
        message: 'Invoice processed successfully'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error processing invoice:', error)
    return new Response(
      JSON.stringify({
        error: 'Failed to process invoice',
        details: error.message
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})