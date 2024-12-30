import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const getAnnualPrice = (monthlyPrice: number) => {
  const annualPrice = monthlyPrice * 12;
  const discount = annualPrice * 0.3; // 30% discount
  return Math.round(annualPrice - discount);
};

const plans = [
  {
    name: "Plan Básico",
    monthlyPrice: 9,
    description: "Ideal para pequeñas empresas o freelancers.",
    features: [
      "1 usuario",
      "Procesamiento de hasta 10 documentos por mes",
      "Resúmenes básicos de documentos",
      "1 integración con Azure Blob Storage",
      "Almacenamiento de 1GB",
      "Soporte por correo electrónico"
    ]
  },
  {
    name: "Plan Profesional",
    monthlyPrice: 29,
    description: "Perfecto para equipos medianos que gestionan documentos regularmente.",
    features: [
      "5 usuarios",
      "Procesamiento de hasta 100 documentos por mes",
      "Resúmenes avanzados con tablas interactivas",
      "5 integraciones con herramientas externas (Azure, SharePoint, etc.)",
      "Almacenamiento de 5GB",
      "Automatización avanzada con flujos de trabajo en Logic Apps",
      "Soporte prioritario por correo electrónico"
    ],
    popular: true
  },
  {
    name: "Plan Empresarial",
    monthlyPrice: 59,
    description: "La solución definitiva para grandes empresas.",
    features: [
      "Usuarios ilimitados",
      "Procesamiento de documentos ilimitado",
      "Resúmenes avanzados y analíticas personalizadas",
      "Integraciones ilimitadas con herramientas externas",
      "Almacenamiento ilimitado",
      "Automatización completa con inteligencia artificial",
      "Soporte dedicado con tiempo de respuesta garantizado"
    ]
  }
];

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 bg-muted/50">
      <div className="container">
        <h2 className="text-4xl font-bold text-center mb-4">
          Planes diseñados para tu negocio
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Disfruta de todas las funcionalidades que necesitas a un precio accesible. Optimiza tu negocio sin comprometer tu presupuesto.
        </p>
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center rounded-lg border p-1 bg-background">
            <Button 
              variant={!isAnnual ? "default" : "ghost"}
              onClick={() => setIsAnnual(false)}
            >
              Mensual
            </Button>
            <Button 
              variant={isAnnual ? "default" : "ghost"}
              onClick={() => setIsAnnual(true)}
            >
              Anual
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? "border-primary shadow-lg" : ""}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                    Más popular
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle>
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      ${isAnnual ? getAnnualPrice(plan.monthlyPrice) : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground">/{isAnnual ? 'año' : 'mes'}</span>
                  </div>
                </CardTitle>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <Button className="w-full mb-6" asChild>
                  <Link to="/signup">
                    Empieza ahora
                  </Link>
                </Button>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;