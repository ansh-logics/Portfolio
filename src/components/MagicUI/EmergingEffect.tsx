import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface EmergingEffectProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const EmergingEffect: React.FC<EmergingEffectProps> = ({ 
  children, 
  className = "",
  delay = 0.3 
}) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0,
        x: 100,
        y: 100,
        scale: 0.8,
        filter: 'blur(10px)',
        boxShadow: '0 0 0 rgba(255, 255, 255, 0)'
      }}
      animate={{ 
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        boxShadow: '0 0 30px rgba(255, 255, 255, 0.1)'
      }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.16, 1, 0.3, 1] // Custom cubic-bezier for a subtle spring effect
      }}
      className={className}
    >
      <div className="relative">
        {/* Glow effect that follows the component */}
        <div className="absolute -inset-0.5 rounded-[inherit] bg-white/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        {children}
      </div>
    </motion.div>
  );
};

export default EmergingEffect; 