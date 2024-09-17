import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Header from './components/Header';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Dashboard } from './components/Dashboard';
import { Product } from './components/Product';
import { Companies } from './components/Company';
import { PrivateRoute } from './components/PrivateRoute';
import {PublicRoute} from './components/PublicRoute'
import { Inventario } from './components/Inventario';
import {RoleBasedRoute} from './components/RoleBasedRoute'


function App() {
  
    return (
        <Router>
          <div className="app">
            <Header />
            <Routes>
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={<PrivateRoute><Dashboard/></PrivateRoute>
                }
              />
            
              <Route 
              path="/companies" 
              element={
                <PrivateRoute>
                  <Companies />  
                </PrivateRoute>
              } 
            />
            <Route 
              path="/products" 
              element={
                <PrivateRoute>
                  <Product />  
                </PrivateRoute>
              } 
            />
            <Route 
              path="/inventario" 
              element={
                <PrivateRoute>
                  <Inventario /> 
                </PrivateRoute>
              } 
            />
            <Route
          path="/dashboard"
          element={
            <RoleBasedRoute requiredRole="ROLE_ADMINISTRADOR">
              <Dashboard />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/companies"
          element={
            <RoleBasedRoute requiredRole="ROLE_ADMINISTRADOR">
              <Companies />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <RoleBasedRoute requiredRole="ROLE_ADMINISTRADOR">
              <Product />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/companies"
          element={
            <RoleBasedRoute requiredRole="ROLE_EXTERNO">
              <Companies />
            </RoleBasedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
         
          </div>
        </Router>
      );
}

export default App;
