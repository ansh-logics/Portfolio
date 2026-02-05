import { cn } from "../../lib/utils";

interface MeteorsProps {
  number?: number;
  className?: string;
}

export const Meteors = ({ number = 20, className = "" }: MeteorsProps) => {
  const meteors = Array.from({ length: number }, (_, i) => i);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {meteors.map((_, idx) => (
        <span
          key={idx}
          className={`absolute top-0 left-[${
            Math.random() * 100
          }%] h-0.5 w-0.5 rounded-[9999px] bg-white shadow-[0_0_0_1px_#ffffff10] rotate-[215deg] animate-meteor-effect`}
          style={{
            top: 0,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 1}s`,
            animationDuration: `${Math.random() * 2 + 3}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Meteors; 