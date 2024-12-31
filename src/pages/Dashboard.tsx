import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "@supabase/auth-helpers-react";
import { Shield, Upload, Plus, LogOut } from "lucide-react";

interface Company {
  id: string;
  name: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const session = useSession();
  const [userName, setUserName] = useState("");
  const [userCompanies, setUserCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user) {
        navigate('/login');
        return;
      }

      // Fetch user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('id', session.user.id)
        .single();

      if (profile?.display_name) {
        setUserName(profile.display_name);
      }

      // Fetch user's companies
      const { data: companies } = await supabase
        .from('user_companies')
        .select(`
          company:companies(
            id,
            name
          )
        `)
        .eq('user_id', session.user.id);

      if (companies) {
        const formattedCompanies = companies
          .map(item => item.company)
          .filter((company): company is Company => company !== null);
        setUserCompanies(formattedCompanies);
      }
    };

    fetchUserData();
  }, [session, navigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
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
        description: "No se pudo cerrar sesión",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center gap-2">
          <img src="/lovable-uploads/66b90c17-c299-4882-a96a-de4eec089feb.png" alt="Logo" className="h-8 w-8" />
          <span className="font-bold">LUPA IA</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            ¡Hola {userName || 'Usuario'}!
          </span>
          <Button 
            variant="ghost" 
            size="sm"
            className="flex items-center gap-2" 
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">¡Hola {userName}!</h1>
          <Button 
            onClick={() => navigate('/companyregistration')}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Crear empresa
          </Button>
        </div>

        <div className="bg-green-50 p-6 rounded-lg mb-8">
          <div className="flex items-start gap-3">
            <Shield className="h-6 w-6 text-green-600" />
            <div>
              <h3 className="font-semibold text-green-800">Control de duplicados:</h3>
              <p className="text-green-700">
                Puedes subir documentos manualmente o sincronizar con la Dian las veces que necesites. 
                N1 detecta automáticamente si el documento ya existe.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-semibold mb-4">Opción 1</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">Conéctate con la Dian</h3>
              <p className="text-gray-600 mb-4">
                En menos de 3 minutos podremos importar todas las facturas emitidas a nombre de tu empresa.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Iniciar conexión →
              </Button>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">Opción 2</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">Sube tus documentos</h3>
              <p className="text-gray-600 mb-4">
                Puedes subir tus facturas electrónicas o notas crédito en formato ZIP o XML, 
                también cuentas de cobro o facturas internacionales en formato PDF.
              </p>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="font-medium">Click para cargar</p>
                <p className="text-sm text-gray-500">o arrastra y suelta aquí</p>
                <p className="text-xs text-gray-400 mt-2">ZIP, XLS, PDF, XML</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;