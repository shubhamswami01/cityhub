import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import DashboardLayout from './layout/DashboardLayout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Complaints from './pages/Complaints';
import Services from './pages/Services';
import Announcements from './pages/Announcements';
import EmergencyContacts from './pages/EmergencyContacts';
import Profile from './pages/Profile';
import { ToastContainer } from './components/Toast';

// Component to protect authenticated routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useApp();
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

// Component to prevent visiting login/landing when logged in
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useApp();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

function AppContent() {
  return (
    <>
      <Router>
        <Routes>
          {/* Public Landing & Login */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Landing />
              </PublicRoute>
            }
          />

          {/* Protected Dashboard Routes */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/services" element={<Services />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/emergency" element={<EmergencyContacts />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      
      {/* Global Notifications Container */}
      <ToastContainer />
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
