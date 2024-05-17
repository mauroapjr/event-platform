import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    const response = await axios.get('http://localhost:3000/admin/get-admins');
    setAdmins(response.data);
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/admin/create-admin', { username, password });
      alert('Admin created successfully');
      setUsername('');
      setPassword('');
      fetchAdmins();
    } catch (error) {
      console.error('Error creating admin:', error);
      alert('Error creating admin');
    }
  };

  const handleDeleteAdmin = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/admin/delete-admin/${id}`);
      alert('Admin deleted successfully');
      fetchAdmins();
    } catch (error) {
      console.error('Error deleting admin:', error);
      alert('Error deleting admin');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Manage Admins</h2>
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
        <button type="submit" className="btn btn-primary mt-3">Create Admin</button>
      </form>

      <h3>Existing Admins</h3>
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

export default AdminManagement;
