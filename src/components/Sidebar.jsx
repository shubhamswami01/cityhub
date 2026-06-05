import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  AlertCircle,
  Wrench,
  Megaphone,
  PhoneCall,
  User,
  LogOut,
  Building2,
  ChevronDown,
  Search,
  Settings,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Sidebar = ({ isOpen, onClose }) => {
  const { logout, user, complaints } = useApp();

  const activeComplaintsCount = complaints.filter(c => c.status !== 'Resolved').length;

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Complaints', path: '/complaints', icon: <AlertCircle className="w-4 h-4" />, badge: activeComplaintsCount > 0 ? activeComplaintsCount : null },
    { name: 'Services', path: '/services', icon: <Wrench className="w-4 h-4" /> },
    { name: 'Announcements', path: '/announcements', icon: <Megaphone className="w-4 h-4" />, badge: 'New' },
    { name: 'Emergency Contacts', path: '/emergency', icon: <PhoneCall className="w-4 h-4" /> },
    { name: 'Profile', path: '/profile', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Backdrop for mobile drawer */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm md:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0b120f] border-r border-slate-900 flex flex-col transform transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sticky Header Section */}
        <div className="flex-shrink-0">
          {/* Logo Section */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-900/60">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center text-white">
                <Building2 className="w-4.5 h-4.5" />
              </div>
              <span className="font-heading font-extrabold text-lg tracking-tight text-white">
                City<span className="text-emerald-500">Hub</span>
              </span>
            </div>
            {/* Close button for mobile drawer */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-500 hover:bg-slate-900 md:hidden"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Workspace Sector Picker */}
          <div className="mx-4 mt-4 mb-2 p-3 bg-slate-900/40 border border-slate-900/60 rounded-2xl flex items-center justify-between select-none">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-[#18261e] text-emerald-450 border border-emerald-950 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Sector Workspace</p>
                <p className="text-xs font-bold text-slate-200 truncate">Metropolis Central</p>
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
          </div>

          {/* Command Search box */}
          <div className="mx-4 my-2 relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search for..."
              className="w-full pl-9 pr-12 py-2 text-xs bg-slate-900/30 border border-slate-900/80 rounded-xl text-slate-300 focus:outline-none focus:border-slate-800 placeholder-slate-600 font-medium"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-bold text-slate-500 px-1 py-0.2 bg-slate-900 border border-slate-800 rounded">
              ⌘+F
            </span>
          </div>
        </div>

        {/* Scrollable Middle Navigation Section */}
        <div className="flex-grow overflow-y-auto py-2 scrollbar-none">
          {/* Section Divider Header */}
          <div className="px-6 py-2 text-[9px] font-bold text-slate-600 uppercase tracking-widest">
            Navigation
          </div>

          {/* Navigation Links */}
          <nav className="px-2 space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === '/dashboard'}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all group ${
                    isActive
                      ? 'bg-[#181d19] text-white border-l-2 border-emerald-500 rounded-l-none'
                      : 'text-slate-400 hover:bg-slate-900/30 hover:text-slate-200'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 group-hover:text-emerald-500 transition-colors">
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </div>
                {/* Active Indicator or Notification badge */}
                {item.badge && (
                  <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                    item.badge === 'New' 
                      ? 'border border-emerald-500/20 text-emerald-400' 
                      : 'bg-emerald-950 text-emerald-450 border border-emerald-900/40'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Sticky Bottom Footer Section */}
        <div className="flex-shrink-0 border-t border-slate-900/60 bg-[#0b120f]/90 backdrop-blur-md">
          {/* Settings Mock Link */}
          <div className="px-2 mt-2">
            <NavLink
              to="/profile"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-900/30 hover:text-slate-200"
            >
              <Settings className="w-4 h-4 text-slate-500" />
              <span>Settings</span>
            </NavLink>
          </div>

          {/* User Account block */}
          {user && (
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover border border-slate-800"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-200 truncate leading-none">
                    {user.name}
                  </h4>
                  <span className="text-[9px] text-slate-500 truncate block mt-1 font-bold">
                    #dela-1974
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  if (onClose) onClose();
                  logout();
                }}
                title="Sign Out"
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-900 hover:text-rose-500 transition-colors flex-shrink-0"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
