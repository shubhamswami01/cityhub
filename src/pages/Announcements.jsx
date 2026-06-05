import React, { useState } from 'react';
import {
  Megaphone,
  AlertTriangle,
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
  Pin,
  Plus,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Card from '../components/Card';

export const Announcements = () => {
  const { announcements, postAnnouncement, user } = useApp();
  const isOfficial = user?.role === 'Municipal Official';

  const [expandedId, setExpandedId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('General');
  const [important, setImportant] = useState(false);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert('Please fill out all required fields.');
      return;
    }
    postAnnouncement({ title, description, category, important });
    // Reset Form
    setTitle('');
    setDescription('');
    setCategory('General');
    setImportant(false);
    setShowModal(false);
  };

  const getCategoryStyles = (category) => {
    switch (category) {
      case 'Safety Alert':
        return 'bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-950/40 dark:text-rose-450 dark:border-rose-900';
      case 'Maintenance':
        return 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/40 dark:text-amber-450 dark:border-rose-900';
      default:
        return 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/40 dark:text-blue-450 dark:border-blue-900';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white leading-tight">
            Public Announcements
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Stay informed with active notices, weather alerts, and maintenance projects from the municipality.
          </p>
        </div>
        {isOfficial && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-sm hover:shadow transition-all text-sm flex items-center justify-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Update</span>
          </button>
        )}
      </div>

      {/* Announcements List */}
      <div className="max-w-3xl mx-auto space-y-4">
        {announcements.map((ann) => {
          const isExpanded = expandedId === ann.id;
          const isUrgent = ann.important;

          return (
            <div
              key={ann.id}
              className={`bg-white dark:bg-slate-900 border rounded-2xl shadow-sm transition-all duration-300 overflow-hidden ${
                isUrgent
                  ? 'border-l-4 border-l-rose-500 border-slate-200 dark:border-slate-800'
                  : 'border-slate-100 dark:border-slate-800'
              }`}
            >
              {/* Header block (always visible) */}
              <div
                onClick={() => toggleExpand(ann.id)}
                className="p-5 flex items-start gap-4 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-850/30 transition-colors"
              >
                {/* Icon box */}
                <div className={`p-2.5 rounded-xl flex-shrink-0 ${
                  isUrgent
                    ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-455'
                    : 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-455'
                }`}>
                  {ann.category === 'Safety Alert' ? <AlertTriangle className="w-5 h-5" /> : <Megaphone className="w-5 h-5" />}
                </div>

                {/* Text Content */}
                <div className="flex-grow min-w-0 space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getCategoryStyles(ann.category)}`}>
                      {ann.category}
                    </span>
                    {isUrgent && (
                      <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded uppercase tracking-wider animate-pulse">
                        <Pin className="w-2.5 h-2.5 fill-current" />
                        Urgent
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-base text-slate-850 dark:text-slate-100 leading-tight truncate pr-4">
                    {ann.title}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {ann.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {ann.time}
                    </span>
                  </div>
                </div>

                {/* Expand Chevron */}
                <div className="text-slate-400 self-center">
                  {isExpanded ? <ChevronDown className="w-5 h-5 transform rotate-180 transition-transform" /> : <ChevronDown className="w-5 h-5 transition-transform" />}
                </div>
              </div>

              {/* Expandable details */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-50 dark:border-slate-800/60 bg-slate-50/20 dark:bg-slate-900/30 text-sm text-slate-650 dark:text-slate-400 leading-relaxed space-y-3">
                  <p className="whitespace-pre-line">{ann.description}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Publish Announcement Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <div
            onClick={() => setShowModal(false)}
            className="absolute inset-0 bg-slate-950/65 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden animate-fade-in">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1 rounded-xl text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-6">
              <div className="bg-emerald-600 text-white p-2 rounded-xl">
                <Megaphone className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
                Publish Public Update
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Announcement Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Scheduled Power Outage, Sanitation Drive"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="block w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/30 text-sm focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 dark:text-white transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="block w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/30 text-sm focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 dark:text-white transition-all"
                  >
                    <option value="General">General</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Safety Alert">Safety Alert</option>
                  </select>
                </div>

                <div className="flex items-center pt-5 pl-2">
                  <input
                    type="checkbox"
                    id="urgent-checkbox"
                    checked={important}
                    onChange={(e) => setImportant(e.target.checked)}
                    className="w-4.5 h-4.5 text-rose-600 border-slate-300 rounded focus:ring-rose-500 dark:bg-slate-950 dark:border-slate-800"
                  />
                  <label htmlFor="urgent-checkbox" className="ml-2.5 text-xs font-bold text-slate-600 dark:text-slate-350 cursor-pointer select-none">
                    Mark as Urgent/Alert
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Content Details *
                </label>
                <textarea
                  rows="4"
                  placeholder="Provide details about the notice, who is affected, time ranges, and contact instructions..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/30 text-sm focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 dark:text-white transition-all resize-none"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 border border-slate-200 dark:border-slate-850 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-xl transition-all text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow transition-all text-sm"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;
