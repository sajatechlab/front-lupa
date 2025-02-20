import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { InvoiceTable } from './InvoiceTable'

export const DocumentsContent = () => {
  return (
    <div className="flex-1 p-8 bg-background text-foreground transition-colors duration-200">
      <Tabs defaultValue="RECEIVED" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="RECEIVED">Recibidos</TabsTrigger>
          <TabsTrigger value="SENT">Enviados</TabsTrigger>
        </TabsList>
        <TabsContent value="RECEIVED">
          <InvoiceTable type="RECEIVED" />
        </TabsContent>
        <TabsContent value="SENT">
          <InvoiceTable type="SENT" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
