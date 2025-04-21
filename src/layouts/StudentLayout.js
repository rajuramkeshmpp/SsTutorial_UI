import React from 'react';
import '../App.css';
import { FaSignOutAlt, FaCog, FaUserCircle } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';

const StudentLayout = () => {
  return (
    <div className="dashboard-container">
      {/* Header */}
      <Header/>

      {/* Sidebar + Main */}
      <div className="dashboard-body">
        <aside className="sidebar">
          <ul>
            <li>Numbers</li>
            <li>Time</li>
            <li>Addition</li>
            <li>Subtraction</li>
            <li>Division</li>
          </ul>
        </aside>

        <main className="main-content">
          <h2>Welcome to your Dashboard!</h2>
          {/* Add more content here */}
        </main>
      </div>

      {/* Footer */}
    <Footer />
    </div>
  );
};

export default StudentLayout;
