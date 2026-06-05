import React, { useState } from 'react';
import { Building2, Menu, X } from 'lucide-react';

export const Navbar = ({ onLoginClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-blue-600 text-white p-2 rounded-xl">
                <Building2 className="h-6 w-6" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                City<span className="text-blue-600">Hub</span>
              </span>
            </div>
            <div className="hidden md:ml-8 md:flex md:space-x-8">
              <a href="#features" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white border-b-2 border-transparent hover:border-blue-500 transition-all">
                Features
              </a>
              <a href="#how-it-works" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white border-b-2 border-transparent hover:border-blue-500 transition-all">
                How It Works
              </a>
              <a href="#about" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white border-b-2 border-transparent hover:border-blue-500 transition-all">
                About
              </a>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onLoginClick}
              className="text-sm font-semibold text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-white px-4 py-2 rounded-xl transition-all"
            >
              Sign In
            </button>
            <button
              onClick={onLoginClick}
              className="text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl shadow-sm hover:shadow transition-all"
            >
              Get Started
            </button>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 px-4 pt-2 pb-4 space-y-2 animate-fade-in">
          <a
            href="#features"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-xl text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-900 transition-all"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-xl text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-900 transition-all"
          >
            How It Works
          </a>
          <a
            href="#about"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-xl text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-900 transition-all"
          >
            About
          </a>
          <div className="pt-4 border-t border-slate-100 dark:border-slate-900 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsOpen(false);
                onLoginClick();
              }}
              className="w-full text-center px-4 py-2.5 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900 transition-all border border-slate-200 dark:border-slate-800"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                onLoginClick();
              }}
              className="w-full text-center px-4 py-2.5 rounded-xl text-base font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
