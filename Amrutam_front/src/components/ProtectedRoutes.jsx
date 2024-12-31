import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';


const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  const token = localStorage.getItem("userToken");

  if (!token) {
    toast.error("Please login first!");
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
