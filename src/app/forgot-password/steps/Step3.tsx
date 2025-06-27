import { Eye, EyeOff } from "lucide-react";
import { PasswordStrengthMeter } from "@/components/ui/PasswordStrengthMeter";
import { PasswordRequirementsList } from "@/components/ui/PasswordRequirementsList";
import { Button } from "@/components/landing/button";
import React from "react";

interface Step3Props {
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (v: boolean) => void;
  isConfirmTyping: boolean;
  setIsConfirmTyping: (v: boolean) => void;
  errors: Record<string, string>;
  isLoading: boolean;
  passwordRequirements: { regex: RegExp; text: string }[];
  passwordStrength: { score: number; total: number; percentage: number };
  passwordMeterVisible: boolean;
  handlePasswordFocus: () => void;
  handlePasswordChange: () => void;
  handlePasswordBlur: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Step3: React.FC<Step3Props> = ({
  password,
  confirmPassword,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  isConfirmTyping,
  setIsConfirmTyping,
  errors,
  isLoading,
  passwordRequirements,
  passwordStrength,
  passwordMeterVisible,
  handlePasswordFocus,
  handlePasswordChange,
  handlePasswordBlur,
  onSubmit,
  onChange,
}) => (
  <form onSubmit={onSubmit} className="space-y-6">
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold text-white mb-2">Create new password</h2>
      <p className="text-gray-400">
        Your new password must be different from your previous password
      </p>
    </div>
    {/* New Password */}
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300">New Password</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onFocus={handlePasswordFocus}
          onChange={onChange}
          onBlur={handlePasswordBlur}
          placeholder="Create a strong password"
          className={`w-full pl-4 pr-12 py-3 bg-gray-800 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
            errors.password
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-700 focus:ring-vibe-purple-500 focus:border-transparent"
          }`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
      {/* Password Strength Meter */}
      {passwordMeterVisible && (
        <>
          <PasswordStrengthMeter password={password} requirements={passwordRequirements} />
          <PasswordRequirementsList password={password} requirements={passwordRequirements} />
        </>
      )}
      {errors.password && (
        <p className="text-sm text-red-400">{errors.password}</p>
      )}
    </div>
    {/* Confirm Password */}
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300">Confirm New Password</label>
      <div className="relative">
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          value={confirmPassword}
          onFocus={() => setIsConfirmTyping(true)}
          onBlur={() => setIsConfirmTyping(false)}
          onChange={onChange}
          placeholder="Confirm your new password"
          className={`w-full pl-4 pr-12 py-3 bg-gray-800 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
            errors.confirmPassword
              ? "border-red-500 focus:ring-red-500"
              : confirmPassword && password === confirmPassword
              ? "border-green-500 focus:ring-green-500"
              : "border-gray-700 focus:ring-vibe-purple-500 focus:border-transparent"
          }`}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
      {/* Only one error/indicator at a time */}
      {isConfirmTyping && confirmPassword ? (
        <div className="flex items-center space-x-2">
          {password === confirmPassword ? (
            <span className="text-sm text-green-400 flex items-center">
              ✓ Passwords match
            </span>
          ) : (
            <span className="text-sm text-red-400 flex items-center">
              ✗ Passwords don't match
            </span>
          )}
        </div>
      ) : errors.confirmPassword ? (
        <p className="text-sm text-red-400">
          {errors.confirmPassword}
        </p>
      ) : null}
    </div>
    <Button
      type="submit"
      disabled={isLoading}
      className="w-full vibe-gradient hover:opacity-90 text-white py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 cursor-pointer"
    >
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span>Updating Password...</span>
        </div>
      ) : (
        "Update Password"
      )}
    </Button>
  </form>
);

export default Step3;