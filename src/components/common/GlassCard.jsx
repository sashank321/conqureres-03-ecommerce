import React from 'react';
import { motion } from 'framer-motion';

export const GlassCard = ({ children, className = '', hover = true, onClick, ...props }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -3, transition: { duration: 0.2 } } : undefined}
      onClick={onClick}
      className={`glass-panel rounded-2xl p-6 transition-all duration-300 shadow-glass-md hover:shadow-glass-glow border border-white/15 dark:border-white/10 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
