import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type Package = {
  title: string;
  description: string;
  monthly: number;
  yearly: number;
  features: string[];
  highlight?: boolean;
};

const packages = {
  starter: {
    title: "Plan Básico",
    description: "Ideal para pequeñas empresas o freelancers.",
    monthly: 9,
    yearly: 69,
    features: [
      "1 usuario",
      "Procesamiento de hasta 10 documentos por mes",
      "Resúmenes básicos de documentos",
      "1 integración con Azure Blob Storage",
      "Almacenamiento de 1GB",
      "Soporte por correo electrónico",
    ],
  },
  pro: {
    title: "Plan Profesional",
    description: "Perfecto para equipos medianos que gestionan documentos regularmente.",
    monthly: 29,
    yearly: 169,
    features: [
      "5 usuarios",
      "Procesamiento de hasta 100 documentos por mes",
      "Resúmenes avanzados con tablas interactivas",
      "5 integraciones con herramientas externas (Azure, SharePoint, etc.)",
      "Almacenamiento de 5GB",
      "Automatización avanzada con flujos de trabajo en Logic Apps",
      "Soporte prioritario por correo electrónico",
    ],
    highlight: true,
  },
  king: {
    title: "Plan Empresarial",
    description: "La solución definitiva para grandes empresas.",
    monthly: 59,
    yearly: 469,
    features: [
      "Usuarios ilimitados",
      "Procesamiento de documentos ilimitado",
      "Resúmenes avanzados y analíticas personalizadas",
      "Integraciones ilimitadas con herramientas externas",
      "Almacenamiento ilimitado",
      "Automatización completa con inteligencia artificial",
      "Soporte dedicado con tiempo de respuesta garantizado",
    ],
  },
};

const PricingCard = (props: Package & { type: "monthly" | "yearly" }) => {
  const { title, description, monthly, yearly, features, highlight, type } = props;
  const price = type === "monthly" ? monthly : yearly;

  return (
    <Card className={cn(
      "relative",
      highlight && "border-primary shadow-lg bg-primary text-primary-foreground"
    )}>
      {highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
            Más popular
          </span>
        </div>
      )}
      <CardHeader>
        <CardTitle>
          <h3 className="text-2xl font-bold">{title}</h3>
          <div className="mt-4">
            <span className="text-4xl font-bold">
              ${price}
            </span>
            <span className={cn(
              "text-muted-foreground",
              highlight && "text-primary-foreground/80"
            )}>/{type === "monthly" ? 'mes' : 'año'}</span>
          </div>
        </CardTitle>
        <p className={cn(
          "text-sm text-muted-foreground",
          highlight && "text-primary-foreground/80"
        )}>{description}</p>
      </CardHeader>
      <CardContent>
        <Button 
          className="w-full mb-6" 
          variant={highlight ? "secondary" : "default"}
          asChild
        >
          <Link to="/signup">
            Empieza ahora
          </Link>
        </Button>
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <ArrowRight className={cn(
                "h-4 w-4",
                highlight ? "text-primary-foreground" : "text-primary"
              )} />
              <span className={cn(
                "text-sm",
                highlight && "text-primary-foreground"
              )}>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const Pricing = () => {
  const [type, setType] = useState<"monthly" | "yearly">("monthly");

  return (
    <section id="pricing" className="py-24 bg-muted/50">
      <div className="container">
        <h2 className="text-4xl font-bold text-center mb-4">
          Sorpréndete con nuestros precios
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Disfruta de todas las funcionalidades que necesitas a un precio accesible. 
          Optimiza tu negocio sin comprometer tu presupuesto.
        </p>
        
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center rounded-lg border p-1 bg-background">
            <Button 
              variant={type !== "yearly" ? "default" : "ghost"}
              onClick={() => setType("monthly")}
            >
              Mensual
              {type === "monthly" && (
                <motion.span
                  animate={{ x: -10 }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-0 h-px inset-x-0 bg-gradient-to-r from-primary to-indigo-500 blur-[1px] z-50 mx-auto"
                />
              )}
            </Button>
            <Button 
              variant={type === "yearly" ? "default" : "ghost"}
              onClick={() => setType("yearly")}
            >
              Anual
              {type === "yearly" && (
                <motion.span
                  animate={{ x: 10 }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-0 h-px inset-x-0 bg-gradient-to-r from-primary to-indigo-500 blur-[1px] z-50 mx-auto"
                />
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingCard {...packages.starter} type={type} />
          <PricingCard {...packages.pro} type={type} />
          <PricingCard {...packages.king} type={type} />
        </div>
      </div>
    </section>
  );
};

export default Pricing;