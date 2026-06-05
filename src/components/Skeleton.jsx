import React from 'react';

export const Skeleton = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-slate-200 dark:bg-slate-800 rounded ${className}`} />
  );
};

export const CardSkeleton = () => {
  return (
    <div className="border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <Skeleton className="h-10 w-1/2" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
};

export const ListSkeleton = () => {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((n) => (
        <div key={n} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-4 flex gap-4 items-center">
          <Skeleton className="h-12 w-12 rounded-lg flex-shrink-0" />
          <div className="flex-grow space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const ProfileSkeleton = () => {
  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-8 shadow-sm space-y-6">
      <div className="flex flex-col items-center space-y-3">
        <Skeleton className="h-24 w-24 rounded-full" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Skeleton className="h-10 w-24 rounded-lg" />
      </div>
    </div>
  );
};

export default Skeleton;
