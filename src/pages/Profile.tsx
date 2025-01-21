import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        setProfile(data);
      }
    };

    getProfile();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-8">Perfil</h1>
      {profile && (
        <div>
          <p>Nombre: {profile.display_name}</p>
          <p>Email: {profile.email}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;