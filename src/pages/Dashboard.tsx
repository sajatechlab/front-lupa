import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut, Upload, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "@supabase/auth-helpers-react";

interface Company {
  id: string;
  name: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const session = useSession();
  const [userCompanies, setUserCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");

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
      const { data: companies, error } = await supabase
        .from('user_companies')
        .select(`
          company:companies(
            id,
            name
          )
        `)
        .eq('user_id', session.user.id);

      if (error) {
        console.error('Error fetching companies:', error);
        return;
      }

      const formattedCompanies = companies
        .map(item => item.company)
        .filter((company): company is Company => company !== null);

      setUserCompanies(formattedCompanies);
      if (formattedCompanies.length > 0) {
        setSelectedCompany(formattedCompanies[0].id);
      }
    };

    fetchUserData();
  }, [session, navigate]);

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

  const handleCreateCompany = () => {
    navigate('/companyregistration');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 md:px-12 border-b">
        <div className="flex items-center gap-2">
          <img src="/lovable-uploads/66b90c17-c299-4882-a96a-de4eec089feb.png" alt="Logo" className="h-8 w-8" />
          <span className="font-bold">LUPA IA</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Bienvenido, {userName || 'Usuario'}
          </span>
          <Button 
            variant="ghost" 
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
          <h1 className="text-4xl font-bold">¡Hola {userName || 'Usuario'}!</h1>
          <Button 
            onClick={handleCreateCompany}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Crear empresa
          </Button>
        </div>

        {userCompanies.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-4">
              <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">
              Comencemos a automatizar la importación de documentos
            </h2>
            <p className="text-muted-foreground mb-6">
              Optimiza al máximo el tiempo de tus tareas contables
            </p>
            <Button onClick={handleCreateCompany}>
              Crear mi primera empresa
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Add your company-specific content here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;