import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Github, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Promotion Banner */}
      <div className="bg-gradient-to-r from-cyan-500 to-teal-400 p-2 text-center text-sm text-white">
        <span>¡Usa LUPADIAN24 para un 25% descuento! </span>
        <Button variant="secondary" size="sm" className="ml-2 bg-gray-800 text-white hover:bg-gray-700">
          Compra ahora
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex items-center justify-between p-4">
        <Link to="/" className="flex items-center gap-2">
          <img src="/lovable-uploads/66b90c17-c299-4882-a96a-de4eec089feb.png" alt="Logo" className="h-8 w-8" />
          <span className="font-bold">LUPA IA</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/#features" className="text-sm hover:text-primary">Funcionalidad</Link>
          <Link to="/#testimonials" className="text-sm hover:text-primary">Testimonios</Link>
          <Link to="/#pricing" className="text-sm hover:text-primary">Precio</Link>
          <Link to="/#blog" className="text-sm hover:text-primary">Blogs</Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <img src="/lovable-uploads/66b90c17-c299-4882-a96a-de4eec089feb.png" alt="Logo" className="h-12 w-12 mx-auto mb-4" />
            <h1 className="text-2xl font-bold">Signin to Foxtrot</h1>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Input type="email" placeholder="Email Address" />
              </div>
              <div>
                <Input type="password" placeholder="Password" />
              </div>
              <Button className="w-full" type="submit">
                Sign In
              </Button>
            </form>

            <div className="mt-4 text-center text-sm text-muted-foreground">
              or
            </div>

            <div className="mt-4 space-y-2">
              <Button variant="outline" className="w-full" type="button">
                <Twitter className="mr-2 h-4 w-4" />
                Iniciar sesión con Twitter
              </Button>
              <Button variant="outline" className="w-full" type="button">
                <Github className="mr-2 h-4 w-4" />
                Iniciar sesión con GitHub
              </Button>
              <Button variant="outline" className="w-full" type="button">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
                  />
                </svg>
                Iniciar sesión con Google
              </Button>
            </div>

            <div className="mt-6 text-center text-sm">
              <Link to="/signup" className="text-primary hover:underline">
                Click here to Sign Up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="py-6 border-t">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/lovable-uploads/66b90c17-c299-4882-a96a-de4eec089feb.png" alt="Logo" className="h-8 w-8" />
            <span>LUPA IA</span>
          </div>
          <div className="flex gap-6 text-sm">
            <Link to="/#features" className="text-muted-foreground hover:text-primary">Funcionalidad</Link>
            <Link to="/#testimonials" className="text-muted-foreground hover:text-primary">Testimonios</Link>
            <Link to="/#pricing" className="text-muted-foreground hover:text-primary">Precio</Link>
            <Link to="/#blog" className="text-muted-foreground hover:text-primary">Blogs</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;