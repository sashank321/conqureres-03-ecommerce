import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="relative min-h-screen bg-slate-900/10 dark:bg-dark-bg text-slate-900 dark:text-slate-100 flex transition-colors duration-300 overflow-x-hidden">
      {/* High-Visibility Looping Video Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60 dark:opacity-75 filter saturate-150 contrast-110 transition-opacity duration-700"
        >
          <source
            src="https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/a/handstouchgodArea.mp4"
            type="video/mp4"
          />
        </video>
        {/* Subtle Ambient Glass Tint Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/35 via-slate-950/20 to-slate-950/45 dark:from-slate-950/45 dark:via-slate-950/25 dark:to-slate-950/55 backdrop-blur-[1.5px]" />
      </div>

      {/* Navigation Sidebar */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 lg:pl-64 flex flex-col min-w-0 min-h-screen">
        {/* Top Header */}
        <Header setMobileOpen={setMobileOpen} />

        {/* Dynamic Route Page View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
