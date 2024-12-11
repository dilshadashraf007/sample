import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');  // Retrieve token from localStorage

  // If there is no token, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If token exists, render the children (the protected route, e.g., profile page)
  return children;
};

export default ProtectedRoute;
