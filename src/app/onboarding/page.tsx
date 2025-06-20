import { Suspense } from 'react';
import OnboardingContent from './onboardingcontent';

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div>Loading onboarding...</div>}>
      <OnboardingContent />
    </Suspense>
  );
}
