import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  LayoutDashboard,
  ShoppingBag,
  Package,
  Boxes,
  Users,
  BarChart3,
  Megaphone,
  FileText,
  Settings,
  HelpCircle,
  Sun,
  Moon,
  RotateCcw
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';

export const CommandPalette = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { toggleTheme, theme } = useTheme();
  const { resetToDefaults } = useData();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent listener
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const COMMANDS = [
    { name: 'Go to Dashboard', icon: LayoutDashboard, action: () => navigate('/') },
    { name: 'View Orders', icon: ShoppingBag, action: () => navigate('/orders') },
    { name: 'Manage Products Catalog', icon: Package, action: () => navigate('/products') },
    { name: 'Check Inventory & Stock', icon: Boxes, action: () => navigate('/inventory') },
    { name: 'Customer Directory', icon: Users, action: () => navigate('/customers') },
    { name: 'Revenue Analytics', icon: BarChart3, action: () => navigate('/analytics') },
    { name: 'Marketing Campaigns', icon: Megaphone, action: () => navigate('/marketing') },
    { name: 'Financial Reports', icon: FileText, action: () => navigate('/reports') },
    { name: 'Store Settings', icon: Settings, action: () => navigate('/settings') },
    { name: 'Help & Docs', icon: HelpCircle, action: () => navigate('/help') },
    { name: `Toggle ${theme === 'dark' ? 'Light' : 'Dark'} Mode`, icon: theme === 'dark' ? Sun : Moon, action: toggleTheme },
    { name: 'Reset Mock Data Defaults', icon: RotateCcw, action: resetToDefaults },
  ];

  const filteredCommands = COMMANDS.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="relative w-full max-w-xl glass-panel rounded-3xl p-4 shadow-2xl border border-white/20 bg-slate-950/85 backdrop-blur-3xl text-white z-50 overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-3 py-2 border-b border-white/10 mb-2">
              <Search className="w-5 h-5 text-brand-400" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or page name..."
                className="w-full bg-transparent border-none text-sm text-white placeholder:text-slate-400 focus:outline-none"
              />
              <kbd className="px-2 py-0.5 rounded-lg bg-white/10 text-[10px] font-bold text-slate-300">
                ESC
              </kbd>
            </div>

            {/* Commands List */}
            <div className="max-h-72 overflow-y-auto no-scrollbar space-y-1 p-1">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, idx) => {
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        cmd.action();
                        onClose();
                      }}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-brand-500/20 hover:border-brand-500/30 border border-transparent transition-all text-left"
                    >
                      <Icon className="w-4 h-4 text-brand-400" />
                      <span>{cmd.name}</span>
                    </button>
                  );
                })
              ) : (
                <p className="py-8 text-center text-xs text-slate-400 font-medium">
                  No commands matched "{query}"
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
