import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import AdminLogin from './components/AdminLogin';
import JudgeLogin from "./components/JudgeLogin";
import EventAdminLogin from "./components/EventAdminLogin";
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
          <Route path="/event-admin/login" element={<EventAdminLogin />} />
          <Route path="/event-admin/manage-events" element={<EventManagement />} />
          <Route path="/judge/login" element={<JudgeLogin />} />
          <Route path="/judge/score-management" element={<ScoreManagement />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
