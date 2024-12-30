import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    content: "Por fin dejé de digitar la información de la DIAN. Todo el proceso es ahora automático y sin errores.",
    author: "Leo Castro",
    role: "Senior Accountant",
    avatar: "LC"
  },
  {
    content: "Lupa SaaS nos ha permitido ahorrar horas de trabajo al automatizar tareas repetitivas. Es una solución imprescindible para cualquier negocio.",
    author: "María López",
    role: "CEO en Tech Solutions",
    avatar: "ML"
  },
  {
    content: "Esta aplicación transformó por completo la manera en que manejo mis datos. Fácil, rápida y segura. ¡Altamente recomendada!",
    author: "Manu Arora",
    role: "Senior Developer",
    avatar: "MA"
  },
  {
    content: "Gracias a esta herramienta, podemos manejar nuestra facturación electrónica sin complicaciones y cumplir con la DIAN fácilmente.",
    author: "Carlos Pérez",
    role: "Gerente Financiero",
    avatar: "CP"
  },
  {
    content: "Lupa SaaS ha hecho mi trabajo mucho más sencillo. Ahora tengo toda mi información organizada y accesible en la nube.",
    author: "Ana Rodríguez",
    role: "Consultora Independiente",
    avatar: "AR"
  },
  {
    content: "La integración con Azure y la automatización inteligente me permiten concentrarme en lo que realmente importa. ¡Increíble herramienta!",
    author: "Fernando Torres",
    role: "Analista de Datos",
    avatar: "FT"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-4">
          Lo que dicen nuestros usuarios
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Descubre cómo nuestra plataforma ha ayudado a mejorar los negocios de nuestros clientes. Sus palabras lo dicen todo.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-background">
              <CardContent className="p-6">
                <p className="mb-4 text-muted-foreground">{testimonial.content}</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;