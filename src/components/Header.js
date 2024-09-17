import React from 'react';
import '../styleSheet/Header.css'
import { useAuth } from '../Hooks/useAuth';

function Header(){
    const { isAuthenticated, logout } = useAuth(); 
    return (
        <header className="header">
            <h1>Mi Aplicación</h1>
            {!isAuthenticated && (
                <nav>
                <ul>
                    <li><a href="/">Inicio</a></li>
                    <li><a href="/about">Acerca de</a></li>
                    <li><a href="/contact">Contacto</a></li>
                </ul>
            </nav>
            )}
            
            {isAuthenticated && (
                <button onClick={logout}>Logout</button> 
            )}
        </header>
    );
};

export default Header;

