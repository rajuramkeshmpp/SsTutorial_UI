import { Outlet, Link } from 'react-router-dom';
import '../App.css';

const MainLayout = () => (
  <div>
    <header className="navbar">
      <h4>Shiwansh Tutorial</h4>
      <nav className="nav-container">
        <ul className="nav-left">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        <ul className="nav-right">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>
    </header>
    <main>
      <Outlet />
    </main>
    <footer>© 2025 Main App</footer>
  </div>
);

export default MainLayout;
