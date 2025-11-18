import { cn } from "@/lib/utils";

interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter = ({ password }: PasswordStrengthMeterProps) => {
  const calculateStrength = (pwd: string): number => {
    let strength = 0;
    
    if (pwd.length >= 8) strength += 1;
    if (pwd.length >= 12) strength += 1;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength += 1;
    if (/\d/.test(pwd)) strength += 1;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength += 1;
    
    return strength;
  };

  const getStrengthLabel = (strength: number): string => {
    if (strength === 0) return "";
    if (strength <= 2) return "Weak";
    if (strength <= 3) return "Fair";
    if (strength === 4) return "Good";
    return "Strong";
  };

  const getStrengthColor = (strength: number): string => {
    if (strength === 0) return "bg-border";
    if (strength <= 2) return "bg-red-500";
    if (strength <= 3) return "bg-yellow-500";
    if (strength === 4) return "bg-blue-500";
    return "bg-green-500";
  };

  if (!password) return null;

  const strength = calculateStrength(password);
  const label = getStrengthLabel(strength);
  const color = getStrengthColor(strength);

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-all",
              level <= strength ? color : "bg-border"
            )}
          />
        ))}
      </div>
      {label && (
        <p className={cn("text-xs font-medium", {
          "text-red-500": strength <= 2,
          "text-yellow-500": strength === 3 || strength === 4,
          "text-green-500": strength === 5,
        })}>
          Password strength: {label}
        </p>
      )}
    </div>
  );
};

export default PasswordStrengthMeter;
