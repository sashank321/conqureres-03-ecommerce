import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Calendar,
  Menu,
  ChevronDown,
  User,
  LogOut,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  Command
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import { CommandPalette } from '../common/CommandPalette';

const PAGE_TITLES = {
  '/': { title: 'Dashboard', subtitle: 'Overview & Real-time Commerce Metrics' },
  '/orders': { title: 'Orders', subtitle: 'Manage & Fulfill Customer Transactions' },
  '/products': { title: 'Products', subtitle: 'Catalog, Pricing & Product Inventory' },
  '/inventory': { title: 'Inventory', subtitle: 'Stock Levels & Automated Reorder Alerts' },
  '/customers': { title: 'Customers', subtitle: 'Customer Directory & Lifetime Value' },
  '/analytics': { title: 'Analytics', subtitle: 'Revenue Insights & Strategic Growth' },
  '/marketing': { title: 'Marketing', subtitle: 'Campaigns & Promotion Performance' },
  '/reports': { title: 'Reports', subtitle: 'Financial Audits & Data Export' },
  '/settings': { title: 'Settings', subtitle: 'System Preferences & Store Profile' },
  '/help': { title: 'Help & Docs', subtitle: 'Knowledge Base & API Integration' }
};

export const Header = ({ setMobileOpen }) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { dateRange, setDateRange, notifications, markNotificationsRead } = useData();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  const currentPage = PAGE_TITLES[location.pathname] || {
    title: 'EvoCommerce',
    subtitle: 'Admin Dashboard'
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <>
      <header className="sticky top-0 z-30 w-full glass-panel border-b border-white/20 bg-black/20 dark:bg-black/25 backdrop-blur-3xl px-4 sm:px-8 py-4 transition-colors">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Mobile Toggle & Page Header Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-200 hover:text-white hover:bg-white/15"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white drop-shadow-md">
                {currentPage.title}
              </h2>
              <p className="hidden sm:block text-xs font-semibold text-slate-200 drop-shadow-sm">
                {currentPage.subtitle}
              </p>
            </div>
          </div>

          {/* Right: Search / Command Palette Trigger, Date Selector, Notifications, Theme Toggle, Profile */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Pure Glass Command Palette Trigger Button */}
            <button
              onClick={() => setShowCommandPalette(true)}
              className="hidden md:flex items-center justify-between gap-3 px-3.5 py-2 w-48 xl:w-64 text-xs rounded-xl bg-black/40 border border-white/25 text-slate-200 hover:text-white hover:bg-white/20 backdrop-blur-xl transition-all text-left shadow-inner"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-white" />
                <span className="truncate font-medium">Search or commands...</span>
              </div>
              <kbd className="flex items-center gap-0.5 px-2 py-0.5 rounded-lg bg-white/20 text-[10px] font-extrabold text-white border border-white/20">
                <Command className="w-3 h-3" /> K
              </kbd>
            </button>

            {/* Pure Glass Date Range Picker */}
            <div className="relative">
              <button
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl bg-black/40 border border-white/25 text-white hover:bg-white/20 backdrop-blur-xl transition-all shadow-inner"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span className="hidden sm:inline">
                  {dateRange === '7d'
                    ? 'Last 7 Days'
                    : dateRange === '30d'
                    ? 'Last 30 Days'
                    : dateRange === '90d'
                    ? 'Last 90 Days'
                    : 'This Year'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              <AnimatePresence>
                {showDatePicker && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-44 glass-panel rounded-2xl p-2 shadow-2xl border border-white/30 bg-black/80 backdrop-blur-3xl z-50 text-xs text-white"
                  >
                    {[
                      { label: 'Last 7 Days', value: '7d' },
                      { label: 'Last 30 Days', value: '30d' },
                      { label: 'Last 90 Days', value: '90d' },
                      { label: 'This Year (1Y)', value: '1y' },
                    ].map((item) => (
                      <button
                        key={item.value}
                        onClick={() => {
                          setDateRange(item.value);
                          setShowDatePicker(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl transition-colors font-medium ${
                          dateRange === item.value
                            ? 'bg-white/30 text-white font-bold shadow-md border border-white/30'
                            : 'text-slate-100 hover:bg-white/20'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Switcher Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-black/40 border border-white/25 text-slate-200 hover:bg-white/20 backdrop-blur-xl transition-all shadow-inner"
              title="Toggle Dark / Light Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-white" />
              )}
            </button>

            {/* Notifications Panel */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  if (!showNotifications) markNotificationsRead();
                }}
                className="relative p-2.5 rounded-xl bg-black/40 border border-white/25 text-slate-200 hover:bg-white/20 backdrop-blur-xl transition-all shadow-inner"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-white animate-ping" />
                )}
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-white" />
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 sm:w-96 glass-panel rounded-2xl p-4 shadow-2xl border border-white/30 bg-black/80 backdrop-blur-3xl z-50 text-xs text-white"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-white/20 mb-3">
                      <h4 className="font-extrabold text-white">Notifications</h4>
                      <span className="text-[10px] bg-white/20 text-white font-bold px-2.5 py-0.5 rounded-full border border-white/25">
                        {notifications.length} Total
                      </span>
                    </div>

                    <div className="space-y-2.5 max-h-72 overflow-y-auto no-scrollbar">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className="p-3 rounded-xl bg-white/15 border border-white/20 flex gap-3 items-start backdrop-blur-xl"
                        >
                          {n.type === 'warning' ? (
                            <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                          ) : n.type === 'success' ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                          ) : (
                            <Info className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <p className="font-bold text-white">{n.title}</p>
                            <p className="text-slate-200 text-[11px] leading-relaxed mt-0.5">
                              {n.message}
                            </p>
                            <span className="text-[10px] text-slate-300 mt-1 inline-block">{n.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl bg-black/40 border border-white/25 hover:bg-white/20 backdrop-blur-xl transition-all shadow-inner"
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80"
                  alt="Admin Avatar"
                  className="w-7 h-7 rounded-lg object-cover ring-2 ring-white/50"
                />
                <span className="hidden xl:block text-xs font-extrabold text-white">
                  Alex Morgan
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
              </button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-52 glass-panel rounded-2xl p-2 shadow-2xl border border-white/30 bg-black/80 backdrop-blur-3xl z-50 text-xs text-white"
                  >
                    <div className="px-3 py-2 border-b border-white/20 mb-1">
                      <p className="font-bold text-white">Alex Morgan</p>
                      <p className="text-[10px] text-slate-300">admin@evocommerce.io</p>
                    </div>
                    <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-100 hover:bg-white/20 transition-colors font-medium">
                      <User className="w-4 h-4 text-white" /> Profile Settings
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-100 hover:bg-white/20 transition-colors font-medium">
                      <ShieldCheck className="w-4 h-4 text-emerald-300" /> Security & Access
                    </button>
                    <div className="border-t border-white/20 my-1" />
                    <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-300 hover:bg-rose-500/25 transition-colors font-semibold">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Global Command Palette Modal */}
      <CommandPalette
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
      />
    </>
  );
};
