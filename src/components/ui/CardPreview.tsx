import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

export function CardPreview({ variants }: { variants?: any }) {
  return (
    <motion.div variants={variants} className="relative flex items-center justify-center">
      <div className="relative w-full max-w-lg">
        {/* Main finance card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-vibe-gray-100">
          <div className="text-center">
            <div className="w-16 h-16 vibe-gradient rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-vibe-gray-800 mb-2">Monthly Budget</h3>
            <p className="text-3xl font-bold text-vibe-purple-700 mb-4">$2,847</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-vibe-gray-600">Saved this month</span>
                <span className="font-semibold text-vibe-mint-600">+$421</span>
              </div>
              <div className="w-full bg-vibe-gray-200 rounded-full h-2">
                <div className="vibe-gradient h-2 rounded-full w-3/4" />
              </div>
            </div>
          </div>
        </div>

        {/* Top-right badge */}
        <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-4 border border-vibe-gray-100">
          <div className="text-center">
            <div className="text-lg font-bold text-vibe-purple-600">🎯</div>
            <div className="text-xs text-vibe-gray-600 mt-1">Dream Goal</div>
            <div className="text-sm font-bold text-vibe-gray-800">78% Complete</div>
          </div>
        </div>

        {/* Bottom-left tip */}
        <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4 border border-vibe-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-vibe-mint-100 rounded-lg flex items-center justify-center">
              <span className="text-sm">💰</span>
            </div>
            <div>
              <div className="text-xs text-vibe-gray-600">AI Tip</div>
              <div className="text-sm font-bold text-vibe-gray-800">Save $50 more</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}