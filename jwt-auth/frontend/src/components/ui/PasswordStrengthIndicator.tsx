import { CheckCircle2, XCircle } from "lucide-react";

interface PasswordStrengthIndicatorProps {
  password: string;
}

interface Requirement {
  label: string;
  test: (password: string) => boolean;
}

const requirements: Requirement[] = [
  {
    label: "Ít nhất 6 ký tự",
    test: (pwd) => pwd.length >= 6,
  },
  {
    label: "Có chữ hoa",
    test: (pwd) => /[A-Z]/.test(pwd),
  },
  {
    label: "Có chữ thường",
    test: (pwd) => /[a-z]/.test(pwd),
  },
  {
    label: "Có số",
    test: (pwd) => /[0-9]/.test(pwd),
  },
];

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  if (!password) return null;

  const metRequirements = requirements.filter((req) => req.test(password));
  const strength = metRequirements.length;
  
  const strengthColors = {
    0: "bg-gray-200",
    1: "bg-red-500",
    2: "bg-orange-500",
    3: "bg-yellow-500",
    4: "bg-green-500",
  };

  const strengthLabels = {
    0: "Rất yếu",
    1: "Yếu",
    2: "Trung bình",
    3: "Khá mạnh",
    4: "Mạnh",
  };

  const strengthTextColors = {
    0: "text-gray-600",
    1: "text-red-600",
    2: "text-orange-600",
    3: "text-yellow-600",
    4: "text-green-600",
  };

  return (
    <div className="space-y-3 slide-in-up">
      {/* Strength bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-gray-600">Độ mạnh mật khẩu</span>
          <span className={`text-xs font-bold ${strengthTextColors[strength as keyof typeof strengthTextColors]}`}>
            {strengthLabels[strength as keyof typeof strengthLabels]}
          </span>
        </div>
        <div className="flex gap-1.5 h-1.5">
          {[1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`flex-1 rounded-full transition-all duration-500 ${
                level <= strength
                  ? strengthColors[strength as keyof typeof strengthColors]
                  : "bg-gray-200"
              } ${level <= strength ? "scale-y-125" : ""}`}
            />
          ))}
        </div>
      </div>

      {/* Requirements checklist */}
      <div className="space-y-2">
        {requirements.map((req, index) => {
          const isMet = req.test(password);
          return (
            <div
              key={req.label}
              className={`flex items-center gap-2 text-xs transition-all duration-300 slide-in-left stagger-${index + 1}`}
            >
              {isMet ? (
                <CheckCircle2 className="w-4 h-4 text-green-500 scale-bounce" />
              ) : (
                <XCircle className="w-4 h-4 text-gray-300" />
              )}
              <span className={isMet ? "text-green-700 font-medium" : "text-gray-500"}>
                {req.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
