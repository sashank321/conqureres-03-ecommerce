import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export const LoadingReveal = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-bg text-white"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-500 to-brand-accent flex items-center justify-center shadow-lg shadow-brand-500/30">
          <Zap className="w-7 h-7 text-white fill-current" />
        </div>
        <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-brand-400 bg-clip-text text-transparent">
          EvoCommerce
        </span>
      </motion.div>

      {/* Subtle loader bar */}
      <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
          className="w-full h-full bg-gradient-to-r from-brand-500 to-brand-accent rounded-full"
        />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xs text-slate-500 mt-4 tracking-widest uppercase font-semibold"
      >
        Loading Operating System...
      </motion.p>
    </motion.div>
  );
};
