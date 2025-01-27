import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ExternalLink } from 'lucide-react'

const DianExtractorSection = () => {
  const [dianUrl, setDianUrl] = useState('')
  const [startDate, setStartDate] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formattedStartDate = startDate.replace(/-/g, '/')
    const today = new Date()
    const formattedEndDate = today
      .toISOString()
      .split('T')[0]
      .replace(/-/g, '/')

    console.log({
      dianUrl,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    })
    fetch('http://localhost:7042/tabledownload/full', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        authUrl: dianUrl,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        recibidos: true,
        enviados: true,
      }),
    })
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-foreground">
          Procesar Extracto DIAN
        </h2>
        <p className="text-muted-foreground">
          Ingrese la URL de la DIAN y seleccione una fecha de inicio para
          comenzar a procesar su extracto.
        </p>
      </div>

      <div className="mb-8 aspect-video bg-card rounded-lg overflow-hidden">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/3-Qrzwti8Go"
          title="Tutorial Extracto DIAN"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="mb-8 flex items-center justify-center">
        <a
          href="https://catalogo-vpfe.dian.gov.co/User/CompanyLogin"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-xl font-bold"
        >
          <ExternalLink className="h-6 w-6" />
          <span>Acceder al Catálogo DIAN</span>
        </a>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="dianUrl" className="text-foreground">
            URL DIAN
          </Label>
          <Input
            id="dianUrl"
            type="url"
            value={dianUrl}
            onChange={(e) => setDianUrl(e.target.value)}
            placeholder="https://catalogo-vpfe.dian.gov.co/..."
            className="bg-card border-input text-foreground placeholder:text-muted-foreground"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="startDate" className="text-foreground">
            Fecha de Inicio
          </Label>
          <Input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-card border-input text-foreground"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Procesar Extracto
        </Button>
      </form>
    </div>
  )
}

export default DianExtractorSection
