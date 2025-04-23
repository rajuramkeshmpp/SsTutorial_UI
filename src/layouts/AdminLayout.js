import React from 'react';
import '../App.css';
import { FaSignOutAlt, FaCog, FaUserCircle } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';
import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="dashboard-container">
      {/* Header */}
      <Header/>


      {/* Sidebar + Main */}
      <div className="dashboard-body">
        <aside className="sidebar">
          <ul>
          <li><Link to="assignrole"  style={{ display: 'block',padding: '12px 20px',backgroundColor: '#34495e',color: '#fff',textDecoration: 'none',fontWeight: '500'
           }}>Assign Role</Link></li>
          </ul>
        </aside>

        <main className="main-content">
          <h2></h2>
          <Outlet />
        </main>
      </div>

      {/* Footer */}
    <Footer />
    </div>
  );
};

export default AdminLayout;
