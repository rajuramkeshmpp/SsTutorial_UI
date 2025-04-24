// src/components/SideBar.jsx
import { FaUserCircle, FaUsers, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link
import useAuthStore from "../store/useAuthStore";
import { useEffect, useState } from "react";

const SideBar = () => {
  const role = useAuthStore((state) => state.role);
  return (
    <aside className="sidebar">
    <ul>


    {role === "Admin" && (
    <li><Link to="assignrole"  style={{ display: 'block',padding: '12px 20px',backgroundColor: '#34495e',color: '#fff',textDecoration: 'none',fontWeight: '500'
    }}>Assign Role</Link></li>
        )}

    </ul>


  </aside>
  );
};

export default SideBar;
