import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const EventAdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:3000/website-admin/get-event-admins');
      setAdmins(response.data);
    } catch (error) {
      console.error('Error fetching Event Admins:', error);
      alert('Error fetching Event Admins');
    }
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/admin/create-event-admin', { username, password });
      alert('Event Admin created successfully');
      setUsername('');
      setPassword('');
      fetchAdmins();
    } catch (error) {
      console.error('Error creating Event Admin:', error);
      alert('Error creating Event Admin');
    }
  };

  const handleDeleteAdmin = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/admin/delete-event-admin/${id}`);
      alert('Event Admin deleted successfully');
      fetchAdmins();
    } catch (error) {
      console.error('Error deleting Event Admin:', error);
      alert('Error deleting Event Admin');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Manage Event Admins</h2>
      <form onSubmit={handleCreateAdmin} className="mb-4">
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Create Event Admin</button>
      </form>

      <h3>Existing Event Admins</h3>
      <ul className="list-group">
        {admins.map((admin) => (
          <li key={admin.id} className="list-group-item d-flex justify-content-between align-items-center">
            {admin.username}
            <button className="btn btn-danger" onClick={() => handleDeleteAdmin(admin.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventAdminManagement;
