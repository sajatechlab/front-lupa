import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            ¡Es el momento de impulsar tu negocio!
          </h2>
          <p className="text-gray-400 mb-8">
            No pierdas más tiempo en procesos manuales. Automatiza y agiliza tu facturación electrónica con nuestra plataforma. Da el siguiente paso hacia la eficiencia.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Suscríbete Ahora
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;