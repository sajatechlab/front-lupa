import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DianExtractorSection = () => {
  const [dianUrl, setDianUrl] = useState('');
  const [startDate, setStartDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ dianUrl, startDate });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-white">Procesar Extracto DIAN</h2>
        <p className="text-gray-300">
          Ingrese la URL de la DIAN y seleccione una fecha de inicio para comenzar a procesar su extracto.
        </p>
      </div>

      <div className="mb-8 aspect-video bg-[#2A2F3C] rounded-lg overflow-hidden">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/3-Qrzwti8Go"
          title="Tutorial Extracto DIAN"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="dianUrl" className="text-white">
            URL DIAN
          </Label>
          <Input
            id="dianUrl"
            type="url"
            value={dianUrl}
            onChange={(e) => setDianUrl(e.target.value)}
            placeholder="https://catalogo-vpfe.dian.gov.co/..."
            className="bg-[#2A2F3C] border-[#9b87f5]/30 text-white placeholder:text-gray-400"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="startDate" className="text-white">
            Fecha de Inicio
          </Label>
          <Input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-[#2A2F3C] border-[#9b87f5]/30 text-white"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
        >
          Procesar Extracto
        </Button>
      </form>
    </div>
  );
};

export default DianExtractorSection;