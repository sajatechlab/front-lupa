import { motion } from "framer-motion";
import DianExtractorSection from "./DianExtractorSection";

export const DashboardContent = () => {
  return (
    <div className="flex-1 p-8 bg-[#1A1F2C] text-white">
      <DianExtractorSection />
    </div>
  );
};