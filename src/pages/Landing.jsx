import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  AlertCircle,
  Wrench,
  Megaphone,
  CheckCircle2,
  Users,
  Shield,
  Clock,
  ArrowRight,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';

export const Landing = () => {
  const { login, isAuthenticated } = useApp();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginRole, setLoginRole] = useState('citizen');
  const [email, setEmail] = useState('john.doe@smartcity.gov');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');

  // Handle redirect if already logged in
  const handleDashboardAccess = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    const success = login(email, password);
    if (success) {
      setShowLoginModal(false);
      navigate('/dashboard');
    } else {
      setError(
        loginRole === 'official'
          ? 'Invalid official credentials. Use: officer.smith@smartcity.gov'
          : 'Invalid citizen credentials. Use: john.doe@smartcity.gov'
      );
    }
  };

  return (
    <div className="bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 min-h-screen transition-colors">
      <Navbar onLoginClick={() => setShowLoginModal(true)} />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                <Building2 className="w-3.5 h-3.5" />
                Empowering Citizens & Services
              </span>
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white leading-tight tracking-tight">
                Smart City Services <br />
                <span className="text-blue-600">at Your Fingertips</span>
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto lg:mx-0">
                CityHub is your centralized portal to report local complaints, locate accredited service professionals, view municipal alerts, and connect with emergency assistance.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={handleDashboardAccess}
                  className="flex items-center justify-center gap-2 font-semibold bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all text-base"
                >
                  <span>Access Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center font-semibold text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 px-7 py-3.5 rounded-xl transition-all text-base"
                >
                  Explore Features
                </a>
              </div>
            </div>

            {/* Right Col: Graphic Elements */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xl p-6 relative animate-float">
                <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                    <div className="w-3 h-3 bg-green-400 rounded-full" />
                  </div>
                  <span className="text-xs text-slate-400 font-mono">cityhub_dashboard.json</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-950/40 rounded-2xl">
                    <div className="p-2.5 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-xl">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-250">Complaints Redressed</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Track, assign, and resolve city bugs</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-950/40 rounded-2xl">
                    <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-xl">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-250">Service Discovery</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Find nearby handymen and doctors</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-950/40 rounded-2xl">
                    <div className="p-2.5 bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 rounded-xl">
                      <Megaphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-250">Announcements Feed</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Get real-time community alerts</p>
                    </div>
                  </div>
                </div>

                {/* Micro visual stats badge */}
                <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white py-3 px-4 rounded-2xl shadow-xl flex items-center gap-3">
                  <div className="p-1.5 bg-white/20 rounded-lg">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-blue-100 font-medium">Resolution Rate</p>
                    <p className="text-lg font-extrabold tracking-tight">94.8%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">
              Centralized Services for Smarter Living
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base">
              A comprehensive system designed to build trust and increase transparency between local authorities and citizens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="p-3.5 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-2xl w-fit mb-5">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-2">Complaint Management</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                Log complaints regarding municipal issues like potholes, streetlights, and sanitation. Attach details and track the status in real time.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="p-3.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-2xl w-fit mb-5">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-2">Service Discovery</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                Browse a directory of certified city services including electricians, plumbers, healthcare centers, transport, and library resources.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="p-3.5 bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 rounded-2xl w-fit mb-5">
                <Megaphone className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-2">Public Update Feeds</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                Stay updated with official municipal announcements, maintenance operations schedules, and real-time emergency safety alerts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row justify-around items-center gap-8 shadow-xl">
            <div className="text-center space-y-1">
              <div className="flex justify-center text-blue-200"><Users className="w-8 h-8" /></div>
              <p className="text-3xl font-extrabold font-heading">50,000+</p>
              <p className="text-xs text-blue-100 uppercase tracking-wider font-semibold">Active Residents</p>
            </div>
            <div className="w-[1px] h-12 bg-white/20 hidden md:block" />
            <div className="text-center space-y-1">
              <div className="flex justify-center text-blue-200"><Shield className="w-8 h-8" /></div>
              <p className="text-3xl font-extrabold font-heading">15 Mins</p>
              <p className="text-xs text-blue-100 uppercase tracking-wider font-semibold">Average Response Time</p>
            </div>
            <div className="w-[1px] h-12 bg-white/20 hidden md:block" />
            <div className="text-center space-y-1">
              <div className="flex justify-center text-blue-200"><Clock className="w-8 h-8" /></div>
              <p className="text-3xl font-extrabold font-heading">12,400+</p>
              <p className="text-xs text-blue-100 uppercase tracking-wider font-semibold">Complaints Resolved</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-100 dark:bg-slate-900 py-12 border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="font-heading font-bold text-lg text-slate-800 dark:text-white">
              CityHub
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            &copy; 2026 CityHub Smart City Initiative. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-slate-500 dark:text-slate-400">
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600">Terms of Service</a>
            <a href="#" className="hover:text-blue-600">Contact Support</a>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <div
            onClick={() => setShowLoginModal(false)}
            className="absolute inset-0 bg-slate-950/65 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden animate-fade-in">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 p-1 rounded-xl text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 text-white p-2 rounded-xl">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-slate-900 dark:text-white">
                Log In to CityHub
              </h3>
            </div>

            {/* Role Switcher Tabs */}
            <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl mb-5">
              <button
                type="button"
                onClick={() => {
                  setLoginRole('citizen');
                  setEmail('john.doe@smartcity.gov');
                  setPassword('password');
                  setError('');
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  loginRole === 'citizen'
                    ? 'bg-white dark:bg-slate-900 shadow text-blue-600 dark:text-blue-400'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Resident Citizen
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginRole('official');
                  setEmail('officer.smith@smartcity.gov');
                  setPassword('password');
                  setError('');
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  loginRole === 'official'
                    ? 'bg-white dark:bg-slate-900 shadow text-emerald-600 dark:text-emerald-400'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Municipal Official
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3.5 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900 text-xs font-semibold text-rose-600 dark:text-rose-400 rounded-xl">
                {error}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/30 text-sm focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 dark:text-white transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/30 text-sm focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 dark:text-white transition-all"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className={`w-full py-3 text-white font-semibold rounded-xl shadow-md transition-all text-sm ${
                    loginRole === 'official' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  Sign In as {loginRole === 'official' ? 'Official' : 'Citizen'}
                </button>
              </div>
            </form>

            <div className="mt-6 border-t border-slate-100 dark:border-slate-800 pt-4 text-center">
              <p className="text-xs text-slate-400">
                Citizen: <span className="font-mono text-slate-600 dark:text-slate-300">john.doe@smartcity.gov</span> <br />
                Official: <span className="font-mono text-slate-600 dark:text-slate-300">officer.smith@smartcity.gov</span> <br />
                Password: <span className="font-mono text-slate-600 dark:text-slate-300 font-bold">password</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
