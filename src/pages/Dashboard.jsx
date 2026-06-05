import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  Clock,
  CheckCircle2,
  Bell,
  ArrowRight,
  TrendingUp,
  ChevronDown,
  RotateCcw,
  Sparkles,
  Search,
  Filter,
  Calendar,
  MapPin
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Card from '../components/Card';
import ChatSection from '../components/ChatSection';

export const Dashboard = () => {
  const { complaints, announcements, user, services, addToast } = useApp();
  const navigate = useNavigate();

  const totalCount = complaints.length;
  const activeCount = complaints.filter((c) => c.status !== 'Resolved').length;
  const resolvedCount = complaints.filter((c) => c.status === 'Resolved').length;

  const isOfficial = user?.role === 'Municipal Official';

  // Booking states
  const [bookings, setBookings] = useState([
    {
      id: 'BKG-401',
      providerName: 'FlowGuard Plumbing Services',
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
      time: '02:00 PM',
      status: 'Confirmed'
    }
  ]);
  const [selectedServiceId, setSelectedServiceId] = useState(services?.[0]?.id || 'SRV-01');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('10:00 AM');

  // Complaints filter states
  const [dashSearch, setDashSearch] = useState('');
  const [dashCategory, setDashCategory] = useState('All');
  const [dashStatus, setDashStatus] = useState('All');

  const dashCategories = ['Sanitation', 'Water Supply', 'Electricity', 'Roads & Traffic', 'Public Safety', 'Others'];

  const dashFilteredComplaints = complaints.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(dashSearch.toLowerCase()) ||
      c.id.toLowerCase().includes(dashSearch.toLowerCase()) ||
      c.description.toLowerCase().includes(dashSearch.toLowerCase());
    
    const matchesCategory = dashCategory === 'All' || c.category === dashCategory;
    const matchesStatus = dashStatus === 'All' || c.status === dashStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getDashStatusStyle = (status) => {
    switch (status) {
      case 'Resolved':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-450';
      case 'In Progress':
        return 'bg-blue-55 text-blue-750 dark:bg-blue-950/30 dark:text-blue-400';
      default:
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Upper Title Header */}
      <div className="flex items-center justify-between pb-2">
        <div>
          <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white leading-none">
            Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl transition-all relative">
            <Bell className="w-4 h-4 text-slate-600 dark:text-slate-350" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
          </button>
          <button
            onClick={() => navigate(isOfficial ? '/announcements' : '/complaints')}
            className="px-5 py-2.5 bg-[#0b120f] hover:bg-slate-900 text-white font-bold rounded-2xl shadow-sm text-xs flex items-center gap-2 transition-all border border-slate-900"
          >
            <span>{isOfficial ? 'Publish Alert' : 'Add Service Request'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
          </button>
        </div>
      </div>

      {/* Three Stats Cards at the Top */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Service Bookings (Dark Card) */}
        <Card variant="dark" className="relative flex flex-col justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Book Service Appointment</p>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-1">
            {/* Service dropdown */}
            <div>
              <label className="block text-[8px] text-slate-400 font-bold uppercase mb-0.5">Provider</label>
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-850 rounded-lg py-1 px-1.5 text-slate-200 focus:outline-none text-[10px] h-6 cursor-pointer font-medium"
              >
                {services?.map((s) => (
                  <option key={s.id} value={s.id} className="bg-slate-950 text-slate-200">
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Time Input */}
            <div>
              <label className="block text-[8px] text-slate-400 font-bold uppercase mb-0.5">Date & Time</label>
              <div className="flex gap-1">
                <input
                  type="date"
                  value={bookingDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-1/2 bg-slate-900 border border-slate-850 rounded-lg py-0.5 px-1 text-slate-200 text-[9px] focus:outline-none h-6 cursor-pointer font-medium"
                />
                <select
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-1/2 bg-slate-900 border border-slate-850 rounded-lg py-1 px-0.5 text-slate-200 text-[9px] focus:outline-none h-6 cursor-pointer font-medium"
                >
                  <option value="09:00 AM">9 AM</option>
                  <option value="10:00 AM">10 AM</option>
                  <option value="11:00 AM">11 AM</option>
                  <option value="01:00 PM">1 PM</option>
                  <option value="02:00 PM">2 PM</option>
                  <option value="03:00 PM">3 PM</option>
                  <option value="04:00 PM">4 PM</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-2 items-center mt-3 pt-1.5 border-t border-slate-900/50">
            <button
              onClick={() => {
                if (!bookingDate) {
                  addToast('Please select a booking date.', 'error');
                  return;
                }
                const provider = services?.find(s => s.id === selectedServiceId);
                const newBkg = {
                  id: `BKG-${Math.floor(100 + Math.random() * 900)}`,
                  providerName: provider ? provider.name : 'Selected Service',
                  date: bookingDate,
                  time: bookingTime,
                  status: 'Confirmed'
                };
                setBookings(prev => [newBkg, ...prev]);
                addToast(`Appointment booked with ${newBkg.providerName}!`, 'success');
              }}
              className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-[9px] rounded-lg transition-colors flex-shrink-0"
            >
              Book Slot
            </button>

            {/* Show recent booking info */}
            {bookings.length > 0 ? (
              <div className="text-[9px] text-slate-400 font-medium truncate flex-1 pl-1">
                <span className="text-emerald-450 font-bold">Next: </span>
                {bookings[0].providerName} ({bookings[0].date} {bookings[0].time})
              </div>
            ) : (
              <div className="text-[9px] text-slate-500 font-medium italic flex-1 pl-1">
                No active bookings
              </div>
            )}
          </div>
        </Card>

        {/* Card 2: Satisfaction EQI */}
        <Card className="relative">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Satisfaction Index</p>
              <h2 className="text-2xl font-extrabold font-heading text-slate-800 dark:text-white mt-1">75.50/100%</h2>
              <span className="inline-flex items-center gap-1 text-[10px] text-rose-500 mt-1 font-bold">
                <TrendingUp className="w-3 h-3 transform rotate-180" />
                1.4% <span className="text-slate-400 dark:text-slate-500 font-normal">than last month</span>
              </span>
            </div>
            {/* Small CSS Bar Chart Column */}
            <div className="flex items-end gap-1 h-12 pt-2">
              <div className="w-1.5 bg-slate-100 dark:bg-slate-800 rounded-t h-6" />
              <div className="w-1.5 bg-rose-500 rounded-t h-4" />
              <div className="w-1.5 bg-slate-100 dark:bg-slate-800 rounded-t h-8" />
              <div className="w-1.5 bg-rose-500 rounded-t h-5" />
              <div className="w-1.5 bg-slate-100 dark:bg-slate-800 rounded-t h-10" />
            </div>
          </div>
          <div className="absolute right-4 bottom-3 text-[9px] text-slate-400 dark:text-slate-500 font-bold font-mono">
            Active: {activeCount}
          </div>
        </Card>

        {/* Card 3: Investments */}
        <Card className="relative">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Clean Technologies</p>
              <h2 className="text-2xl font-extrabold font-heading text-slate-800 dark:text-white mt-1">$967,570</h2>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 mt-1 font-bold">
                <TrendingUp className="w-3 h-3" />
                5.1% <span className="text-slate-400 dark:text-slate-500 font-normal">than last month</span>
              </span>
            </div>
            {/* Small CSS Bar Chart Column */}
            <div className="flex items-end gap-1 h-12 pt-2">
              <div className="w-1.5 bg-slate-100 dark:bg-slate-800 rounded-t h-5" />
              <div className="w-1.5 bg-emerald-500 rounded-t h-9" />
              <div className="w-1.5 bg-slate-100 dark:bg-slate-800 rounded-t h-6" />
              <div className="w-1.5 bg-emerald-500 rounded-t h-11" />
              <div className="w-1.5 bg-slate-100 dark:bg-slate-800 rounded-t h-4" />
            </div>
          </div>
          <div className="absolute right-4 bottom-3 text-[9px] text-slate-400 dark:text-slate-500 font-bold font-mono">
            Resolved: {resolvedCount}
          </div>
        </Card>
      </div>

      {/* Middle Graph Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Complaint Volume Chart (Spans 2 cols) */}
        <Card className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-heading font-bold text-base text-slate-800 dark:text-slate-100">
                Climate Change Index
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 font-semibold">Scale</span>
              <button className="px-2.5 py-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-[10px] font-bold flex items-center gap-1 dark:text-slate-300">
                <span>2 month</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Graph Display Area */}
          <div className="relative pt-6 h-48 flex items-end justify-between border-b border-slate-100 dark:border-slate-850 px-2 select-none">
            {/* Dashed Horizontal Grid Lines */}
            <div className="absolute inset-x-0 top-6 border-t border-dashed border-slate-100 dark:border-slate-850 w-full" />
            <div className="absolute inset-x-0 top-18 border-t border-dashed border-slate-100 dark:border-slate-850 w-full" />
            <div className="absolute inset-x-0 top-30 border-t border-dashed border-slate-100 dark:border-slate-850 w-full" />

            {/* Custom Bar Grid */}
            <div className="flex items-end h-full w-full justify-around relative">
              <div className="flex flex-col items-center">
                <div className="w-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 transition-colors rounded-t h-16" />
                <span className="text-[8px] font-bold text-slate-400 mt-2">W1</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 transition-colors rounded-t h-24" />
                <span className="text-[8px] font-bold text-slate-400 mt-2">W2</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 transition-colors rounded-t h-12" />
                <span className="text-[8px] font-bold text-slate-400 mt-2">W3</span>
              </div>
              {/* Highlighted W4 Bar */}
              <div className="flex flex-col items-center relative">
                {/* Floating Tooltip */}
                <div className="absolute -top-9 bg-slate-950 border border-slate-900 px-2.5 py-1 rounded-lg text-[9px] font-extrabold text-white shadow-xl flex items-center gap-1 z-10 whitespace-nowrap">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>82.6 CCI</span>
                </div>
                <div className="w-2.5 bg-[#0b120f] dark:bg-emerald-500 rounded-t h-32 border border-emerald-500/35" />
                <span className="text-[8px] font-extrabold text-slate-800 dark:text-emerald-450 mt-2">W4</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-2.5 bg-emerald-500/20 rounded-t h-20" />
                <span className="text-[8px] font-bold text-slate-400 mt-2">W5</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-2.5 bg-emerald-500/20 rounded-t h-24" />
                <span className="text-[8px] font-bold text-slate-400 mt-2">W6</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-2.5 bg-emerald-500/20 rounded-t h-16" />
                <span className="text-[8px] font-bold text-slate-400 mt-2">W7</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-2.5 bg-emerald-500/20 rounded-t h-28" />
                <span className="text-[8px] font-bold text-slate-400 mt-2">W8</span>
              </div>
            </div>
          </div>
        </Card>

        <ChatSection />
      </div>      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bottom Left: Live Complaints Filter (2 cols) */}
        <Card className="lg:col-span-2 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h3 className="font-heading font-bold text-base text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              <span>Live Complaints Explorer</span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                {dashFilteredComplaints.length} matches
              </span>
            </h3>

            {/* Quick Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Search bar */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <Search className="h-3 w-3 text-slate-450" />
                </span>
                <input
                  type="text"
                  placeholder="Search..."
                  value={dashSearch}
                  onChange={(e) => setDashSearch(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-7 pr-2.5 py-1 text-[11px] text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500/40 w-32"
                />
              </div>

              {/* Status Select */}
              <select
                value={dashStatus}
                onChange={(e) => setDashStatus(e.target.value)}
                className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-2 py-1 text-[10px] text-slate-650 dark:text-slate-350 focus:outline-none cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>

              {/* Category Select */}
              <select
                value={dashCategory}
                onChange={(e) => setDashCategory(e.target.value)}
                className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-2 py-1 text-[10px] text-slate-650 dark:text-slate-350 focus:outline-none cursor-pointer"
              >
                <option value="All">All Categories</option>
                {dashCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto max-h-[220px] scrollbar-thin">
            {dashFilteredComplaints.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400 dark:text-slate-500 font-medium italic">
                No reports found matching criteria.
              </div>
            ) : (
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-50 dark:border-slate-850 text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider text-[9px] sticky top-0 bg-white dark:bg-slate-900 z-10">
                    <th className="pb-2 pr-2 font-bold">Case Info</th>
                    <th className="pb-2 px-2 font-bold">Category</th>
                    <th className="pb-2 px-2 font-bold">Location</th>
                    <th className="pb-2 pl-2 font-bold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-855 text-slate-600 dark:text-slate-300 font-medium">
                  {dashFilteredComplaints.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-850/20 transition-colors">
                      <td className="py-2.5 pr-2">
                        <p className="font-bold text-slate-800 dark:text-slate-200 leading-none text-xs">{c.title}</p>
                        <span className="text-[8px] font-mono font-bold text-slate-400 dark:text-slate-550 mt-0.5 inline-block">{c.id} • {c.date}</span>
                      </td>
                      <td className="py-2.5 px-2">
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-50 dark:bg-slate-850 px-1.5 py-0.5 rounded">
                          {c.category}
                        </span>
                      </td>
                      <td className="py-2.5 px-2 text-slate-500 max-w-[120px] truncate text-[11px] font-semibold">{c.location}</td>
                      <td className="py-2.5 pl-2 text-right">
                        <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[9px] font-extrabold border ${getDashStatusStyle(c.status)}`}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Card>

        {/* Bottom Right: Sector Safety Heatmap Card (1 col) */}
        <Card variant="dark" className="flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-heading font-bold text-sm text-white">
              Sector Reports Map
            </h3>
            <button className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded-lg text-[9px] font-bold flex items-center gap-1 text-slate-300">
              <span>Metropolis</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>

          {/* SVG Map Section */}
          <div className="relative bg-[#070b09] border border-slate-900 rounded-2xl p-4 flex items-center justify-center overflow-hidden min-h-[160px] select-none">
            <svg className="w-full h-36 opacity-80" viewBox="0 0 200 120">
              {/* Map grid outlines simulating sectors */}
              <rect x="15" y="15" width="70" height="40" fill="#1b2520" stroke="#0b120f" strokeWidth="1.5" rx="6" />
              <rect x="90" y="15" width="95" height="40" fill="#1b2520" stroke="#0b120f" strokeWidth="1.5" rx="6" />
              <rect x="90" y="60" width="95" height="45" fill="#1b2520" stroke="#0b120f" strokeWidth="1.5" rx="6" />
              
              {/* High levels warning highlighted sector (Sector 3) */}
              <rect x="15" y="60" width="70" height="45" fill="#361a1f" stroke="#ef4444" strokeWidth="2" rx="6" />
              
              {/* Overlay warning waves */}
              <circle cx="50" cy="82" r="12" fill="#ef4444" className="animate-ping opacity-20" />
              <circle cx="50" cy="82" r="5" fill="#ef4444" />
            </svg>

            {/* Warning Map Tooltip label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-12 -translate-y-4 bg-slate-900/90 border border-slate-800 backdrop-blur-sm px-2.5 py-1.5 rounded-xl text-center shadow-2xl z-10 flex gap-2 items-center">
              <div className="text-left">
                <p className="text-[9px] font-bold text-white">Sector 3</p>
                <p className="text-[8px] font-bold text-rose-500 mt-0.5">High Unresolved</p>
              </div>
              <div className="w-[1px] h-6 bg-slate-800" />
              <span className="text-[10px] font-bold text-emerald-400">89%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
