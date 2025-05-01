import { FaCog, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const Header = () => {
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/');
      };
      const user = useAuthStore((state) => state.user);
      const role = useAuthStore((state) => state.role);

return (
<header className="dashboard-header">
<div className="logo">Shiwansh Tutorial</div>

<div className="header-right">
  {user && (
<>
<img src={`/${user.firstname}.jpg`} alt="User Icon" className="user-icon" style={{ width: '30px', height: '30px', cursor: 'pointer' }} />
<span className="username">{user.firstname} {user.lastname} ({role})</span>
</>
)}

  <FaSignOutAlt className="icon" onClick={handleLogout} title="Logout" />
</div>
</header>
 );
};

export default Header;