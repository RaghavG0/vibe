"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Mail, CheckCircle, ArrowLeft, RefreshCw, TrendingUp, AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

export default function EmailVerification() {
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [email, setEmail] = useState("your email");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("Email verified!");
  const [successSubtext, setSuccessSubtext] = useState("Your email has been successfully verified.");

  useEffect(() => {
    const storedEmail = localStorage.getItem("signup-email");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);
  const handleVerifyAndContinue = async () => {
    setIsVerifying(true);
    setVerificationError("");

    try {
      await new Promise((res) => setTimeout(res, 2000));

      const isVerified = Math.random() > 0.3;

      if (isVerified) {
        localStorage.setItem("email-verified", "true");
        router.push("/onboarding");
      } else {
        setVerificationError(
          "Email not verified yet. Please check your email and click the verification link before continuing.",
        );
      }
    } catch {
      setVerificationError("Something went wrong. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendEmail = async () => {
    if (resendCooldown > 0) return;
    setIsResending(true);
    setResendSuccess(false);

    try {
      await new Promise((res) => setTimeout(res, 1500));
      setResendSuccess(true);
      setResendCooldown(60); // Start 60s cooldown
      setTimeout(() => setResendSuccess(false), 3000);
    } catch (err) {
      console.error("Resend failed:", err);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Left side */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-vibe-purple-900 via-vibe-blue-900 to-vibe-mint-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1' opacity='0.3'%3E%3Cpath d='M10,30 Q20,10 30,20 T50,15'/%3E%3Cpath d='M5,40 Q15,20 25,30 T45,25'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center text-center px-12 py-12">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">VibeWealth</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-6">
            You're almost there!
          </h1>
          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            Just one more step to secure your account and unlock all features.
          </p>
          <div className="space-y-4">
            {[
              "Email verification protects your account",
              "Access to all premium features",
              "Secure financial data storage",
              "Personal finance insights",
            ].map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="flex items-center space-x-3"
              >
                <div className="w-6 h-6 bg-vibe-mint-400 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/90">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right side */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <Link
            href="/signup"
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to sign up</span>
          </Link>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>Already verified?</span>
            <Link
              href="/login"
              className="text-vibe-purple-400 hover:text-vibe-purple-300 font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-20 h-20 bg-vibe-gradient rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Mail className="w-10 h-10 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Check your email
              </h2>
              <p className="text-gray-400">
                We've sent a verification link to{" "}
                <span className="text-vibe-purple-400 font-medium">{email}</span>
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 mb-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">
                What to do next:
              </h3>
              <div className="space-y-3 text-gray-300">
                {["Check inbox (and spam)", "Click the link", "Return here"].map((step, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-vibe-purple-500 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-white text-sm font-bold">{i + 1}</span>
                    </div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {verificationError && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{verificationError}</AlertDescription>
                </Alert>
              </motion.div>
            )}

            {resendSuccess && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <Alert className="border-green-500/50 text-green-400 bg-green-950/20">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <AlertDescription>
                    Verification email sent successfully! Check your inbox.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            <div className="space-y-4">
              <Button
                onClick={handleVerifyAndContinue}
                disabled={isVerifying}
                className={`
                  w-full py-3 rounded-xl font-semibold
                  bg-gradient-to-r from-vibe-purple-600 via-vibe-blue-600 to-vibe-mint-500
                  shadow-lg cursor-pointer
                  text-white
                  transition-all duration-300
                  hover:from-vibe-purple-500 hover:via-vibe-blue-500 hover:to-vibe-mint-400
                  hover:shadow-xl
                  active:scale-95
                  disabled:from-gray-700 disabled:to-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed
                  border-0
                `}
              >
                {isVerifying ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Checking verification...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>I've verified my email - Continue</span>
                  </div>
                )}
              </Button>

              <div className="text-center">
                <p className="text-gray-400 text-sm mb-3">
                  Didn't receive the email?
                </p>
                <Button
                  variant="outline"
                  onClick={handleResendEmail}
                  disabled={isResending || resendCooldown > 0}
                  className="text-vibe-purple-400 border-vibe-purple-400 hover:bg-vibe-purple-400 hover:text-white transition-all duration-300"
                >
                  {isResending ? (
                    <div className="flex items-center space-x-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : resendCooldown > 0 ? (
                    <div className="flex items-center space-x-2">
                      <RefreshCw className="w-4 h-4" />
                      <span>Resend in {resendCooldown}s</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <RefreshCw className="w-4 h-4" />
                      <span>Resend verification email</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                Having trouble?{" "}
                <a
                  href="#"
                  className="text-vibe-purple-400 hover:text-vibe-purple-300 font-medium"
                >
                  Contact support
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
