import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvoiceTable } from "./InvoiceTable";

export const DocumentsContent = () => {
  return (
    <div className="flex-1 p-8 bg-background text-foreground transition-colors duration-200">
      <Tabs defaultValue="received" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="received">Recibidos</TabsTrigger>
          <TabsTrigger value="sent">Enviados</TabsTrigger>
        </TabsList>
        <TabsContent value="received">
          <InvoiceTable type="received" />
        </TabsContent>
        <TabsContent value="sent">
          <InvoiceTable type="sent" />
        </TabsContent>
      </Tabs>
    </div>
  );
};