import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";
import { SidebarLinks } from "./SidebarLinks";
import { UserProfile } from "./UserProfile";

interface DashboardSidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  userName: string | null;
  userEmail: string | null;
}

export const DashboardSidebar = ({ open, setOpen, userName, userEmail }: DashboardSidebarProps) => {
  return (
    <motion.div
      className="hidden md:flex flex-col w-[300px] bg-[#222222] p-4 shadow-xl"
      animate={{ width: open ? "300px" : "70px" }}
    >
      <div className="flex justify-between items-center mb-8">
        {open ? <Logo /> : <div className="w-8 h-8 bg-white rounded" />}
        <button
          onClick={() => setOpen(!open)}
          className="p-2 hover:bg-[#333333] rounded-lg transition-colors"
        >
          <ArrowLeft className={`h-5 w-5 text-white transition-transform ${!open ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <SidebarLinks open={open} />
      <UserProfile open={open} userName={userName} userEmail={userEmail} />
    </motion.div>
  );
};