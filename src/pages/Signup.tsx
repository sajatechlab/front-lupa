import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    };
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleEmailSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('fullName') as string;

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      if (error) throw error;
      toast({
        title: "Registro exitoso",
        description: "Por favor verifica tu correo electrónico para continuar.",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo completar el registro. Por favor intenta de nuevo.",
      });
    }
  };

  const handleMicrosoftSignup = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'azure',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo iniciar sesión con Microsoft. Por favor intenta de nuevo.",
      });
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo iniciar sesión con Google. Por favor intenta de nuevo.",
      });
    }
  };

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
          <Link to="/blog" className="text-sm hover:text-primary">Blog</Link>
          <Link to="/#features" className="text-sm hover:text-primary">Funcionalidad</Link>
          <Link to="/#testimonials" className="text-sm hover:text-primary">Testimonios</Link>
          <Link to="/#pricing" className="text-sm hover:text-primary">Precio</Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <img src="/lovable-uploads/66b90c17-c299-4882-a96a-de4eec089feb.png" alt="Logo" className="h-12 w-12 mx-auto mb-4" />
            <h1 className="text-2xl font-bold">Registro para LUPA</h1>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmailSignup} className="space-y-4">
              <div>
                <Input 
                  type="text" 
                  name="fullName" 
                  placeholder="Nombre completo" 
                  required 
                />
              </div>
              <div>
                <Input 
                  type="email" 
                  name="email" 
                  placeholder="Email" 
                  required 
                />
              </div>
              <div>
                <Input 
                  type="password" 
                  name="password" 
                  placeholder="Contraseña" 
                  required 
                />
              </div>
              <Button className="w-full bg-[#0F172A] hover:bg-[#1E293B]" type="submit">
                <Mail className="mr-2 h-4 w-4" />
                Registrarse
              </Button>
            </form>

            <div className="mt-4 text-center text-sm text-muted-foreground">
              o
            </div>

            <div className="mt-4 space-y-2">
              <Button 
                variant="outline" 
                className="w-full" 
                type="button" 
                onClick={handleMicrosoftSignup}
              >
                <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <path fill="currentColor" d="M24 4C12.954 4 4 12.954 4 24c0 8.727 5.371 16.192 12.974 19.391.021-.044.045-.087.067-.13l9.268-17.585-3.722-3.722L24 20.172l-2.121-2.121 3.722-3.722-3.722-3.722L24 8.485l2.121 2.121-3.722 3.722 3.722 3.722L24 20.172l1.414-1.414 3.722 3.722 9.268 17.585c.022.043.046.086.067.13C45.629 40.192 44 32.727 44 24c0-11.046-8.954-20-20-20z"/>
                </svg>
                Registrarse con Microsoft
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                type="button" 
                onClick={handleGoogleSignup}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Registrarse con Google
              </Button>
            </div>

            <div className="mt-6 text-center text-sm">
              <Link to="/login" className="text-primary hover:underline">
                ¿Ya tienes una cuenta? Inicia sesión aquí
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
            <Link to="/blog" className="text-muted-foreground hover:text-primary">Blog</Link>
            <Link to="/#features" className="text-muted-foreground hover:text-primary">Funcionalidad</Link>
            <Link to="/#testimonials" className="text-muted-foreground hover:text-primary">Testimonios</Link>
            <Link to="/#pricing" className="text-muted-foreground hover:text-primary">Precio</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Signup;