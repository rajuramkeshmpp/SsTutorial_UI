import React from 'react';
import '../../App.css';
import { FaSignOutAlt, FaCog, FaUserCircle } from 'react-icons/fa';
import Header from '../Header';
import Footer from '../Footer';
import SideBar from "../SideBar";
import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="dashboard-container">
      <Header/>
      <div className="dashboard-body">
       <SideBar />
        <main className="main-content">
          <h2></h2>
          <Outlet />
        </main>
      </div>
    <Footer />
    </div>
  );
};

export default AdminLayout;
