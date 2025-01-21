import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Home,
  User,
  Settings,
  LogOut,
  FileText,
  Terminal,
  MessageSquare,
  Heart, // Replacing Sponsor with Heart icon
  Menu,
  X,
  ArrowLeft
} from "lucide-react";
import Logo from "@/components/Logo";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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

  const primaryLinks = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <Home className="h-5 w-5 text-neutral-200" />
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: <User className="h-5 w-5 text-neutral-200" />
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5 text-neutral-200" />
    }
  ];

  const secondaryLinks = [
    {
      label: "Documentation",
      href: "#",
      icon: <FileText className="h-5 w-5 text-neutral-200" />
    },
    {
      label: "API Reference",
      href: "#",
      icon: <Terminal className="h-5 w-5 text-neutral-200" />
    },
    {
      label: "Support",
      href: "#",
      icon: <MessageSquare className="h-5 w-5 text-neutral-200" />
    },
    {
      label: "Sponsor",
      href: "#",
      icon: <Heart className="h-5 w-5 text-neutral-200" />
    }
  ];

  return (
    <div className="flex h-screen bg-[#1A1F2C]">
      {/* Desktop Sidebar */}
      <motion.div
        className="hidden md:flex flex-col w-[300px] bg-[#222222] p-4"
        animate={{ width: open ? "300px" : "70px" }}
      >
        <div className="flex justify-between items-center mb-8">
          {open ? <Logo /> : <div className="w-8 h-8 bg-white rounded" />}
          <button
            onClick={() => setOpen(!open)}
            className="p-2 hover:bg-[#333333] rounded-lg"
          >
            <ArrowLeft className={`h-5 w-5 text-white transition-transform ${!open ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="flex-1">
          <div className="space-y-2">
            {primaryLinks.map((link, idx) => (
              <motion.a
                key={idx}
                href={link.href}
                className="flex items-center space-x-3 p-2 rounded-lg text-white hover:bg-[#333333] transition-colors"
              >
                {link.icon}
                {open && <span>{link.label}</span>}
              </motion.a>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 p-2 rounded-lg text-white hover:bg-[#333333] transition-colors"
            >
              <LogOut className="h-5 w-5 text-neutral-200" />
              {open && <span>Logout</span>}
            </button>
          </div>

          <div className="my-4 border-t border-[#333333]" />

          <div className="space-y-2">
            {secondaryLinks.map((link, idx) => (
              <motion.a
                key={idx}
                href={link.href}
                className="flex items-center space-x-3 p-2 rounded-lg text-white hover:bg-[#333333] transition-colors"
              >
                {link.icon}
                {open && <span>{link.label}</span>}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-[#333333]">
          <div className="flex items-center space-x-3 p-2">
            <div className="w-8 h-8 rounded-full bg-[#333333]" />
            {open && (
              <div className="text-white">
                <p className="font-medium">{userName}</p>
                <p className="text-sm text-neutral-400">{userEmail}</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="fixed top-4 left-4 z-40 p-2 bg-[#222222] rounded-lg"
        >
          <Menu className="h-6 w-6 text-white" />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-0 bg-[#222222] z-30 p-4"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4"
              >
                <X className="h-6 w-6 text-white" />
              </button>

              <div className="mt-16 space-y-4">
                {/* Mobile menu items */}
                {primaryLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    className="flex items-center space-x-3 p-2 rounded-lg text-white hover:bg-[#333333]"
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </a>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 p-2 rounded-lg text-white hover:bg-[#333333]"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>

                <div className="my-4 border-t border-[#333333]" />

                {secondaryLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    className="flex items-center space-x-3 p-2 rounded-lg text-white hover:bg-[#333333]"
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-[#222222] rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-[400px] bg-[#222222] rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
