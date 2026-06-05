import React, { useState } from 'react';
import {
  AlertCircle,
  Clock,
  CheckCircle2,
  Plus,
  Search,
  Filter,
  MapPin,
  X,
  ShieldAlert,
  Calendar
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Card from '../components/Card';

export const Complaints = () => {
  const { complaints, raiseComplaint, updateComplaintStatus, user } = useApp();
  const isOfficial = user?.role === 'Municipal Official';

  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Sanitation');
  const [location, setLocation] = useState('');
  const [severity, setSeverity] = useState('Medium');

  const categories = ['Sanitation', 'Water Supply', 'Electricity', 'Roads & Traffic', 'Public Safety', 'Others'];

  // Handle Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !location) {
      alert('Please fill out all required fields.');
      return;
    }
    raiseComplaint({ title, description, category, location, severity });
    // Reset Form
    setTitle('');
    setDescription('');
    setCategory('Sanitation');
    setLocation('');
    setSeverity('Medium');
    setShowModal(false);
  };

  // Filter complaints
  const filteredComplaints = complaints.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || c.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Resolved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900';
      case 'In Progress':
        return 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900';
      default:
        return 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Resolved':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'In Progress':
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getSeverityStyle = (sev) => {
    switch (sev) {
      case 'High':
        return 'bg-rose-50 text-rose-600 border border-rose-100 dark:bg-rose-950/30 dark:text-rose-450 dark:border-rose-900';
      case 'Medium':
        return 'bg-amber-50 text-amber-600 border border-amber-100 dark:bg-amber-950/30 dark:text-amber-450 dark:border-amber-900';
      default:
        return 'bg-slate-50 text-slate-600 border border-slate-100 dark:bg-slate-900/50 dark:text-slate-400 dark:border-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white leading-tight">
            Complaint Redressal
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Submit new civic issues or monitor the status of ongoing reports.
          </p>
        </div>
        {!isOfficial && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-sm hover:shadow transition-all text-sm flex items-center justify-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Raise Complaint</span>
          </button>
        )}
      </div>

      {/* Filters & search panel */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </span>
          <input
            type="text"
            placeholder="Search by ID or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-850 rounded-xl bg-slate-50/50 dark:bg-slate-950/40 text-sm focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 dark:text-white transition-all"
          />
        </div>

        {/* Filters Select boxes */}
        <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-950/40 text-xs py-2 px-3 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 dark:text-white"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="w-full sm:w-auto">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full sm:w-auto border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-950/40 text-xs py-2 px-3 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 dark:text-white"
            >
              <option value="All">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Complaints Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredComplaints.length === 0 ? (
          <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-12 text-center rounded-2xl flex flex-col items-center justify-center gap-2">
            <AlertCircle className="w-12 h-12 text-slate-300 dark:text-slate-600" />
            <h3 className="font-bold text-slate-700 dark:text-slate-350">No complaints found</h3>
            <p className="text-sm text-slate-400 dark:text-slate-500">
              Try adjusting your search criteria or register a new complaint.
            </p>
          </div>
        ) : (
          filteredComplaints.map((c) => (
            <Card
              key={c.id}
              className="flex flex-col h-full justify-between"
              footer={
                <>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {c.date}
                  </span>
                  <span className="font-mono text-slate-400 font-bold">{c.id}</span>
                </>
              }
            >
              <div className="space-y-3">
                {/* Header tags */}
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-md">
                    {c.category}
                  </span>
                  <div className="flex gap-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${getSeverityStyle(c.severity)}`}>
                      {c.severity} Severity
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusStyle(c.status)}`}>
                      {getStatusIcon(c.status)}
                      {c.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <h3 className="font-bold text-base text-slate-800 dark:text-slate-200 leading-tight">
                    {c.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {c.description}
                  </p>
                </div>

                {/* Location */}
                <div className="flex items-start gap-1.5 text-xs text-slate-400 dark:text-slate-500">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <span className="truncate">{c.location}</span>
                </div>

                {/* Official Response Remark */}
                {c.officialNote && (
                  <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 rounded-xl text-xs">
                    <p className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Official Response:
                    </p>
                    <p className="text-slate-650 dark:text-slate-400 italic">"{c.officialNote}"</p>
                  </div>
                )}

                {/* Official Management Section */}
                {isOfficial && (
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Official Management Action</p>
                    
                    {/* Status updates */}
                    <div className="flex gap-2">
                      {c.status === 'Pending' && (
                        <button
                          onClick={() => updateComplaintStatus(c.id, 'In Progress')}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all"
                        >
                          Start Progress
                        </button>
                      )}
                      {c.status !== 'Resolved' && (
                        <button
                          onClick={() => {
                            const note = prompt(`Enter official resolution note for ${c.id}:`) || '';
                            updateComplaintStatus(c.id, 'Resolved', note);
                          }}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all"
                        >
                          Resolve Complaint
                        </button>
                      )}
                      {c.status === 'Resolved' && (
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold italic flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Resolved & Completed
                        </span>
                      )}
                    </div>
                    
                    {/* Remarks form */}
                    {c.status !== 'Resolved' && (
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          placeholder="Type status remark..."
                          id={`note-${c.id}`}
                          defaultValue={c.officialNote}
                          className="flex-grow px-3 py-2 text-xs border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950 focus:outline-none dark:text-white"
                        />
                        <button
                          onClick={() => {
                            const input = document.getElementById(`note-${c.id}`);
                            updateComplaintStatus(c.id, c.status, input?.value || '');
                          }}
                          className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-250 text-xs font-bold px-3 py-2 rounded-xl transition-all border border-slate-200 dark:border-slate-700"
                        >
                          Save Note
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Raise Complaint Modal Dialog */}
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
              <div className="bg-blue-600 text-white p-2 rounded-xl">
                <Plus className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
                Raise Civic Complaint
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Complaint Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Broken water pipeline, Pavement pothole"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="block w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/30 text-sm focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 dark:text-white transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="block w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/30 text-sm focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 dark:text-white transition-all"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Severity Level
                  </label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    className="block w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/30 text-sm focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 dark:text-white transition-all"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Incident Location *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Near 4th Street park bench, Sector 2"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="block w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/30 text-sm focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 dark:text-white transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Detailed Description *
                </label>
                <textarea
                  rows="3"
                  placeholder="Explain the issue details, extent of damage, and how long it has been present..."
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
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow transition-all text-sm"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Complaints;
