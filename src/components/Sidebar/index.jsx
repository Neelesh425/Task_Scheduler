import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './index.scss';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    // Add your logout logic here
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      <button 
        className="sidebar__toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
      >
        ☰
      </button>
      
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar__header">
          <h2>Task Scheduler</h2>
        </div>

        <nav className="sidebar__nav">
          <NavLink 
            to="/todo" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            <span className="icon">📋</span>
            <span className="text">My Tasks</span>
          </NavLink>
          
          <NavLink 
            to="/profile" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            <span className="icon">👤</span>
            <span className="text">Profile</span>
          </NavLink>
        </nav>

        <div className="sidebar__footer">
          <button onClick={handleLogout} className="logout-btn">
            <span className="icon">🚪</span>
            <span className="text">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;