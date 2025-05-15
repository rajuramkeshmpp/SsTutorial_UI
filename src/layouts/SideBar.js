import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { FaUserShield, FaTasks, FaGlobe, FaMapMarkedAlt, FaMap, FaUserTag, FaBook } from 'react-icons/fa';
import '../App.css';
import { useEffect, useState } from "react";
import axios from "axios";

const SideBar = ({ chapters }) => {
    const role = useAuthStore((state) => state.role);
  const [sidebar, setSidebar] = useState([]);
    
  useEffect(() => {
    axios.get(`https://localhost:7160/api/Sidebar/GetAllSidebar?roleId=${role.id}`)
      .then((res) => setSidebar(res.data));
  }, []);



    return (
        <aside className="sidebar">
            <ul>
        <li className="sidebar-item">
            {sidebar.map((s, index) => (
                <Link to={s.path} className="sidebar-link" key={index}>
                <FaUserTag /> {s.name}
                </Link>
            ))}
            </li>
            </ul>
        </aside>
    );
};

export default SideBar;
