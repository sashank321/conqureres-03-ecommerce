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
  Info
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';

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
  const [searchQuery, setSearchQuery] = useState('');

  const currentPage = PAGE_TITLES[location.pathname] || {
    title: 'EvoCommerce',
    subtitle: 'Admin Dashboard'
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 w-full glass-panel border-b border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl px-4 sm:px-8 py-4 transition-colors">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Page Header Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {currentPage.title}
            </h2>
            <p className="hidden sm:block text-xs font-medium text-slate-500 dark:text-slate-400">
              {currentPage.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Search, Date Selector, Notifications, Theme Toggle, Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search Bar */}
          <div className="relative hidden md:block w-48 xl:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search anything..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20 transition-all"
            />
          </div>

          {/* Date Range Picker Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
            >
              <Calendar className="w-4 h-4 text-brand-500" />
              <span className="hidden sm:inline">
                {dateRange === '7d'
                  ? 'Last 7 Days'
                  : dateRange === '30d'
                  ? 'Last 30 Days'
                  : dateRange === '90d'
                  ? 'Last 90 Days'
                  : 'This Year'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            <AnimatePresence>
              {showDatePicker && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-44 glass-panel rounded-2xl p-2 shadow-2xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-slate-900/95 z-50 text-xs"
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
                          ? 'bg-brand-500 text-white font-bold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
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
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
            title="Toggle Dark / Light Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-brand-600" />
            )}
          </button>

          {/* Notifications Panel */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications) markNotificationsRead();
              }}
              className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500 animate-ping" />
              )}
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500" />
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 sm:w-96 glass-panel rounded-2xl p-4 shadow-2xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-slate-900/95 z-50 text-xs"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10 mb-3">
                    <h4 className="font-bold text-slate-900 dark:text-white">Notifications</h4>
                    <span className="text-[10px] bg-brand-500/20 text-brand-400 font-bold px-2 py-0.5 rounded-full">
                      {notifications.length} Total
                    </span>
                  </div>

                  <div className="space-y-2.5 max-h-72 overflow-y-auto no-scrollbar">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex gap-3 items-start"
                      >
                        {n.type === 'warning' ? (
                          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        ) : n.type === 'success' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-slate-100">{n.title}</p>
                          <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed mt-0.5">
                            {n.message}
                          </p>
                          <span className="text-[10px] text-slate-400 mt-1 inline-block">{n.time}</span>
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
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80"
                alt="Admin Avatar"
                className="w-7 h-7 rounded-lg object-cover ring-2 ring-brand-500/30"
              />
              <span className="hidden xl:block text-xs font-semibold text-slate-800 dark:text-slate-200">
                Alex Morgan
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-52 glass-panel rounded-2xl p-2 shadow-2xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-slate-900/95 z-50 text-xs"
                >
                  <div className="px-3 py-2 border-b border-slate-200 dark:border-white/10 mb-1">
                    <p className="font-bold text-slate-900 dark:text-white">Alex Morgan</p>
                    <p className="text-[10px] text-slate-400">admin@evocommerce.io</p>
                  </div>
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                    <User className="w-4 h-4 text-brand-500" /> Profile Settings
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> Security & Access
                  </button>
                  <div className="border-t border-slate-200 dark:border-white/10 my-1" />
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-colors font-semibold">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};
