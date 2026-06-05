import React from 'react';
import {
  ShieldAlert,
  PhoneCall,
  Flame,
  Activity,
  AlertOctagon,
  HeartHandshake,
  Users
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Card from '../components/Card';

export const EmergencyContacts = () => {
  const { emergencyContacts, addToast } = useApp();

  const handleCall = (contact) => {
    // Simulated emergency call action
    addToast(`Simulating call to ${contact.name} (${contact.number})...`, 'warning');
    
    // Copy number to clipboard as fallback utility
    try {
      navigator.clipboard.writeText(contact.number);
    } catch (e) {}
  };

  const getIcon = (name) => {
    switch (name) {
      case 'Police Helpline':
        return <ShieldAlert className="w-6 h-6 text-blue-500" />;
      case 'Ambulance & Medical':
        return <Activity className="w-6 h-6 text-rose-500" />;
      case 'Fire Station Control':
        return <Flame className="w-6 h-6 text-amber-500" />;
      case 'Disaster Management':
        return <AlertOctagon className="w-6 h-6 text-orange-500" />;
      case 'Women Helpline':
        return <HeartHandshake className="w-6 h-6 text-purple-500" />;
      default:
        return <Users className="w-6 h-6 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div>
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white leading-tight">
          Emergency Services
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Direct lines to city defense, healthcare response, rescue networks, and resident safety.
        </p>
      </div>

      {/* Emergency Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {emergencyContacts.map((contact) => (
          <Card
            key={contact.name}
            className="border-t-4 border-t-rose-500 flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Header and title */}
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-950/40 rounded-xl">
                  {getIcon(contact.name)}
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-800 dark:text-slate-250 leading-tight">
                    {contact.name}
                  </h3>
                  <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded mt-1 inline-block">
                    {contact.category}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed min-h-[36px]">
                {contact.desc}
              </p>
            </div>

            {/* Quick Call Action button */}
            <div className="pt-4 border-t border-slate-50 dark:border-slate-800/40 mt-4 flex items-center justify-between gap-4">
              <span className="text-lg font-mono font-extrabold text-slate-900 dark:text-white tracking-wider">
                {contact.number}
              </span>
              <button
                onClick={() => handleCall(contact)}
                className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-all"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Emergency Caution Banner */}
      <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 rounded-2xl flex items-start gap-3 max-w-xl mx-auto mt-6 text-amber-800 dark:text-amber-300">
        <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-bold">Proper Use of Emergency Services</p>
          <p className="leading-relaxed opacity-90">
            Please use these numbers only in immediate safety-critical cases. Unnecessary or prank dial calls distract personnel and are subject to municipal fines.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;
