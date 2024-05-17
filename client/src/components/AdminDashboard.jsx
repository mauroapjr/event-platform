import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminManagement from './AdminManagement';

const AdminDashboard = () => {
  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <p>Welcome to the admin dashboard!</p>      
      <AdminManagement />
    </div>
  );
};

export default AdminDashboard;
