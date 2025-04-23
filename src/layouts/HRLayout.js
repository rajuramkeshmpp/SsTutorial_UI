import React from 'react';
import '../App.css';
import { FaSignOutAlt, FaCog, FaUserCircle } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const HRLayout = () => {
  return (
    <div className="dashboard-container">
      {/* Header */}
      <Header/>

      {/* Sidebar + Main */}
      <div className="dashboard-body">
        <aside className="sidebar">
          <ul>
            <li>Teachers</li>
            <li>Students</li>
            
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

export default HRLayout;
