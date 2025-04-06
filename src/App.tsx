import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import PersonalDashboard from './components/PersonalDashboard';
import MedicalDashboard from './components/MedicalDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/personal-dashboard" element={<PersonalDashboard />} />
        <Route path="/medical-dashboard" element={<MedicalDashboard />} />
        <Route path="/dashboard" element={<Navigate to="/personal-dashboard" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;