import { ButtonHTMLAttributes } from "react";

interface ShimmerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
}

export const ShimmerButton = ({ 
  text, 
  className = "", 
  ...props 
}: ShimmerButtonProps) => {
  return (
    <button
      className={`relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ${className}`}
      {...props}
    >
      <span className="absolute inset-[-1000%] animate-shimmer bg-[linear-gradient(45deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.3)_50%,rgba(255,255,255,0)_100%)] bg-[length:200%_200%]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-[#1E1E1E] px-5 py-2 text-sm font-medium text-white backdrop-blur-3xl hover:bg-[#2A2A2A] transition-colors">
        {text}
      </span>
    </button>
  );
};

export default ShimmerButton; 