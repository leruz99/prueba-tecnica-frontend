import { useState, useEffect } from 'react';

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);  
    const [role, setRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const isTokenExpired = decodedToken.exp * 1000 < Date.now();

                if (isTokenExpired) {
                    localStorage.removeItem('token');
                    setIsAuthenticated(false);
                } else {
                    setRole(decodedToken.auth);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }

        setLoading(false);  
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setIsAuthenticated(true);
        setRole(decodedToken.auth);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setRole(null);
        window.location.href = '/login';
    };

    return { isAuthenticated,role, loading, login, logout };  
}
