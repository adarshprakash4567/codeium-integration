import React from 'react';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};
export default isAuthenticated;
