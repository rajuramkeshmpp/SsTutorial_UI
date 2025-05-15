import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { useState, useEffect } from "react";
import axios from "axios";

const Header = () => {
    const navigate = useNavigate();

    const user = useAuthStore((state) => state.user);
    const role = useAuthStore((state) => state.role);
    const logout = useAuthStore((state) => state.logout);

    const [standards, setStandards] = useState([]);
    const [subjects, setSubjects] = useState([]);

    // Fetch Standards and Subjects for Student
    useEffect(() => {
        if (role === "Student") {
            axios.get("https://localhost:7160/api/Standard/GetAllStandard")
                .then(res => setStandards(res.data))
                .catch(err => console.error("Failed to fetch standards", err));

            axios.get("https://localhost:7160/api/Subject/GetAllSubject")
                .then(res => setSubjects(res.data))
                .catch(err => console.error("Failed to fetch subjects", err));
        }
    }, [role]);

    return (
        <header className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="logo" style={{ marginRight: '20px' }}>Shiwansh Tutorial</div>

                {role === "Student" && (
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <select>
                            <option value="">Select Standard</option>
                            {standards.map(std => (
                                <option key={std.id} value={std.id}>{std.name}</option>
                            ))}
                        </select>

                        <select>
                            <option value="">Select Subject</option>
                            {subjects.map(sub => (
                                <option key={sub.id} value={sub.id}>{sub.name}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {user && role && (
                    <>
                        <img src={`/${user.firstname}.jpg`} alt="User Icon" className="user-icon" style={{ width: '30px', height: '30px' }} />
                        <span className="username">{user.firstname} {user.lastname} ({role.name})</span>
                    </>
                )}
                <FaSignOutAlt className="icon" onClick={() => { logout(); setTimeout(() => navigate('/'), 100);
    }}
    title="Logout"
/>
            </div>
        </header>
    );
};

export default Header;
