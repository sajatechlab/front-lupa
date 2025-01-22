import { motion } from "framer-motion";

export const DashboardContent = () => {
  return (
    <div className="flex-1 p-8 bg-[#1A1F2C] text-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="h-24 bg-[#2A2F3C] rounded-lg shadow-lg border border-[#9b87f5]/10 hover:border-[#9b87f5]/30 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className="h-[400px] bg-[#2A2F3C] rounded-lg shadow-lg border border-[#9b87f5]/10 hover:border-[#9b87f5]/30 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.4 }}
          />
        ))}
      </div>
    </div>
  );
};