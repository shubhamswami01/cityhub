import React, { useState } from 'react';
import {
  Wrench,
  Search,
  Star,
  Phone,
  Clock,
  ExternalLink,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Card from '../components/Card';

export const Services = () => {
  const { services, addToast } = useApp();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Utilities', 'Healthcare', 'Sanitation', 'Transport', 'Education'];

  // Handle Contact Button Click
  const handleContact = (service) => {
    // Copy phone to clipboard
    try {
      navigator.clipboard.writeText(service.phone);
      addToast(`Copied phone number for "${service.name}" to clipboard!`, 'success');
    } catch (err) {
      addToast(`Contact ${service.name} at: ${service.phone}`, 'info');
    }
  };

  // Filter services
  const filteredServices = services.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = activeTab === 'All' || s.category === activeTab;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div>
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white leading-tight">
          Service Discovery
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Explore and contact municipal-accredited utility providers and community services.
        </p>
      </div>

      {/* Search & Tabs Panel */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative w-full max-w-sm">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </span>
          <input
            type="text"
            placeholder="Search service name, description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-850 rounded-xl bg-slate-50/50 dark:bg-slate-950/40 text-sm focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 dark:text-white transition-all"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 overflow-x-auto no-scrollbar scroll-smooth gap-1 pb-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-semibold rounded-t-xl transition-all border-b-2 flex-shrink-0 ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400 bg-blue-50/40 dark:bg-blue-950/20'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-200 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.length === 0 ? (
          <div className="col-span-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-12 text-center rounded-2xl flex flex-col items-center justify-center gap-2">
            <Info className="w-12 h-12 text-slate-350 dark:text-slate-650" />
            <h3 className="font-bold text-slate-700 dark:text-slate-350">No services found</h3>
            <p className="text-sm text-slate-400 dark:text-slate-500">
              We couldn't find matches under the "{activeTab}" category for your search query.
            </p>
          </div>
        ) : (
          filteredServices.map((s) => (
            <Card
              key={s.id}
              className="flex flex-col h-full justify-between"
              footer={
                <>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {s.availability}
                  </span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">{s.category}</span>
                </>
              }
            >
              <div className="space-y-4">
                {/* Title & rating */}
                <div className="space-y-1">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-base text-slate-850 dark:text-slate-150 leading-tight">
                      {s.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs">
                    <div className="flex items-center gap-0.5 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-extrabold">{s.rating}</span>
                    </div>
                    <span className="text-slate-400">({s.reviews} reviews)</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed min-h-[40px]">
                  {s.description}
                </p>

                {/* Contact info trigger */}
                <div className="pt-2">
                  <button
                    onClick={() => handleContact(s)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-850 dark:text-slate-300 dark:hover:text-white transition-all shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Copy Phone Number</span>
                  </button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Services;
