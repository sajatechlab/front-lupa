-- Create storage bucket for invoice files
INSERT INTO storage.buckets (id, name, public)
VALUES ('invoice-files', 'invoice-files', true);

-- Set up storage policy to allow authenticated users to upload files
CREATE POLICY "Allow authenticated users to upload invoice files"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'invoice-files');

-- Allow authenticated users to read invoice files
CREATE POLICY "Allow authenticated users to read invoice files"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'invoice-files');