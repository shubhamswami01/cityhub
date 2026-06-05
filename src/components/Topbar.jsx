import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  Sun,
  Moon,
  Search,
  Menu,
  ChevronDown,
  User,
  LogOut,
  Settings,
  CheckCheck,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Topbar = ({ onMenuClick }) => {
  const {
    user,
    theme,
    toggleTheme,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    clearAllNotifications,
    logout
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Handle click outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 h-16 bg-transparent border-none flex items-center justify-between px-4 md:px-8 transition-colors">
      {/* Left side: Hamburger (mobile only) + Search bar */}
      <div className="flex items-center gap-4 flex-grow md:flex-grow-0">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 md:hidden transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative max-w-xs w-full hidden sm:block">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </span>
          <input
            type="text"
            placeholder="Search dashboard, services..."
            className="block w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-950/40 text-sm focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 dark:text-white transition-all"
          />
        </div>
      </div>

      {/* Right side: Icons and Profile */}
      <div className="flex items-center gap-2">
        {/* Search icon for mobile screen */}
        <button className="p-2 rounded-xl text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 sm:hidden transition-colors">
          <Search className="w-5 h-5" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications Center */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl z-50 overflow-hidden py-1 animate-fade-in">
              <div className="px-4 py-3 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
                <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">Notifications</span>
                {unreadCount > 0 && (
                  <span className="text-xs bg-blue-50 text-blue-600 dark:bg-blue-950/55 dark:text-blue-400 px-2 py-0.5 rounded-full font-medium">
                    {unreadCount} new
                  </span>
                )}
              </div>

              {/* Notification List */}
              <div className="max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="px-4 py-6 text-center text-slate-400 dark:text-slate-500 text-xs flex flex-col items-center gap-1">
                    <AlertCircle className="w-8 h-8 opacity-40" />
                    <span>No notifications yet.</span>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => markNotificationRead(notification.id)}
                      className={`px-4 py-3 border-b border-slate-50 dark:border-slate-800/40 text-xs hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer flex gap-3 items-start transition-colors ${
                        !notification.read ? 'bg-blue-50/30 dark:bg-blue-950/10' : ''
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!notification.read ? 'bg-blue-500' : 'bg-transparent'}`} />
                      <div className="flex-grow space-y-1">
                        <p className={`text-slate-700 dark:text-slate-300 leading-normal ${!notification.read ? 'font-medium' : ''}`}>
                          {notification.text}
                        </p>
                        <span className="text-slate-400 dark:text-slate-500 block">{notification.time}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Notification Footer Actions */}
              {notifications.length > 0 && (
                <div className="px-3 py-2 bg-slate-50/50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  <button
                    onClick={() => {
                      markAllNotificationsRead();
                      setShowNotifications(false);
                    }}
                    className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Mark all read</span>
                  </button>
                  <button
                    onClick={() => {
                      clearAllNotifications();
                      setShowNotifications(false);
                    }}
                    className="flex items-center gap-1 text-rose-500 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear all</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-[1px] h-6 bg-slate-100 dark:bg-slate-800 mx-1" />

        {/* Profile Dropdown */}
        {user && (
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-1.5 p-1 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              aria-label="Profile menu"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-850"
              />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 hidden md:block select-none max-w-[100px] truncate">
                {user.name.split(' ')[0]}
              </span>
              <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
            </button>

            {/* Profile Dropdown Menu */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl z-50 overflow-hidden py-1 animate-fade-in">
                <div className="px-4 py-3 border-b border-slate-50 dark:border-slate-800">
                  <p className="text-xs text-slate-400 dark:text-slate-500">Signed in as</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate mt-0.5">{user.name}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 truncate mt-0.5">{user.email}</p>
                </div>

                <div className="p-1">
                  <Link
                    to="/profile"
                    onClick={() => setShowProfile(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() => setShowProfile(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    <span>Account Settings</span>
                  </Link>
                </div>

                <div className="p-1 border-t border-slate-50 dark:border-slate-800">
                  <button
                    onClick={() => {
                      setShowProfile(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;
