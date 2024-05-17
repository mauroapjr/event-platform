import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import EventAdminManagement from './components/EventAdminManagement';
import EventManagement from './components/EventManagement';
import ScoreManagement from './components/ScoreManagement';
import Header from './components/Header'; 

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header /> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/manage-event-admins" element={<EventAdminManagement />} />
          <Route path="/event-admin/manage-events" element={<EventManagement />} />
          <Route path="/judge/manage-scores" element={<ScoreManagement />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
