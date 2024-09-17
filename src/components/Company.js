import {React,useState} from 'react';
import { useFetch } from '../Hooks/useCompany';
import '../styleSheet/Companies.css'; 
import AddCompanyForm from '../components/AddCompanyForm';

export function Companies() {
    const { data, loading, error } = useFetch('http://localhost:8081/empresas');
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="companies">
            <h1>Empresas</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <ul>
                {data && data.map((empresa) => (
                    <li>
                        <h2>{empresa.nombre}</h2>
                        <p>Nit: {empresa.nit}</p>
                        <p>Dirección: {empresa.direccion}</p>
                        <p>Teléfono: {empresa.telefono}</p>
                    </li>
                ))}
            </ul>
            <button className="new-product-button" onClick={() => setIsModalOpen(true)}>
                New Product
            </button>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <AddCompanyForm onClose={() => setIsModalOpen(false)} />
                        <button className="close-modal" onClick={() => setIsModalOpen(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
