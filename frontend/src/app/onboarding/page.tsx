"use client";

import { Suspense } from "react";
import OnboardingContent from "@/app/onboarding/Onboarding-Content";

// Simple spinner component for fallback
function Spinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-10 h-10 border-4 border-vibe-purple-400 border-t-transparent rounded-full animate-spin" />
      <span className="sr-only">Loading onboarding...</span>
    </div>
  );
}

// Onboarding page with Suspense and spinner fallback
export default function OnboardingPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <OnboardingContent />
    </Suspense>
  )
}