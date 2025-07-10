import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Sparkles } from "lucide-react";

export function FloatingIcons() {
  const floatingIcons = [
    { Icon: TrendingUp, delay: 0, position: "top-20 left-20" },
    { Icon: DollarSign, delay: 2, position: "top-40 right-32" },
    { Icon: Sparkles, delay: 1, position: "bottom-20 right-20" },
  ];
  return (
    <>
      {floatingIcons.map(({ Icon, delay, position }, index) => (
        <motion.div
          key={index}
          className={`absolute hidden lg:block ${position}`}
          animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
            <Icon className="w-6 h-6 text-vibe-purple-600" />
          </div>
        </motion.div>
      ))}
    </>
  );
}