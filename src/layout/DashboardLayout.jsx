import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { CardSkeleton, ListSkeleton, ProfileSkeleton } from '../components/Skeleton';

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const location = useLocation();

  // Simulate premium skeleton load transition on route change
  useEffect(() => {
    setPageLoading(true);
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 700); // 700ms skeleton flash to feel responsive but premium
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Determine skeleton type based on route
  const renderSkeleton = () => {
    const path = location.pathname;
    if (path.includes('profile')) {
      return <ProfileSkeleton />;
    } else if (path.includes('announcements') || path.includes('complaints')) {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            <div className="h-10 w-32 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
          </div>
          <ListSkeleton />
        </div>
      );
    } else if (path.includes('services')) {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            <div className="h-10 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      );
    } else {
      // General Dashboard Skeleton
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                <div className="h-8 w-16 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-6 w-36 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
              <ListSkeleton />
            </div>
            <div className="space-y-4">
              <div className="h-6 w-36 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
              <CardSkeleton />
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] dark:bg-[#070a08] transition-colors duration-300">
      {/* Navigation Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="md:pl-64 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Dashboard main viewport outlet */}
        <main className="flex-grow p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {pageLoading ? renderSkeleton() : <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
