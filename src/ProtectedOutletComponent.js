import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Header from './layout/Header';

const ProtectedOutletComponent = () => {
  const location = useLocation();

  // Check if the user is authenticated
//   const a = localStorage.getItem('token');
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <>
      {isAuthenticated && <Header />}
      {isAuthenticated ? <Outlet /> : <Navigate to="/" replace />}
    </>
  );
};

export default ProtectedOutletComponent;