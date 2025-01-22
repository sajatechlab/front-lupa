import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { InvoiceTable } from "./InvoiceTable";

export const DocumentsContent = () => {
  return (
    <div className="flex-1 p-8 bg-background text-foreground transition-colors duration-200">
      <InvoiceTable />
    </div>
  );
};