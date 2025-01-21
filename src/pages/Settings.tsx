import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const getSettings = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Here you would fetch user settings from your database
        // For now we'll just show a placeholder
        setSettings({
          notifications: true,
          theme: 'light'
        });
      }
    };

    getSettings();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-8">Configuración</h1>
      {settings && (
        <div>
          <p>Notificaciones: {settings.notifications ? 'Activadas' : 'Desactivadas'}</p>
          <p>Tema: {settings.theme}</p>
        </div>
      )}
    </div>
  );
};

export default Settings;