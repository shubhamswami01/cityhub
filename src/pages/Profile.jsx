import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Edit2,
  Save,
  X,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Card from '../components/Card';

export const Profile = () => {
  const { user, updateProfile } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const isOfficial = user?.role === 'Municipal Official';

  // Form State
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [city, setCity] = useState(user?.city || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [department, setDepartment] = useState(user?.department || '');

  const handleSave = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Name and Email are required.');
      return;
    }
    const updatePayload = { name, email, phone, city, avatar };
    if (isOfficial) {
      updatePayload.department = department;
    }
    updateProfile(updatePayload);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset Form to current user details
    setName(user?.name || '');
    setEmail(user?.email || '');
    setPhone(user?.phone || '');
    setCity(user?.city || '');
    setAvatar(user?.avatar || '');
    setDepartment(user?.department || '');
    setIsEditing(false);
  };

  const avatarOptions = [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  ];

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div>
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white leading-tight">
          {isOfficial ? 'Official Profile' : 'Citizen Profile'}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Manage your personal information, address location, and portal session settings.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="shadow-md">
          {/* View Mode */}
          {!isEditing ? (
            <div className="space-y-6">
              {/* Profile Card Header */}
              <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-slate-50 dark:border-slate-800">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className={`w-24 h-24 rounded-full object-cover border-4 bg-white dark:bg-slate-850 shadow-md ${
                    isOfficial ? 'border-emerald-500/20' : 'border-blue-500/20'
                  }`}
                />
                <div>
                  <h2 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">
                    {user?.name}
                  </h2>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{user?.role}</p>
                </div>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                  isOfficial
                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/45 dark:text-emerald-450'
                    : 'bg-blue-50 text-blue-600 dark:bg-blue-950/45 dark:text-blue-400'
                }`}>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {isOfficial ? 'Verified Official' : 'Verified Profile'}
                </span>
              </div>

              {/* Profile Details List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 rounded-xl">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Full Name</p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{user?.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 rounded-xl">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 rounded-xl">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone Number</p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{user?.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 rounded-xl">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">City Location</p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{user?.city}</p>
                  </div>
                </div>

                {isOfficial && (
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 rounded-xl">
                      <Building className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Department</p>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{user?.department}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="flex justify-end pt-4 border-t border-slate-50 dark:border-slate-800">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-sm hover:shadow transition-all text-sm"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>
          ) : (
            /* Edit Mode Form */
            <form onSubmit={handleSave} className="space-y-6">
              <div className="text-center pb-4 border-b border-slate-50 dark:border-slate-800 space-y-4">
                <h3 className="font-bold text-lg text-slate-800 dark:text-white">Edit Profile Details</h3>
                
                {/* Avatar Picker */}
                <div className="space-y-2">
                  <div className="flex justify-center gap-3">
                    {avatarOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setAvatar(opt)}
                        className={`rounded-full overflow-hidden border-2 p-0.5 transition-all ${
                          avatar === opt ? 'border-blue-600 scale-105 shadow' : 'border-transparent opacity-60'
                        }`}
                      >
                        <img src={opt} alt="Avatar" className="w-12 h-12 rounded-full object-cover" />
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400">Select profile picture</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-855 bg-slate-50/50 dark:bg-slate-950/30 text-sm focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 dark:text-white transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-855 bg-slate-50/50 dark:bg-slate-950/30 text-sm focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 dark:text-white transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-855 bg-slate-50/50 dark:bg-slate-950/30 text-sm focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 dark:text-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    City Location
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="block w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-855 bg-slate-50/50 dark:bg-slate-950/30 text-sm focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 dark:text-white transition-all"
                  />
                </div>

                {isOfficial && (
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Department
                    </label>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="block w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-855 bg-slate-50/50 dark:bg-slate-950/30 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 dark:text-white transition-all"
                    />
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-50 dark:border-slate-800">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center gap-1 px-4 py-2.5 border border-slate-200 dark:border-slate-850 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-855 rounded-xl transition-all text-sm font-semibold"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow transition-all text-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Profile;
