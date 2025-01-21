import { Button } from "@/components/ui/button";
import { Container } from "@/components/Container";
import { GridPattern } from "@/components/GridPattern";
import Logo from "@/components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  AiOutlineGoogle,
} from "react-icons/ai";
import { SiMicrosoft } from "react-icons/si";

const Login = () => {
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

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo iniciar sesión. Por favor verifica tus credenciales e intenta de nuevo.",
      });
    }
  };

  const handleMicrosoftLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'azure',
        options: {
          scopes: 'email',
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

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
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

  const pattern = {
    y: -6,
    squares: [
      [-1, 2] as [number, number],
      [1, 3] as [number, number],
      ...Array.from({ length: 10 }, () => [
        Math.floor(Math.random() * 20) - 10,
        Math.floor(Math.random() * 20) - 10,
      ] as [number, number]),
    ],
  };

  const socialButtons = [
    {
      name: "Microsoft",
      icon: <SiMicrosoft className="text-blue-700 h-5 w-5" />,
      onClick: handleMicrosoftLogin,
    },
    {
      name: "Google",
      icon: <AiOutlineGoogle className="text-red-500 h-5 w-5" />,
      onClick: handleGoogleLogin,
    },
  ];

  return (
    <Container>
      <div className="min-h-[60rem] flex justify-center items-start">
        <div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
          <GridPattern
            width={120}
            height={120}
            x="50%"
            className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-5deg] fill-tertiary/[0.05] stroke-gray-100 dark:fill-primary dark:stroke-gray-100"
            {...pattern}
          />
        </div>
        <div className="px-10 py-20 rounded-xl bg-white shadow-lg w-[30rem] mt-10 md:mt-14 mx-4 relative z-10">
          <Logo />
          <h1 className="my-8 text-xl text-zinc-700 text-center">
            Iniciar sesión en LUPA
          </h1>
          <form onSubmit={handleEmailLogin}>
            <input
              type="email"
              className="w-full rounded-xl shadow-sm border border-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent mb-6 p-2"
              placeholder="Email"
              name="email"
            />
            <input
              type="password"
              className="w-full rounded-xl shadow-sm border border-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent mb-6 p-2"
              placeholder="Contraseña"
              name="password"
            />
            <Button
              type="submit"
              className="w-full rounded-2xl py-2"
            >
              Iniciar sesión
            </Button>
          </form>

          <div className="flex flex-row space-x-1 items-center mt-4">
            <div className="h-px w-1/2 bg-gray-200" />
            <span className="text-xs text-gray-500">o</span>
            <div className="h-px w-1/2 bg-gray-200" />
          </div>

          <div className="mt-4 flex mx-auto justify-center flex-col">
            {socialButtons.map((button, index) => (
              <button
                type="button"
                onClick={button.onClick}
                className="flex flex-row space-x-2 w-full mx-auto bg-gray-50 justify-center items-center py-4 my-2 rounded-2xl hover:bg-gray-100"
                key={`social-${index}`}
              >
                {button.icon}
                <span>Iniciar sesión con {button.name}</span>
              </button>
            ))}
          </div>
          <Link
            to="/signup"
            className="text-gray-600 block mt-4 text-xs text-center"
          >
            ¿No tienes una cuenta? Regístrate aquí
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Login;