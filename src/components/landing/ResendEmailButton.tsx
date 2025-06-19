import { useState, useEffect } from "react";
import { RefreshCw, Check } from "lucide-react";
import { Button } from "@/components/landing/button"; // adjust if needed

export function ResendEmailButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleClick = () => {
    if (cooldown > 0 || isLoading) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
      setCooldown(60);
    }, 1000);
  };

  return (
    <div className="space-y-2 text-center">
      <Button
        onClick={handleClick}
        disabled={cooldown > 0 || isLoading}
        className={`w-full py-3 rounded-xl font-semibold transition-all duration-300
          ${isSent && cooldown > 0 ? "bg-vibe-mint-400 text-white" : "border border-gray-700 bg-gray-800 text-white hover:bg-gray-700"}
          ${cooldown > 0 ? "cursor-not-allowed opacity-80" : "cursor-pointer"}`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Sending...</span>
          </div>
        ) : isSent && cooldown > 0 ? (
          <div className="flex items-center justify-center space-x-2">
            <Check className="w-4 h-4" />
            <span>Sent</span>
            <span className="text-xs">({cooldown}s)</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Resend Email</span>
          </div>
        )}
      </Button>

      {/* Status message below button */}
      <p className="text-sm text-gray-400">
        {cooldown > 0
          ? `Didn't get the mail? You can resend in ${cooldown}s.`
          : `Didn't get the mail? Try resending now.`}
      </p>
    </div>
  );
}
