import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import ProfilePage from './pages/ProfilePage';
import AddSkillPage from './pages/AddSkillPage';
import DashboardPage from './pages/DashboardPage';
import ContactPage from './pages/ContactPage';
import AuthPage from './pages/AuthPage';
import AboutUsPage from './pages/AboutUsPage';

import MessagesPage from './pages/MessagesPage';

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ message: "Please sign in to access your dashboard and start exchanging skills.", from: location }} replace />;
  }

  return children;
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/landing" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/home" element={<Navigate to="/dashboard" replace />} />
        <Route path="/add-skill" element={<ProtectedRoute><AddSkillPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/my-skills" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
        <Route path="/messages/:id" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}
