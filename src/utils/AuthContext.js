import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem('role'));

  useEffect(() => {
    if (role) {
      localStorage.setItem('role', role);
    } else {
      localStorage.removeItem('role');
    }
  }, [role]);

  const loginAsAdmin = (navigate) => {
    localStorage.setItem('role', 'Admin');
    setRole('Admin');
    navigate('/admin/dashboard');
  };

  const loginAsUser = (navigate) => {
    localStorage.setItem('role', 'User');

    setRole('User');
    navigate('/user/dashboard');
  };

  const logout = (navigate) => {
    setRole(null);
    navigate('/');
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ role, loginAsAdmin, loginAsUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

export default isAuthenticated;

export const useAuth = () => useContext(AuthContext);
