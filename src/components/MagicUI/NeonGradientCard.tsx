import { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface NeonGradientCardProps {
  children: ReactNode;
  className?: string;
  gradientColor?: string;
}

export const NeonGradientCard = ({
  children,
  className = "",
  gradientColor = "from-purple-500 via-blue-500 to-pink-500",
}: NeonGradientCardProps) => {
  return (
    <div className={cn("relative group", className)}>
      <div className="absolute -inset-0.5 bg-gradient-to-r opacity-75 group-hover:opacity-100 blur-sm transition duration-300 rounded-xl"></div>
      <div
        className={cn(
          "relative p-0.5 overflow-hidden rounded-xl",
          `bg-gradient-to-r ${gradientColor}`
        )}
      >
        <div className="relative bg-[#1E1E1E] rounded-[calc(0.75rem-1px)] p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default NeonGradientCard; 