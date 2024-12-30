import { JSZip } from "https://deno.land/x/jszip@0.11.0/mod.ts";
import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

interface ExtractedFiles {
  xmlContent: string | null;
  pdfFile: Uint8Array | null;
  xmlFileName: string | null;
  pdfFileName: string | null;
}

export async function extractFilesFromZip(zipArrayBuffer: ArrayBuffer): Promise<ExtractedFiles> {
  const zip = new JSZip();
  await zip.loadAsync(zipArrayBuffer);
  
  let xmlContent: string | null = null;
  let pdfFile: Uint8Array | null = null;
  let xmlFileName: string | null = null;
  let pdfFileName: string | null = null;

  for (const [filename, file] of Object.entries(zip.files)) {
    if (filename.toLowerCase().endsWith('.xml')) {
      xmlContent = await file.async('text');
      xmlFileName = filename;
    } else if (filename.toLowerCase().endsWith('.pdf')) {
      pdfFile = await file.async('uint8array');
      pdfFileName = filename;
    }
  }

  return { xmlContent, pdfFile, xmlFileName, pdfFileName };
}

export async function uploadFiles(
  supabase: SupabaseClient,
  invoiceId: string,
  files: {
    xmlContent: string;
    xmlFileName: string;
    pdfFile: Uint8Array;
    pdfFileName: string;
    zipFile: File;
  }
) {
  const xmlPath = `invoices/${invoiceId}/${files.xmlFileName}`;
  const pdfPath = `invoices/${invoiceId}/${files.pdfFileName}`;
  const zipPath = `invoices/${invoiceId}/${files.zipFile.name}`;

  const [xmlUpload, pdfUpload, zipUpload] = await Promise.all([
    supabase.storage
      .from('invoice-files')
      .upload(xmlPath, new Blob([files.xmlContent], { type: 'application/xml' }), {
        contentType: 'application/xml',
        upsert: false
      }),
    supabase.storage
      .from('invoice-files')
      .upload(pdfPath, files.pdfFile, {
        contentType: 'application/pdf',
        upsert: false
      }),
    supabase.storage
      .from('invoice-files')
      .upload(zipPath, files.zipFile, {
        contentType: 'application/zip',
        upsert: false
      })
  ]);

  if (xmlUpload.error) throw xmlUpload.error;
  if (pdfUpload.error) throw pdfUpload.error;
  if (zipUpload.error) throw zipUpload.error;

  const [xmlUrl, pdfUrl, zipUrl] = await Promise.all([
    supabase.storage.from('invoice-files').getPublicUrl(xmlPath),
    supabase.storage.from('invoice-files').getPublicUrl(pdfPath),
    supabase.storage.from('invoice-files').getPublicUrl(zipPath)
  ]);

  return { xmlUrl: xmlUrl.data.publicUrl, pdfUrl: pdfUrl.data.publicUrl, zipUrl: zipUrl.data.publicUrl };
}