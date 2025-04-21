import React from 'react';
import '../App.css';
import { FaSignOutAlt, FaCog, FaUserCircle } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="dashboard-container">
      {/* Header */}
      <Header/>

      {/* Sidebar + Main */}
      <div className="dashboard-body">
        <aside className="sidebar">
          <ul>
            <li>Assign Role</li>
            <li>Student</li>
            <li>Teacher</li>
          </ul>
        </aside>

        <main className="main-content">
          <h2>Welcome to your Dashboard!</h2>
          <Outlet />
        </main>
      </div>

      {/* Footer */}
    <Footer />
    </div>
  );
};

export default AdminLayout;
