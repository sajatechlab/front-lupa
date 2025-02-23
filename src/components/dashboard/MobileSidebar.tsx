import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { SidebarLinks } from "./SidebarLinks";
import { UserProfile } from "./UserProfile";

interface MobileSidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  userName: string | null;
  userEmail: string | null;
}

export const MobileSidebar = ({ open, setOpen, userName, userEmail }: MobileSidebarProps) => {
  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-40 p-2 bg-[#2A2F3C] rounded-lg shadow-lg border border-[#9b87f5]/10"
      >
        <Menu className="h-6 w-6 text-[#9b87f5]" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 bg-[#1A1F2C] z-30 p-4 shadow-2xl"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-[#9b87f5]"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="mt-16">
              <SidebarLinks open={true} />
              <UserProfile open={true} userName={userName} userEmail={userEmail} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};