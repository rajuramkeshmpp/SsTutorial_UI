import { FaCog, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import React, { useState, useRef, useEffect } from 'react';


const Header = () => {

    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/');
      };
      const user = useAuthStore((state) => state.user);
      const role = useAuthStore((state) => state.role);
      const [isOpen, setIsOpen] = useState(false);
     
      const dropdownRef = useRef(null);

      useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
            

return (
<header className="dashboard-header">
<div className="logo">Shiwansh Tutorial</div>

<div className="header-right">
  {user && (
<>
<div style={{ position: 'relative', display: 'inline-block' }} ref={dropdownRef}>
      <img
        src={`/${user.firstname}.jpg`}
        alt="User Icon"
        className="user-icon"
        style={{ width: '30px', height: '30px', cursor: 'pointer' }}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
       <div className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
       <Link to="editprofile" >EditProfile</Link>
       <a href="/">Sign Out</a>
     </div>
      )}
    </div>
    
<span className="username">{user.firstname} {user.lastname} ({role})</span>
</>
)}
  <FaSignOutAlt className="icon" onClick={handleLogout} title="Logout" />
</div>

</header>
 );
};

export default Header;