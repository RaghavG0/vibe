import { Check, X } from "lucide-react";

export function PasswordStrengthMeter({ password, requirements }: {
  password: string;
  requirements: { regex: RegExp; text: string }[];
}) {
  const passed = requirements.filter((req) => req.regex.test(password));
  const percentage = (passed.length / requirements.length) * 100;

  const getStrengthColor = () => {
    if (percentage < 40) return "bg-red-500";
    if (percentage < 80) return "bg-yellow-500";
    return "bg-green-500";
  };
  const getStrengthText = () => {
    if (percentage < 40) return "Weak";
    if (percentage < 80) return "Medium";
    return "Strong";
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">Password strength</span>
        <span className={`text-xs font-medium ${
          percentage < 40 ? "text-red-400" : percentage < 80 ? "text-yellow-400" : "text-green-400"
        }`}>
          {getStrengthText()}
        </span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-1">
        <div
          className={`h-1 rounded-full transition-all duration-300 ${getStrengthColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}