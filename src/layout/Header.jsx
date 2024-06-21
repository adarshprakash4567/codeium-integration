import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaSignOutAlt, FaUserCircle } from 'react-icons/fa'
import { useAuth } from '../utils/AuthContext'

const Header = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { logout } = useAuth();

  const handleUserIconClick = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <div className="bg-gray-500 bg-opacity-50 w-full h-10 flex items-center justify-between" data-testid="header">
      <div>Header</div>
      <button
        className="relative mr-4"
        onClick={handleUserIconClick}
        data-testid="user-icon"
      >
        <FaUserCircle className="h-5 w-5" />
        {showMenu && (
          <div className="z-10 absolute right-0 mt-2 py-2 bg-white rounded shadow-md">
            <button
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              onClick={handleLogout}
              data-testid="logout-button"
            >
              Logout
            </button>
          </div>
        )}
      </button>
    </div>
  );
};

export default Header

