import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

export interface ParsedInvoice {
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

export interface ParsedInvoiceItem {
  item_name: string;
  description: string | null;
  quantity: number;
  unit_value: number;
  discount: number;
  tax_percent: number;
  tax_value: number;
  total_item_value: number;
}

export interface ParsedVendor {
  name: string;
  nit: string;
  address: string | null;
  phone: string | null;
  email: string | null;
}

export interface ParsedBuyer {
  name: string;
  nit: string;
  address: string | null;
  phone: string | null;
  email: string | null;
}

export function parseXMLContent(xmlContent: string) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
  
  if (!xmlDoc) {
    throw new Error('Failed to parse XML document');
  }

  return {
    invoice: parseInvoiceData(xmlDoc),
    items: parseInvoiceItems(xmlDoc),
    vendor: parseVendorData(xmlDoc),
    buyer: parseBuyerData(xmlDoc),
  };
}

function parseInvoiceData(xmlDoc: Document): ParsedInvoice {
  const getElementText = (selector: string) => xmlDoc.querySelector(selector)?.textContent || '';
  const getMonetaryAmount = (selector: string) => 
    parseFloat(xmlDoc.querySelector(selector)?.getAttribute('currencyID') === 'COP' 
      ? (xmlDoc.querySelector(selector)?.textContent || '0') 
      : '0');

  return {
    invoice_number: getElementText('cbc\\:ID'),
    invoice_prefix: getElementText('cac\\:CorporateRegistrationScheme > cbc\\:ID'),
    cufe: getElementText('cbc\\:UUID'),
    vendor_nit: getElementText('cac\\:AccountingSupplierParty cac\\:PartyTaxScheme > cbc\\:CompanyID'),
    buyer_nit: getElementText('cac\\:AccountingCustomerParty cac\\:PartyTaxScheme > cbc\\:CompanyID'),
    issue_date: getElementText('cbc\\:IssueDate'),
    due_date: getElementText('cbc\\:PaymentDueDate'),
    payment_method: getElementText('cac\\:PaymentMeans > cbc\\:PaymentMeansCode'),
    subtotal: getMonetaryAmount('cac\\:LegalMonetaryTotal > cbc\\:LineExtensionAmount'),
    total_tax: getMonetaryAmount('cac\\:LegalMonetaryTotal > cbc\\:TaxExclusiveAmount'),
    total_amount: getMonetaryAmount('cac\\:LegalMonetaryTotal > cbc\\:PayableAmount'),
  };
}

function parseInvoiceItems(xmlDoc: Document): ParsedInvoiceItem[] {
  const items: ParsedInvoiceItem[] = [];
  const invoiceLines = xmlDoc.querySelectorAll('cac\\:InvoiceLine');

  invoiceLines.forEach(line => {
    const quantity = parseFloat(line.querySelector('cbc\\:InvoicedQuantity')?.textContent || '0');
    const unitValue = parseFloat(line.querySelector('cac\\:Price > cbc\\:PriceAmount')?.textContent || '0');
    const totalValue = parseFloat(line.querySelector('cbc\\:LineExtensionAmount')?.textContent || '0');
    
    items.push({
      item_name: line.querySelector('cac\\:Item > cbc\\:Description')?.textContent || '',
      description: line.querySelector('cbc\\:Note')?.textContent || null,
      quantity,
      unit_value: unitValue,
      discount: 0, // If available in XML, update accordingly
      tax_percent: 0, // If available in XML, update accordingly
      tax_value: 0, // If available in XML, update accordingly
      total_item_value: totalValue,
    });
  });

  return items;
}

function parseVendorData(xmlDoc: Document): ParsedVendor {
  const supplierParty = xmlDoc.querySelector('cac\\:AccountingSupplierParty');
  
  return {
    name: supplierParty?.querySelector('cac\\:PartyName > cbc\\:Name')?.textContent || '',
    nit: supplierParty?.querySelector('cac\\:PartyTaxScheme > cbc\\:CompanyID')?.textContent || '',
    address: supplierParty?.querySelector('cac\\:AddressLine > cbc\\:Line')?.textContent || null,
    phone: supplierParty?.querySelector('cac\\:Contact > cbc\\:Telephone')?.textContent || null,
    email: supplierParty?.querySelector('cac\\:Contact > cbc\\:ElectronicMail')?.textContent || null,
  };
}

function parseBuyerData(xmlDoc: Document): ParsedBuyer {
  const customerParty = xmlDoc.querySelector('cac\\:AccountingCustomerParty');
  
  return {
    name: customerParty?.querySelector('cac\\:PartyName > cbc\\:Name')?.textContent || '',
    nit: customerParty?.querySelector('cac\\:PartyTaxScheme > cbc\\:CompanyID')?.textContent || '',
    address: customerParty?.querySelector('cac\\:AddressLine > cbc\\:Line')?.textContent || null,
    phone: customerParty?.querySelector('cac\\:Contact > cbc\\:Telephone')?.textContent || null,
    email: customerParty?.querySelector('cac\\:Contact > cbc\\:ElectronicMail')?.textContent || null,
  };
}