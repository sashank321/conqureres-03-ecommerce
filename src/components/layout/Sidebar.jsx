import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
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
  Zap,
  X
} from 'lucide-react';

const NAV_MAIN = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Orders', path: '/orders', icon: ShoppingBag },
  { name: 'Products', path: '/products', icon: Package },
  { name: 'Inventory', path: '/inventory', icon: Boxes },
  { name: 'Customers', path: '/customers', icon: Users },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
];

const NAV_SECONDARY = [
  { name: 'Marketing', path: '/marketing', icon: Megaphone },
  { name: 'Reports', path: '/reports', icon: FileText },
];

const NAV_BOTTOM = [
  { name: 'Settings', path: '/settings', icon: Settings },
  { name: 'Help & Docs', path: '/help', icon: HelpCircle },
];

export const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const location = useLocation();

  const SidebarContent = () => (
    <div className="flex flex-col h-full justify-between p-6">
      <div>
        {/* Logo Branding */}
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-500 to-brand-accent flex items-center justify-center shadow-lg shadow-brand-500/40 ring-1 ring-white/30">
              <Zap className="w-5 h-5 text-white fill-current" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-brand-300 bg-clip-text text-transparent drop-shadow-sm">
                EvoCommerce
              </h1>
              <span className="text-[10px] font-bold tracking-widest text-brand-400 uppercase">
                Crystal Glass OS
              </span>
            </div>
          </div>
          {setMobileOpen && (
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Main Navigation */}
        <div className="space-y-6">
          <div>
            <p className="px-3 text-[11px] font-bold text-slate-300 uppercase tracking-widest mb-3 drop-shadow-sm">
              Main Menu
            </p>
            <nav className="space-y-1">
              {NAV_MAIN.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen && setMobileOpen(false)}
                    className={`relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'text-white font-bold'
                        : 'text-slate-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activePill"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-500/40 via-brand-500/25 to-brand-500/10 border-l-4 border-brand-400 backdrop-blur-xl shadow-lg"
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                    <Icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-brand-300' : 'text-slate-300'}`} />
                    <span className="relative z-10 drop-shadow-sm">{item.name}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>

          <div>
            <p className="px-3 text-[11px] font-bold text-slate-300 uppercase tracking-widest mb-3 drop-shadow-sm">
              Management
            </p>
            <nav className="space-y-1">
              {NAV_SECONDARY.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen && setMobileOpen(false)}
                    className={`relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'text-white font-bold'
                        : 'text-slate-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activePill"
                        className="absolute inset-0 rounded-xl bg-brand-500/35 border-l-4 border-brand-400 backdrop-blur-xl shadow-lg"
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                    <Icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-brand-300' : 'text-slate-300'}`} />
                    <span className="relative z-10 drop-shadow-sm">{item.name}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Profile / Settings */}
      <div className="pt-6 border-t border-white/15 space-y-1">
        {NAV_BOTTOM.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen && setMobileOpen(false)}
              className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'text-white font-bold bg-brand-500/30 border border-white/20 backdrop-blur-xl shadow-lg'
                  : 'text-slate-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-5 h-5 text-slate-300" />
              <span className="drop-shadow-sm">{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Crystal Glass Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 fixed inset-y-0 left-0 z-40 glass-panel border-r border-white/20 bg-slate-950/20 dark:bg-slate-950/25 backdrop-blur-3xl shadow-2xl">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-72 glass-panel border-r border-white/25 bg-slate-950/65 backdrop-blur-3xl text-white lg:hidden shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
