import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

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
    const xmlFile = formData.get('xml') as File
    const pdfFile = formData.get('pdf') as File
    const companyId = formData.get('company_id')

    if (!xmlFile || !pdfFile || !companyId) {
      throw new Error('Missing required files or company ID')
    }

    // Generate a single UUID for the entire invoice process
    const invoiceId = crypto.randomUUID()

    // Parse XML content
    const xmlText = await xmlFile.text()
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml')

    if (!xmlDoc) {
      throw new Error('Failed to parse XML document')
    }

    // Extract invoice data from XML (this is a simplified example)
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

    // Extract invoice items from XML (simplified example)
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

    // Start a transaction for all database operations
    const { error: transactionError } = await supabase.rpc('process_invoice', {
      p_invoice_id: invoiceId,
      p_invoice_data: invoiceData,
      p_invoice_items: invoiceItems,
    })

    if (transactionError) {
      throw transactionError
    }

    // Upload files to storage
    const xmlPath = `invoices/${invoiceId}/invoice.xml`
    const pdfPath = `invoices/${invoiceId}/invoice.pdf`

    const [xmlUpload, pdfUpload] = await Promise.all([
      supabase.storage
        .from('invoice-files')
        .upload(xmlPath, xmlFile, {
          contentType: 'application/xml',
          upsert: false
        }),
      supabase.storage
        .from('invoice-files')
        .upload(pdfPath, pdfFile, {
          contentType: 'application/pdf',
          upsert: false
        })
    ])

    if (xmlUpload.error) throw xmlUpload.error
    if (pdfUpload.error) throw pdfUpload.error

    // Get public URLs for the uploaded files
    const [xmlUrl, pdfUrl] = await Promise.all([
      supabase.storage
        .from('invoice-files')
        .getPublicUrl(xmlPath),
      supabase.storage
        .from('invoice-files')
        .getPublicUrl(pdfPath)
    ])

    // Insert file metadata
    const { error: fileMetadataError } = await supabase
      .from('invoice_files')
      .insert({
        id: crypto.randomUUID(),
        invoice_id: invoiceId,
        xml_url: xmlUrl.data.publicUrl,
        pdf_url: pdfUrl.data.publicUrl
      })

    if (fileMetadataError) {
      throw fileMetadataError
    }

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