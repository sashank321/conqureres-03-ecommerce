import React from 'react';
import { motion } from 'framer-motion';

export const GlassCard = ({ children, className = '', hover = true, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className={`glass-panel ${
        hover ? 'glass-panel-hover cursor-pointer' : ''
      } rounded-3xl p-5 sm:p-6 text-white ${className}`}
    >
      {children}
    </motion.div>
  );
};
