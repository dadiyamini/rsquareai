import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Layout.css';

const Layout = () => {
  const navigate = useNavigate();
  const { logout, username } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="layout-container">
      <header className="header">
        <h2 className="centered-header">RSQUAREAI - AI Models To Elevate Your After Sales Business</h2>
        <div className="user-cabin">
          <span className="user-name">Welcome {username}</span>
          <button onClick={handleLogout} className="logout-btn">Log out</button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
