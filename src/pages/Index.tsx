import { Button } from "@/components/ui/button";
import { Github, Twitter } from "lucide-react";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import CallToAction from "@/components/CallToAction";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Promotion Banner */}
      <div className="bg-gradient-to-r from-cyan-500 to-teal-400 p-2 text-center text-sm text-white">
        <span>¡Usa LUPADIAN24 para un 25% descuento! </span>
        <Button variant="secondary" size="sm" className="ml-2 bg-gray-800 text-white hover:bg-gray-700">
          Compra ahora
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 md:px-12">
        <div className="flex items-center gap-2">
          <img src="/lovable-uploads/66b90c17-c299-4882-a96a-de4eec089feb.png" alt="Logo" className="h-8 w-8" />
          <span className="font-bold">LUPA IA</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/#features" className="text-sm hover:text-primary">Funcionalidad</Link>
          <Link to="/#testimonials" className="text-sm hover:text-primary">Testimonios</Link>
          <Link to="/#pricing" className="text-sm hover:text-primary">Precio</Link>
          <Link to="/blog" className="text-sm hover:text-primary">Blogs</Link>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">Registrarse</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-24 md:py-32 text-center md:px-12">
        <h1 className="mb-8 text-4xl font-bold md:text-6xl max-w-4xl mx-auto">
          Revoluciona la manera de tener tu facturación electrónica con <span className="text-cyan-500">LUPA</span>
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-muted-foreground text-lg">
          LUPA FE es una herramienta poderosa que ayuda a automatizar y digitalizar la facturación electrónica tuya o de tu negocio. Hazlo fácil.
        </p>
        <Button size="lg" asChild className="text-lg px-8 py-6">
          <Link to="/signup">Prueba gratis</Link>
        </Button>
      </section>

      <Features />
      <Testimonials />
      <Pricing />

      {/* Call to Action Section */}
      <CallToAction />

      {/* Footer */}
      <footer className="border-t py-12 mt-24">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <img src="/lovable-uploads/66b90c17-c299-4882-a96a-de4eec089feb.png" alt="Logo" className="h-8 w-8" />
              <span>LUPA IA</span>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
              </a>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 LUPA Marketing. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
