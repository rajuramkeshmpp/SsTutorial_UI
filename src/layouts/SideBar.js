// src/components/SideBar.jsx
import { Link } from "react-router-dom"; // Import Link
import useAuthStore from "../store/useAuthStore";
import { FaUserShield, FaTasks, FaGlobe, FaMapMarkedAlt, FaMap } from 'react-icons/fa';
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
<<<<<<< HEAD
    <Link to="country" className="sidebar-link"><FaGlobe /> Country</Link>
    <br /><br />
    <Link to="state" className="sidebar-link"><FaMapMarkedAlt /> State</Link>
    <br /><br />
    <Link to="district" className="sidebar-link"><FaMap /> District</Link>
  </li>
=======
    <Link to="country" className="sidebar-link"><FaTasks /> Country</Link>
      </li>
>>>>>>> d7c871fe46edb7d6e7a3d0a7608f4ad5e2abd456
)}

    </ul>


  </aside>
  );
};

export default SideBar;
