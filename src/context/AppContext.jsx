import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Initial Seed Data
const initialComplaints = [
  {
    id: 'COMP-101',
    title: 'Water Leakage on 5th Avenue',
    description: 'A main water pipe is damaged and leaking water onto the street, causing minor flooding and water pressure drops in adjacent buildings.',
    category: 'Water Supply',
    location: '5th Ave & 22nd St Intersection',
    severity: 'High',
    status: 'In Progress',
    date: '2026-06-02',
  },
  {
    id: 'COMP-102',
    title: 'Broken Streetlights in Oak Park',
    description: 'Three consecutive streetlights on Elm Street are completely dark, creating safety hazards for pedestrians at night.',
    category: 'Electricity',
    location: 'Elm Street, opposite Oak Park entrance',
    severity: 'Medium',
    status: 'Pending',
    date: '2026-06-03',
  },
  {
    id: 'COMP-103',
    title: 'Pothole near Central Station',
    description: 'A deep pothole has formed in the middle lane, forcing vehicles to swerve suddenly, which could cause an accident.',
    category: 'Roads & Traffic',
    location: 'Central Station Road, west lane',
    severity: 'High',
    status: 'Resolved',
    date: '2026-05-30',
  },
  {
    id: 'COMP-104',
    title: 'Missed Garbage Pickup',
    description: 'The weekly garbage truck skipped building numbers 45-52 on Pine Crescent, and trash bags are piling up on the sidewalk.',
    category: 'Sanitation',
    location: 'Pine Crescent, numbers 45 to 52',
    severity: 'Low',
    status: 'Pending',
    date: '2026-06-04',
  },
];

const initialAnnouncements = [
  {
    id: 'ANN-01',
    title: 'Scheduled Water Maintenance',
    description: 'Emergency repair works are scheduled on the main pipeline. Residents of Sector 4 and 5 may experience temporary water supply disruption or low pressure.',
    category: 'Maintenance',
    date: '2026-06-05',
    time: '09:00 AM - 03:00 PM',
    important: true,
  },
  {
    id: 'ANN-02',
    title: 'Weekly Community Cleanliness Drive',
    description: 'Join hands with fellow citizens to keep our neighborhood green and clean. Bags and gloves will be provided by the municipality. Refreshments will be served.',
    category: 'General',
    date: '2026-06-07',
    time: '07:30 AM - 10:30 AM',
    important: false,
  },
  {
    id: 'ANN-03',
    title: 'High Wind Warning Alert',
    description: 'The Met department has issued a high wind warning for the next 24 hours. Gusts up to 60 km/h are expected. Secure loose outdoor objects and exercise caution while driving.',
    category: 'Safety Alert',
    date: '2026-06-04',
    time: 'Immediate',
    important: true,
  },
  {
    id: 'ANN-04',
    title: 'New Digital Library Services Launch',
    description: 'The City Library now offers free access to over 50,000 e-books and academic journals for all registered CityHub residents. Sign up online with your library card.',
    category: 'General',
    date: '2026-06-01',
    time: 'All Day',
    important: false,
  },
];

const initialServices = [
  {
    id: 'SRV-01',
    name: 'Rapid Repair Electricians',
    category: 'Utilities',
    rating: 4.8,
    reviews: 142,
    phone: '+1 (555) 011-2233',
    availability: '24/7 Available',
    description: 'Emergency electrical repairs, wiring, lighting installation, and fuse replacements.',
  },
  {
    id: 'SRV-02',
    name: 'FlowGuard Plumbing Services',
    category: 'Utilities',
    rating: 4.7,
    reviews: 98,
    phone: '+1 (555) 012-3344',
    availability: '08:00 AM - 08:00 PM',
    description: 'Leak detection, pipe repairs, faucet installation, and drain cleaning.',
  },
  {
    id: 'SRV-03',
    name: 'City Memorial Hospital',
    category: 'Healthcare',
    rating: 4.9,
    reviews: 1205,
    phone: '+1 (555) 019-9111',
    availability: '24/7 Emergency',
    description: 'Multi-specialty public hospital with state-of-the-art trauma center and ICU services.',
  },
  {
    id: 'SRV-04',
    name: 'Apex Pest Control',
    category: 'Sanitation',
    rating: 4.5,
    reviews: 64,
    phone: '+1 (555) 014-5566',
    availability: '09:00 AM - 06:00 PM',
    description: 'Safe and eco-friendly treatment for termites, rodents, insects, and bugs.',
  },
  {
    id: 'SRV-05',
    name: 'Metro Transit Authorities',
    category: 'Transport',
    rating: 4.2,
    reviews: 2310,
    phone: '+1 (555) 015-6677',
    availability: '05:00 AM - 11:30 PM',
    description: 'Official city bus and subway lines routing information and pass purchases.',
  },
  {
    id: 'SRV-06',
    name: 'Sector 3 Public Library',
    category: 'Education',
    rating: 4.6,
    reviews: 180,
    phone: '+1 (555) 016-7788',
    availability: '09:00 AM - 08:00 PM',
    description: 'Free study spaces, book lending, free Wi-Fi, computer labs, and kids reading zones.',
  },
];

const initialEmergencyContacts = [
  { name: 'Police Helpline', number: '911', category: 'Law Enforcement', desc: 'For crimes, accidents, and security threats' },
  { name: 'Ambulance & Medical', number: '912', category: 'Medical Emergency', desc: 'Critical injuries, health issues, and trauma transport' },
  { name: 'Fire Station Control', number: '913', category: 'Fire & Safety', desc: 'Building fires, chemical leaks, and rescue operations' },
  { name: 'Disaster Management', number: '915', category: 'Disaster Response', desc: 'Flooding, earthquakes, high wind damage, and evacuation support' },
  { name: 'Women Helpline', number: '918', category: 'Support Service', desc: 'Safety assistance and counseling services for women' },
  { name: 'Senior Citizens Help', number: '920', category: 'Support Service', desc: 'Medical, logistics, and safety checks for senior residents' },
];

