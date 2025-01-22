import { motion } from "framer-motion";
import DianExtractorSection from "./DianExtractorSection";

export const DashboardContent = () => {
  return (
    <div className="flex-1 p-8 bg-background text-foreground transition-colors duration-200">
      <DianExtractorSection />
    </div>
  );
};