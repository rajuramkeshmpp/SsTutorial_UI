// src/components/SideBar.jsx
import { Link } from "react-router-dom"; // Import Link
import useAuthStore from "../store/useAuthStore";
import { FaUserShield, FaTasks } from 'react-icons/fa';
import '../App.css';

const SideBar = () => {
  const role = useAuthStore((state) => state.role);
  return (
    <aside className="sidebar">
    <ul>
    {role === "Admin" && (
  <li className="sidebar-item">
    <Link to="assignrole" className="sidebar-link"><FaUserShield /> Assign Role</Link>
    <br/><br/>
    <Link to="taskmanager" className="sidebar-link"><FaTasks /> Task Manager</Link>
  </li>
)}

    </ul>


  </aside>
  );
};

export default SideBar;
