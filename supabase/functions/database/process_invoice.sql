CREATE OR REPLACE FUNCTION process_invoice(
  p_invoice_id UUID,
  p_invoice_data JSONB,
  p_invoice_items JSONB
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Insert main invoice record
  INSERT INTO invoices (
    id,
    company_id,
    invoice_number,
    invoice_prefix,
    cufe,
    vendor_nit,
    buyer_nit,
    issue_date,
    due_date,
    payment_method,
    subtotal,
    total_tax,
    total_amount
  )
  VALUES (
    p_invoice_id,
    (p_invoice_data->>'company_id')::UUID,
    p_invoice_data->>'invoice_number',
    p_invoice_data->>'invoice_prefix',
    p_invoice_data->>'cufe',
    p_invoice_data->>'vendor_nit',
    p_invoice_data->>'buyer_nit',
    (p_invoice_data->>'issue_date')::TIMESTAMP WITH TIME ZONE,
    (p_invoice_data->>'due_date')::TIMESTAMP WITH TIME ZONE,
    p_invoice_data->>'payment_method',
    (p_invoice_data->>'subtotal')::NUMERIC,
    (p_invoice_data->>'total_tax')::NUMERIC,
    (p_invoice_data->>'total_amount')::NUMERIC
  );

  -- Insert invoice items
  INSERT INTO invoice_items (
    id,
    invoice_id,
    item_name,
    description,
    quantity,
    unit_value,
    discount,
    tax_percent,
    tax_value,
    total_item_value
  )
  SELECT
    gen_random_uuid(),
    p_invoice_id,
    (item->>'item_name')::TEXT,
    (item->>'description')::TEXT,
    (item->>'quantity')::NUMERIC,
    (item->>'unit_value')::NUMERIC,
    (item->>'discount')::NUMERIC,
    (item->>'tax_percent')::NUMERIC,
    (item->>'tax_value')::NUMERIC,
    (item->>'total_item_value')::NUMERIC
  FROM jsonb_array_elements(p_invoice_items) AS item;

END;
$$;