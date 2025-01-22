import { Home, User, Settings, LogOut, FileText, Terminal, MessageSquare, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface SidebarLinksProps {
  open: boolean;
}

export const SidebarLinks = ({ open }: SidebarLinksProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

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
      icon: <Home className="h-5 w-5" />
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: <User className="h-5 w-5" />
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />
    }
  ];

  const secondaryLinks = [
    {
      label: "Documentation",
      href: "#",
      icon: <FileText className="h-5 w-5" />
    },
    {
      label: "API Reference",
      href: "#",
      icon: <Terminal className="h-5 w-5" />
    },
    {
      label: "Support",
      href: "#",
      icon: <MessageSquare className="h-5 w-5" />
    },
    {
      label: "Sponsor",
      href: "#",
      icon: <Heart className="h-5 w-5" />
    }
  ];

  return (
    <div className="flex-1">
      <div className="space-y-2">
        {primaryLinks.map((link, idx) => (
          <motion.a
            key={idx}
            href={link.href}
            className={`flex items-center space-x-3 p-2 rounded-lg text-foreground transition-colors ${
              location.pathname === link.href 
                ? 'bg-accent text-accent-foreground'
                : 'hover:bg-accent hover:text-accent-foreground'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {link.icon}
            {open && <span>{link.label}</span>}
          </motion.a>
        ))}
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 p-2 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <LogOut className="h-5 w-5" />
          {open && <span>Logout</span>}
        </button>
      </div>

      <div className="my-4 border-t border-border" />

      <div className="space-y-2">
        {secondaryLinks.map((link, idx) => (
          <motion.a
            key={idx}
            href={link.href}
            className="flex items-center space-x-3 p-2 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {link.icon}
            {open && <span>{link.label}</span>}
          </motion.a>
        ))}
      </div>
    </div>
  );
};