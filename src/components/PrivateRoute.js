import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';

export function PrivateRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();  // Ahora también obtenemos el estado de carga

    if (loading) {
        // Muestra un mensaje de carga o spinner mientras se verifica la autenticación
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
}
