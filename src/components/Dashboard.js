import React from 'react';
import { useAuth } from '../Hooks/useAuth';
import { Link } from 'react-router-dom';


export function Dashboard() {
  const { logout} = useAuth();
  const { role } = useAuth();

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      {role == 'ROLE_ADMINISTRADOR' && (
        <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/inventario">Inventario</Link></li>
          <li><Link to="/companies">Companies</Link></li>
        </ul>
      </nav>
      )}
      {role == 'ROLE_EXTERNO' && (
        <div>
        <h2>Welcome, External User</h2>
        <p>You can only view the companies.</p>
        <li><Link to="/companies">Companies</Link></li>
      </div>
      )
      }
      
    </div>
  );
}
