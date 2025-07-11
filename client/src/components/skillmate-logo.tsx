import { GraduationCap } from "lucide-react";

interface SkillmateLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export function SkillmateLogo({ size = "md", showText = true, className = "" }: SkillmateLogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-20 h-20"
  };

  const iconSizes = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-3xl"
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-4xl"
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={`${sizeClasses[size]} bg-skillmate-green rounded-full flex items-center justify-center`}>
        <GraduationCap className={`text-white ${iconSizes[size]}`} />
      </div>
      {showText && (
        <span className={`${textSizes[size]} font-bold text-gray-900 dark:text-white`}>
          SkillMate
        </span>
      )}
    </div>
  );
}
