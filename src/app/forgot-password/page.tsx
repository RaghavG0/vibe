import { Suspense } from "react";
import ForgotPasswordContent from "./ForgotPasswordContent1";

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading...</div>}>
      <ForgotPasswordContent />
    </Suspense>
  );
}