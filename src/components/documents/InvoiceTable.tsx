import React, { useState, useEffect } from 'react'
import {
  ChevronDown,
  ChevronUp,
  FileText,
  FileJson,
  Archive,
  Search,
  Filter,
  X,
} from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/components/ui/use-toast'
import { startOfMonth, endOfMonth, format, parseISO } from 'date-fns'
import config from '../../config'
interface InvoiceTableProps {
  type: 'RECEIVED' | 'SENT'
}

export const InvoiceTable = ({ type }: InvoiceTableProps) => {
  const [expandedRows, setExpandedRows] = useState(new Set())
  const [selectedRows, setSelectedRows] = useState(new Set())
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    number: '',
    client: '',
    startDate: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
    endDate: format(endOfMonth(new Date()), 'yyyy-MM-dd'),
  })
  const [invoices, setInvoices] = useState<any[]>([])
  const [filteredInvoices, setFilteredInvoices] = useState<any[]>([])
  const { toast } = useToast()

  useEffect(() => {
    fetchInvoices()
  }, [type])

  const fetchInvoices = async () => {
    try {
      const response = await fetch(`${config.API_URL}/invoices?type=${type}`, {
        headers: {
          // Your auth headers here if needed
        },
      })

      if (!response.ok) throw new Error('Failed to fetch invoices')

      const invoicesData = await response.json()

      console.log(invoicesData)

      const formattedInvoices = invoicesData.map((invoice) => ({
        id: invoice.uuid,
        number: invoice.invoiceNumber,
        date: invoice.issueDate,
        thirdParty: invoice.thirdParty.name,
        //type === 'received' ? invoice.vendors.name : invoice.buyers.name,
        total: invoice.invoiceTaxInclusiveAmount,
        status:
          invoice.dueDate && new Date(invoice.dueDate) < new Date()
            ? 'Pendiente'
            : 'Pagada',
        details: invoice.note,
      }))

      setInvoices(formattedInvoices)
      setFilteredInvoices(formattedInvoices)
      console.log('formattedInvoices', formattedInvoices)
    } catch (error) {
      console.error('Error fetching invoices:', error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudieron cargar las facturas',
      })
    }
  }

  const handleDownload = async (
    type: 'pdf' | 'xml' | 'zip',
    invoice: any,
    e: React.MouseEvent
  ) => {
    e.preventDefault()
    try {
      if (
        !invoice.id ||
        !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
          invoice.id
        )
      ) {
        throw new Error('Invalid invoice ID format')
      }

      const { data: fileData, error } = await supabase
        .from('invoice_files')
        .select(`${type}_url`)
        .eq('cufe', invoice.id)
        .maybeSingle()

      if (error) throw error

      if (fileData && fileData[`${type}_url`]) {
        window.open(fileData[`${type}_url`], '_blank')
      } else {
        toast({
          variant: 'destructive',
          title: 'Archivo no encontrado',
          description: `No se encontró el archivo ${type.toUpperCase()}`,
        })
      }
    } catch (error) {
      console.error(`Error downloading ${type}:`, error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Error al descargar el archivo ${type.toUpperCase()}`,
      })
    }
  }

  const formatDisplayDate = (dateString: string) => {
    return format(parseISO(dateString), 'dd/MM/yyyy')
  }

  useEffect(() => {
    // const filtered = invoices.filter((invoice) => {
    //   const matchNumber = invoice.number
    //     .toLowerCase()
    //     .includes(filters.number.toLowerCase())
    //   const matchClient = invoice.thirdParty
    //     .toLowerCase()
    //     .includes(filters.client.toLowerCase())
    //   const invoiceDate = parseISO(invoice.date)
    //   const startDate = filters.startDate ? parseISO(filters.startDate) : null
    //   const endDate = filters.endDate ? parseISO(filters.endDate) : null
    //   const matchStartDate = !startDate || invoiceDate >= startDate
    //   const matchEndDate = !endDate || invoiceDate <= endDate
    //   return matchNumber && matchClient && matchStartDate && matchEndDate
    // })
    // setFilteredInvoices(filtered)
  }, [
    //filters,
    invoices,
  ])

  const resetFilters = () => {
    setFilters({
      number: '',
      client: '',
      startDate: '',
      endDate: '',
    })
  }

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value
    const currentEndDate = filters.endDate

    if (newStartDate > currentEndDate) {
      setFilters({
        ...filters,
        startDate: newStartDate,
        endDate: newStartDate,
      })
    } else {
      setFilters({
        ...filters,
        startDate: newStartDate,
      })
    }
  }

  // const toggleRow = (id: string) => {
  //   const newExpandedRows = new Set(expandedRows)
  //   if (expandedRows.has(id)) {
  //     newExpandedRows.delete(id)
  //   } else {
  //     newExpandedRows.add(id)
  //   }
  //   setExpandedRows(newExpandedRows)
  // }

  const toggleSelect = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const newSelectedRows = new Set(selectedRows)
    if (e.target.checked) {
      newSelectedRows.add(id)
    } else {
      newSelectedRows.delete(id)
    }
    setSelectedRows(newSelectedRows)
  }

  const hasActiveFilters = Object.values(filters).some((value) => value !== '')

  return (
    <div className="w-full p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          Facturas {type === 'received' ? 'Recibidas' : 'Enviadas'}
        </h2>
        <div className="relative">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg flex items-center gap-2 ${
              hasActiveFilters
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <Filter
              className={`w-5 h-5 ${
                hasActiveFilters ? 'text-blue-800' : 'text-gray-600'
              }`}
            />
            <span className="text-sm font-medium">Filtros</span>
            {hasActiveFilters && (
              <div className="w-2 h-2 rounded-full bg-blue-500 absolute top-1 right-1" />
            )}
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Filtros de búsqueda</h3>
            <div className="flex gap-2">
              <button
                onClick={resetFilters}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Limpiar filtros
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Número de Factura
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md pl-9"
                  placeholder="Buscar..."
                  value={filters.number}
                  onChange={(e) =>
                    setFilters({ ...filters, number: e.target.value })
                  }
                />
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Tercero
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md pl-9"
                  placeholder="Buscar..."
                  value={filters.client}
                  onChange={(e) =>
                    setFilters({ ...filters, client: e.target.value })
                  }
                />
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Fecha Inicio
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded-md"
                value={filters.startDate}
                onChange={handleStartDateChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Fecha Fin
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded-md"
                value={filters.endDate}
                min={filters.startDate}
                onChange={(e) =>
                  setFilters({ ...filters, endDate: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left w-8">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRows(
                        new Set(filteredInvoices.map((inv) => inv.id))
                      )
                    } else {
                      setSelectedRows(new Set())
                    }
                  }}
                  checked={
                    selectedRows.size === filteredInvoices.length &&
                    filteredInvoices.length > 0
                  }
                />
              </th>
              <th className="p-3 text-left w-8"></th>
              <th className="p-3 text-left">Número</th>
              <th className="p-3 text-left">Fecha</th>
              <th className="p-3 text-left">Tercero</th>
              <th className="p-3 text-right">Total</th>
              <th className="p-3 text-center">Estado</th>
              <th className="p-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((invoice) => (
              <React.Fragment key={invoice.id}>
                <tr
                  className={`border-b hover:bg-gray-50 ${
                    selectedRows.has(invoice.id) ? 'bg-blue-50' : ''
                  }`}
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectedRows.has(invoice.id)}
                      onChange={(e) => toggleSelect(invoice.id, e)}
                    />
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleRow(invoice.id)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      {expandedRows.has(invoice.id) ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </td>
                  <td className="p-3">{invoice.number}</td>
                  <td className="p-3">{formatDisplayDate(invoice.date)}</td>
                  <td className="p-3">{invoice.thirdParty}</td>
                  <td className="p-3 text-right">${invoice.total}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        invoice.status === 'Pagada'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={(e) => handleDownload('pdf', invoice, e)}
                        className="p-1 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-900"
                        title="Descargar PDF"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleDownload('xml', invoice, e)}
                        className="p-1 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-900"
                        title="Descargar XML"
                      >
                        <FileJson className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleDownload('zip', invoice, e)}
                        className="p-1 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-900"
                        title="Descargar ZIP"
                      >
                        <Archive className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedRows.has(invoice.id) && (
                  <tr>
                    <td colSpan={8} className="p-0">
                      <div className="bg-gray-50 p-4">
                        <table className="w-full">
                          <thead>
                            <tr className="text-sm text-gray-600">
                              <th className="p-2 text-left">Descripción</th>
                              <th className="p-2 text-right">Cantidad</th>
                              <th className="p-2 text-right">Precio</th>
                              <th className="p-2 text-right">Subtotal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {invoice.details.map((detail: any) => (
                              <tr key={detail.id} className="text-sm">
                                <td className="p-2">{detail.description}</td>
                                <td className="p-2 text-right">
                                  {detail.quantity}
                                </td>
                                <td className="p-2 text-right">
                                  ${detail.unit_value.toFixed(2)}
                                </td>
                                <td className="p-2 text-right">
                                  ${detail.total_item_value.toFixed(2)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
