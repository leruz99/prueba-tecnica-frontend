import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';

export function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}
