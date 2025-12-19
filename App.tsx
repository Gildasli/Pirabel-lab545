
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Audit from './pages/Audit';
import Keywords from './pages/Keywords';
import Writer from './pages/Writer';
import RankTracker from './pages/RankTracker';
import Auth from './pages/Auth';
import Billing from './pages/Billing';
import AdminDashboard from './pages/AdminDashboard';
import TechnicalAuditGuide from './pages/TechnicalAuditGuide';
import Layout from './components/Layout';
import { UserProfile, UserPlan } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  const handleLogin = (email: string) => {
    // Check if user is admin based on email for the demo
    const isAdmin = email.includes('admin');
    setUser({
      id: '123',
      email,
      plan: isAdmin ? UserPlan.AGENCY : UserPlan.PRO,
      creditsRemaining: {
        audits: 50,
        keywords: 200,
        aiWords: 50000
      },
      role: isAdmin ? 'ADMIN' : 'USER',
      joinedAt: new Date().toISOString()
    });
  };

  const handleLogout = () => setUser(null);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
        <Route path="/technical-audit-guide" element={<TechnicalAuditGuide />} />
        
        <Route element={<Layout user={user} onLogout={handleLogout} />}>
          <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/auth" />} />
          <Route path="/audit" element={user ? <Audit user={user} /> : <Navigate to="/auth" />} />
          <Route path="/keywords" element={user ? <Keywords user={user} /> : <Navigate to="/auth" />} />
          <Route path="/writer" element={user ? <Writer user={user} /> : <Navigate to="/auth" />} />
          <Route path="/tracker" element={user ? <RankTracker user={user} /> : <Navigate to="/auth" />} />
          <Route path="/billing" element={user ? <Billing user={user} /> : <Navigate to="/auth" />} />
          <Route path="/admin" element={user?.role === 'ADMIN' ? <AdminDashboard user={user} /> : <Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
