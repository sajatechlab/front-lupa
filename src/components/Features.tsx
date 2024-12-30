import { FileText, BarChart2, Cloud, Database, Lock, Moon } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Carga inteligente y validación automática.",
      description: "Sube tus archivos con un solo clic y nuestro sistema verifica automáticamente que toda la información esté en el formato correcto. Sin errores, sin complicaciones."
    },
    {
      icon: <BarChart2 className="h-6 w-6" />,
      title: "Resumen interactivo de documentos.",
      description: "Obtén una visión clara de tus archivos. Nuestra plataforma organiza la información en tablas interactivas para que selecciones lo que necesitas procesar."
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "Automatización inteligente en la nube.",
      description: "Procesamos tus documentos automáticamente, extrayendo datos clave con inteligencia artificial y asegurando que estén listos para tus necesidades."
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Almacenamiento seguro en la nube.",
      description: "Tus archivos se guardan en Azure Blob Storage con seguridad de nivel empresarial, organizados con un ID único para que siempre puedas acceder a ellos fácilmente."
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Tus datos son tuyos. Privacidad garantizada.",
      description: "Tu información es privada y está protegida. Nunca rastreamos ni vendemos tus datos, porque entendemos el valor de tu privacidad."
    },
    {
      icon: <Moon className="h-6 w-6" />,
      title: "Modo oscuro para tu comodidad.",
      description: "Sabemos que los desarrolladores trabajan día y noche. Por eso, nuestra plataforma soporta modo oscuro para cuidar tu vista y tu estilo."
    }
  ];

  return (
    <section id="features" className="py-20 bg-muted/50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">
          Your analytics need at one place
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Imagine Google Analytics with 100 more features. That's Foxtrot. Even we don't like it.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-lg bg-background shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;