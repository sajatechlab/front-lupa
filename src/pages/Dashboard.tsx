import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email);
        // Get the user's profile data
        const { data: profile } = await supabase
          .from('profiles')
          .select('display_name')
          .eq('id', user.id)
          .single();
        
        setUserName(profile?.display_name || 'Usuario');
      }
    };

    getUserData();
  }, []);

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
        description: "No se pudo cerrar sesión. Por favor intenta de nuevo.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* User Info Banner */}
      <div className="bg-primary/10 py-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-lg">{userName}</h2>
              <p className="text-sm text-muted-foreground">{userEmail}</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              Cerrar sesión
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
        {/* Add your dashboard content here */}
      </div>
    </div>
  );
};

export default Dashboard;