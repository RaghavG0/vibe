import { motion } from "framer-motion";
import { TrendingUp, Check } from "lucide-react";

export function SignupBrandingPanel() {
  const features = [
    "AI-powered financial insights",
    "Beautiful budget visualization",
    "Dream goal tracking",
    "24/7 support community",
  ];
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-vibe-purple-900 via-vibe-blue-900 to-vibe-mint-900 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1' opacity='0.3'%3E%3Cpath d='M10,30 Q20,10 30,20 T50,15'/%3E%3Cpath d='M5,40 Q15,20 25,30 T45,25'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>
      {/* Branding Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center px-12 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">VibeWealth</span>
          </div>
          {/* Heading */}
          <h1 className="text-4xl font-bold text-white mb-6">
            Start your financial journey with us
          </h1>
          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            Join thousands of Gen Z users who&apos;ve already transformed their relationship with money.
          </p>
          {/* Features List */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="flex items-center space-x-3"
              >
                <div className="w-6 h-6 bg-vibe-mint-400 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/90">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}