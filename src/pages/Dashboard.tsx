import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/login');
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión exitosamente",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo cerrar sesión. Por favor intenta de nuevo.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 md:px-12 border-b">
        <div className="flex items-center gap-2">
          <img src="/lovable-uploads/66b90c17-c299-4882-a96a-de4eec089feb.png" alt="Logo" className="h-8 w-8" />
          <span className="font-bold">LUPA IA</span>
        </div>
        <Button 
          variant="ghost" 
          className="flex items-center gap-2" 
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </Button>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Bienvenido a LUPA</h1>
        <p className="text-lg text-muted-foreground mb-8">
          LUPA FE es una herramienta poderosa que ayuda a automatizar y digitalizar la facturación electrónica tuya o de tu negocio.
        </p>
        
        {/* Dashboard Content Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-sm border">
            <h3 className="font-semibold mb-2">Carga inteligente y validación automática</h3>
            <p className="text-sm text-muted-foreground">
              Sube tus archivos con un solo clic y nuestro sistema verifica automáticamente que toda la información esté en el formato correcto.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm border">
            <h3 className="font-semibold mb-2">Resumen interactivo de documentos</h3>
            <p className="text-sm text-muted-foreground">
              Obtén una visión clara de tus archivos. Nuestra plataforma organiza la información en tablas interactivas.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm border">
            <h3 className="font-semibold mb-2">Automatización inteligente en la nube</h3>
            <p className="text-sm text-muted-foreground">
              Procesamos tus documentos automáticamente, extrayendo datos clave con inteligencia artificial.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;