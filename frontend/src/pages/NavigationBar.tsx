// frontend/src/components/NavigationBar.tsx
import React from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";

interface NavigationBarProps {
  isAuthenticated: boolean;
  username?: string;
  onLogout: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ isAuthenticated, username, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">DIY Home Toolkits</Link>
      </div>
      <div className="nav-center">
        <Link to="/">Home</Link>
        <Link to="/estimate">Cost Estimation</Link>
        <Link to="/projects">History</Link>
      </div>
      <div className="nav-right">
        {isAuthenticated ? (
          <>
            <span className="username">Hi, {username}</span>
            <button className="logout-button" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