const initialNotifications = [
  { id: 'NTF-01', text: 'Your complaint #COMP-103 "Pothole near Central Station" has been marked as Resolved.', read: false, time: '2 hours ago' },
  { id: 'NTF-02', text: 'Alert: Heavy winds expected tonight. Secure outdoor items.', read: false, time: '4 hours ago' },
  { id: 'NTF-03', text: 'Welcome to CityHub! Explore services, submit complaints, and view updates.', read: true, time: '1 day ago' },
];

const defaultUser = {
  name: 'John Doe',
  email: 'john.doe@smartcity.gov',
  phone: '+1 (555) 019-2834',
  city: 'Metropolis',
  role: 'Resident Citizen',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
};

const defaultOfficial = {
  name: 'Officer Jane Smith',
  email: 'officer.smith@smartcity.gov',
  phone: '+1 (555) 014-9988',
  city: 'Metropolis',
  role: 'Municipal Official',
  department: 'Public Works & Safety',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const cached = localStorage.getItem('cityhub_user');
    return cached ? JSON.parse(cached) : defaultUser;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('cityhub_auth') === 'true';
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('cityhub_theme') || 'light';
  });

  const [complaints, setComplaints] = useState(() => {
    const cached = localStorage.getItem('cityhub_complaints');
    return cached ? JSON.parse(cached) : initialComplaints;
  });

  const [announcements, setAnnouncements] = useState(() => {
    const cached = localStorage.getItem('cityhub_announcements');
    return cached ? JSON.parse(cached) : initialAnnouncements;
  });

  const [notifications, setNotifications] = useState(() => {
    const cached = localStorage.getItem('cityhub_notifications');
    return cached ? JSON.parse(cached) : initialNotifications;
  });

  const [toasts, setToasts] = useState([]);

  // Sync theme to root element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('cityhub_theme', theme);
  }, [theme]);

  // Persist values in localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('cityhub_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('cityhub_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cityhub_auth', isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('cityhub_complaints', JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem('cityhub_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('cityhub_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Toast functions
  const addToast = (message, type = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Auth Operations
  const login = (email, password) => {
    if (email && password) {
      let loggedInUser;
      if (email.toLowerCase() === 'officer.smith@smartcity.gov') {
        loggedInUser = { ...defaultOfficial };
      } else {
        loggedInUser = {
          ...defaultUser,
          email: email,
          name: email.split('@')[0].split('.').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        };
      }
      setUser(loggedInUser);
      setIsAuthenticated(true);
      addToast('Logged in successfully!', 'success');
      addNotification(`Logged in as ${loggedInUser.name}. Welcome back!`);
      return true;
    }
    addToast('Invalid credentials provided.', 'error');
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('cityhub_auth');
    localStorage.removeItem('cityhub_user');
    addToast('Logged out successfully.', 'info');
  };

  // Theme switch
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    addToast(`Switched to ${theme === 'light' ? 'Dark' : 'Light'} Mode`, 'info');
  };

  // Complaint operations
  const raiseComplaint = ({ title, description, category, location, severity }) => {
    const newId = `COMP-${Math.floor(100 + Math.random() * 900)}`;
    const newComplaint = {
      id: newId,
      title,
      description,
      category,
      location,
      severity,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      officialNote: '',
    };

    setComplaints((prev) => [newComplaint, ...prev]);
    addToast('Complaint raised successfully!', 'success');
    addNotification(`Your complaint "${title}" (#${newId}) has been registered.`);
  };

  // Update complaint status (Official only)
  const updateComplaintStatus = (id, newStatus, officialNote = '') => {
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            status: newStatus,
            officialNote: officialNote || c.officialNote,
          };
        }
        return c;
      })
    );
    addToast(`Complaint #${id} updated to "${newStatus}"`, 'success');
    addNotification(`Complaint #${id} status changed to "${newStatus}".`);
  };

  // Post announcement (Official only)
  const postAnnouncement = ({ title, description, category, important }) => {
    const newId = `ANN-${Math.floor(100 + Math.random() * 900)}`;
    const newAnnouncement = {
      id: newId,
      title,
      description,
      category,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      important: !!important,
    };

    setAnnouncements((prev) => [newAnnouncement, ...prev]);
    addToast('Announcement published successfully!', 'success');
    addNotification(`New announcement: "${title}" has been published.`);
  };

  // Profile updates
  const updateProfile = (updatedData) => {
    setUser((prev) => ({
      ...prev,
      ...updatedData,
    }));
    addToast('Profile updated successfully!', 'success');
    addNotification('Your profile information was updated.');
  };

  // Notification operations
  const addNotification = (text) => {
    const newNotification = {
      id: `NTF-${Math.floor(100 + Math.random() * 900)}`,
      text,
      read: false,
      time: 'Just now',
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('All notifications marked as read.', 'success');
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    addToast('Notifications cleared.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated,
        theme,
        complaints,
        announcements,
        services: initialServices,
        emergencyContacts: initialEmergencyContacts,
        notifications,
        toasts,
        login,
        logout,
        toggleTheme,
        addToast,
        removeToast,
        raiseComplaint,
        updateComplaintStatus,
        postAnnouncement,
        updateProfile,
        markNotificationRead,
        markAllNotificationsRead,
        clearAllNotifications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

