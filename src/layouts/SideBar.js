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
    <Link to="role" className="sidebar-link"><FaUserShield /> Role</Link>
    <br/><br/>
    <Link to="taskmanager" className="sidebar-link"><FaTasks /> Task Manager</Link>
    <br/><br/>
    <Link to="country" className="sidebar-link"><FaTasks /> Country</Link>
      </li>
)}

    </ul>


  </aside>
  );
};

export default SideBar;
