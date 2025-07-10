import { useState, useEffect } from "react";

export function useStepNavigation(validateFns: Array<() => boolean>, totalSteps: number) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [maxStepReached, setMaxStepReached] = useState(1);

  useEffect(() => {
    setMaxStepReached((prev) => Math.max(prev, currentStep));
  }, [currentStep]);

  const goToStep = (step: number) => {
    if (step <= maxStepReached) setCurrentStep(step);
  };

  const goNext = () => {
    let isValid = false;
    if (validateFns[currentStep - 1]) isValid = validateFns[currentStep - 1]();
    else isValid = true;

    if (isValid) {
      if (!completedSteps.includes(currentStep)) setCompletedSteps((prev) => [...prev, currentStep]);
      if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
    }
  };

  const goPrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return {
    currentStep,
    setCurrentStep,
    completedSteps,
    maxStepReached,
    goToStep,
    goNext,
    goPrevious,
  };
}