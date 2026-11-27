import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const close = () => setOpen(false);

  const handleLogout = () => {
    logout();
    close();
    showToast('You have been logged out', 'info');
    navigate('/');
  };

  return (
    <header className="navbar">
      <Link to="/" className="brand" onClick={close}>MatchVerse</Link>
      <button type="button" className="menu-btn" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        Menu
      </button>
      <nav className={open ? 'nav-links nav-open' : 'nav-links'} aria-label="Main">
        <NavLink to="/" end onClick={close}>Home</NavLink>
        <NavLink to="/discover" onClick={close}>Discover</NavLink>
        {isLoggedIn && <NavLink to="/matches" onClick={close}>Matches</NavLink>}
        {isLoggedIn && <NavLink to="/settings" onClick={close}>{user.name.split(' ')[0]}</NavLink>}
        {!isLoggedIn && <NavLink to="/login" onClick={close}>Log in</NavLink>}
        {!isLoggedIn && <NavLink to="/register" className="nav-cta" onClick={close}>Join</NavLink>}
        {isLoggedIn && <button type="button" className="link-btn" onClick={handleLogout}>Log out</button>}
        <button type="button" className="link-btn" onClick={toggleTheme}>
          {theme === 'light' ? 'Dark mode' : 'Light mode'}
        </button>
      </nav>
    </header>
  );
}
