import { useEffect, useRef } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  direction?: "left" | "right";
}

export const TextReveal = ({ 
  text, 
  className = "",
  direction = "left"
}: TextRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (containerRef.current) {
              containerRef.current.style.opacity = "1";
              const inner = containerRef.current.querySelector("div");
              if (inner) {
                inner.style.transform = "translateX(0)";
              }
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ 
        opacity: 0,
        transition: "opacity 0.5s ease-in-out"
      }}
    >
      <div
        className={`transform duration-1000 ease-in-out`}
        style={{
          willChange: "transform",
          transform: direction === "left" ? "translateX(-100%)" : "translateX(100%)",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default TextReveal; 