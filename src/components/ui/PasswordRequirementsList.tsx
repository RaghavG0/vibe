import { Check, X } from "lucide-react";

export function PasswordRequirementsList({ password, requirements }: {
  password: string;
  requirements: { regex: RegExp; text: string }[];
}) {
  return (
    <div className="grid grid-cols-1 gap-1">
      {requirements.map((req, idx) => {
        const isMet = req.regex.test(password);
        return (
          <div key={idx} className="flex items-center space-x-2">
            {isMet ? (
              <Check className="w-3 h-3 text-green-400" />
            ) : (
              <X className="w-3 h-3 text-gray-400" />
            )}
            <span className={`text-xs ${isMet ? "text-green-400" : "text-gray-400"}`}>
              {req.text}
            </span>
          </div>
        );
      })}
    </div>
  );
}