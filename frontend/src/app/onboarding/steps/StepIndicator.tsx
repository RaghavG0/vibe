import { Check } from "lucide-react";
import React from "react";

type Step = {
  number: number;
  title: string;
};

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  maxStepReached: number;
  goToStep: (step: number) => void;
}

/**
 * StepIndicator - Shows progress through onboarding steps.
 * Highlights current, completed, and upcoming steps.
 */
export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  maxStepReached,
  goToStep,
}) => (
  <div className="flex items-start justify-center mb-8 px-4">
    {steps.map((step, index) => (
      <div key={step.number} className="relative flex items-start">
        <div className="flex flex-col items-center px-2 sm:px-4 md:px-6">
          <div className="relative flex items-center">
            <button
              type="button"
              onClick={() => goToStep(step.number)}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 focus:outline-none
                ${
                  currentStep > step.number
                    ? "bg-vibe-mint-500 text-white"
                    : currentStep === step.number
                    ? "vibe-gradient text-white"
                    : "bg-gray-800 text-gray-400"
                }
                ${step.number <= maxStepReached ? "cursor-pointer" : "cursor-not-allowed"}
              `}
              disabled={step.number > maxStepReached}
              aria-label={`Go to step ${step.title}`}
            >
              {currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
            </button>
            {/* Connecting line */}
            {index < steps.length - 1 && (
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-16 sm:w-20 md:w-24 lg:w-28 h-0.5">
                <div
                  className={`w-full h-0.5 transition-all duration-300 ${
                    currentStep > step.number ? "bg-vibe-mint-500" : "bg-gray-700"
                  }`}
                />
              </div>
            )}
          </div>
          <div className="mt-2 text-center min-w-[60px] sm:min-w-[80px]">
            <div
              className={`text-xs font-medium whitespace-nowrap ${
                currentStep >= step.number ? "text-white" : "text-gray-400"
              }`}
            >
              {step.title}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default StepIndicator;