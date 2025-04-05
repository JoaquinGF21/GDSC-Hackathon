import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Dashboard from './components/Dashboard';
import MedicalDashboard from './components/MedicalDashboard';
import PatientManager from './components/PatientManager';
import LesionAnalyzer from './components/LesionAnalyzer';
import CalendarManager from './components/CalendarManager';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Role-based protected dashboards */}
        <Route
          path="/med-dashboard"
          element={
            <ProtectedRoute allowedRole="medical-professional">
              <MedicalDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="patient">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Optional direct routes */}
        <Route path="/patients" element={<PatientManager />} />
        <Route path="/lesions" element={<LesionAnalyzer />} />
        <Route path="/calendar" element={<CalendarManager />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
