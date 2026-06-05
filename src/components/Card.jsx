import React from 'react';

export const Card = ({ children, className = '', title, subtitle, footer, onClick, variant = 'light' }) => {
  const isClickable = !!onClick;
  const isDark = variant === 'dark';
  
  return (
    <div
      onClick={onClick}
      className={`rounded-[24px] border overflow-hidden transition-all duration-300 ${
        isDark 
          ? 'bg-[#0b120f] border-slate-900 text-slate-100' 
          : 'bg-white border-slate-100 dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-slate-100'
      } ${
        isClickable ? 'cursor-pointer hover:shadow-md hover:scale-[1.005]' : ''
      } ${className}`}
    >
      <div className="p-6">
        {(title || subtitle) && (
          <div className="mb-4">
            {title && (
              <h3 className={`font-heading font-semibold text-lg leading-snug ${
                isDark ? 'text-white' : 'text-slate-800 dark:text-slate-100'
              }`}>
                {title}
              </h3>
            )}
            {subtitle && (
              <p className={`text-xs mt-1 ${
                isDark ? 'text-slate-400' : 'text-slate-450 dark:text-slate-400'
              }`}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div className={isDark ? 'text-slate-300' : 'text-slate-600 dark:text-slate-350'}>
          {children}
        </div>
      </div>
      {footer && (
        <div className={`px-6 pb-5 pt-3 flex items-center justify-between text-[11px] border-t ${
          isDark 
            ? 'border-slate-900/40 text-slate-500' 
            : 'border-slate-50 dark:border-slate-850 text-slate-400 dark:text-slate-500'
        }`}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
