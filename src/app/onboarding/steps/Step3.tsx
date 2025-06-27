import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/landing/button";
import {
  PiggyBank, TrendingUp, Target, GraduationCap, Home, Plane, Heart, Building
} from "lucide-react";

// Map icon string to component
const iconMap = {
  PiggyBank,
  TrendingUp,
  Target,
  GraduationCap,
  Home,
  Plane,
  Heart,
  Building,
};

interface GoalOption {
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface Step3GoalsProps {
  formData: { goals: string[] };
  errors: Record<string, string>;
  goalOptions: GoalOption[];
  handleGoalToggle: (goal: string) => void;
  goPrevious: () => void;
  goNext: () => void;
  currentStep: number;
}

const Step3Goals: React.FC<Step3GoalsProps> = ({
  formData,
  errors,
  goalOptions,
  handleGoalToggle,
  goPrevious,
  goNext,
  currentStep,
}) => (
  <div className="p-4 sm:p-8">
    <div className="text-center mb-10">
      <h2 className="text-2xl font-bold text-white mb-4">What are your goals?</h2>
      <p className="text-gray-400 text-lg">Select up to 3 goals that matter most to you.</p>
    </div>
    <form className="space-y-7" noValidate>
      <div>
        <label className="text-base font-medium text-gray-300 block">
          Choose your goals <span className="text-gray-400">(max 3)</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {goalOptions.map(option => {
            const Icon = iconMap[option.icon as keyof typeof iconMap];
            return (
              <button
                type="button"
                key={option.value}
                onClick={() => handleGoalToggle(option.value)}
                className={`flex flex-col items-start p-6 rounded-2xl border-2 transition-all w-full h-full text-left cursor-pointer ${
                  formData.goals.includes(option.value)
                    ? "border-vibe-purple-400 bg-gray-700"
                    : "border-gray-600 hover:border-vibe-purple-400 bg-gray-800"
                } ${formData.goals.length >= 3 && !formData.goals.includes(option.value) ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={formData.goals.length >= 3 && !formData.goals.includes(option.value)}
              >
                {Icon && <Icon className="w-8 h-8 text-vibe-purple-400 mb-2" />}
                <span className="text-lg font-semibold text-white">{option.label}</span>
              </button>
            );
          })}
        </div>
        {errors.goals && <p className="text-sm text-red-400 mt-2">{errors.goals}</p>}
      </div>
      {/* Navigation Buttons for Step 3 */}
      <div className="flex flex-row justify-between items-center gap-4 pt-4">
        <Button
          onClick={goPrevious}
          disabled={currentStep === 1}
          variant="outline"
          className={`h-12 border-gray-700 bg-gray-800 text-white hover:bg-gray-700 cursor-pointer ${
            currentStep === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button
          onClick={goNext}
          type="button"
          className="h-12 vibe-gradient hover:opacity-90 text-white cursor-pointer"
          disabled={formData.goals.length === 0}
        >
          <div className="flex items-center space-x-2">
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Button>
      </div>
    </form>
  </div>
);

export default Step3Goals;