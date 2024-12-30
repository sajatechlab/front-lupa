import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { extractFilesFromZip, uploadFiles } from './fileUtils.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
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
    
    // Extract files from ZIP
    const zipArrayBuffer = await zipFile.arrayBuffer()
    const { xmlContent, pdfFile, xmlFileName, pdfFileName } = await extractFilesFromZip(zipArrayBuffer)

    if (!xmlContent || !pdfFile || !xmlFileName || !pdfFileName) {
      throw new Error('ZIP file must contain both XML and PDF files')
    }

    // Upload files to storage and get public URLs
    const { xmlUrl, pdfUrl, zipUrl } = await uploadFiles(supabase, invoiceId, {
      xmlContent,
      xmlFileName,
      pdfFile,
      pdfFileName,
      zipFile
    })

    // Insert file metadata
    const { error: filesError } = await supabase
      .from('invoice_files')
      .insert({
        id: crypto.randomUUID(),
        invoice_id: invoiceId,
        xml_url: xmlUrl,
        pdf_url: pdfUrl,
        zip_url: zipUrl
      })

    if (filesError) throw filesError

    return new Response(
      JSON.stringify({
        success: true,
        invoice_id: invoiceId,
        message: 'Files processed and stored successfully'
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