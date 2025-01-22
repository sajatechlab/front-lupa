import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { MobileSidebar } from "@/components/dashboard/MobileSidebar";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email);
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

  return (
    <div className="flex h-screen bg-[#1A1F2C] font-sans">
      <DashboardSidebar 
        open={open} 
        setOpen={setOpen}
        userName={userName}
        userEmail={userEmail}
      />
      <MobileSidebar 
        open={open} 
        setOpen={setOpen}
        userName={userName}
        userEmail={userEmail}
      />
      <DashboardContent />
    </div>
  );
};

export default Dashboard;