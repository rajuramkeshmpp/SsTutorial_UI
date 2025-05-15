import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { FaUserShield, FaTasks, FaGlobe, FaMapMarkedAlt, FaMap, FaUserTag, FaBook } from 'react-icons/fa';
import '../App.css';
import { useEffect, useState } from "react";
import axios from "axios";

const SideBar = () => {
const role = useAuthStore((state) => state.role);
const chapter = useAuthStore((state) => state.chapter);
const [sidebar, setSidebar] = useState([]);

    
  useEffect(() => {
    axios.get(`https://localhost:7160/api/Sidebar/GetAllSidebar?roleId=${role.id}`)
      .then((res) => setSidebar(res.data));
  }, []);

    return (
<aside className="sidebar">
  <ul>
    {role.name === "Student" ? (
      <li className="sidebar-item">
        {chapter.map((s, index) => (
          <Link to={s.path} className="sidebar-link" key={index}>
            <FaUserTag /> {s.name}
          </Link>
        ))}
      </li>
    ) : (
      sidebar.map((s, index) => (
        <li className="sidebar-item" key={index}>
          <Link to={s.path} className="sidebar-link">
            <FaUserTag /> {s.name}
          </Link>
        </li>
      ))
    )}
  </ul>
</aside>

    );
};

export default SideBar;
