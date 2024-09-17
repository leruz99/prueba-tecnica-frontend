import React, { useState } from 'react';
import { useSaveProduct } from '../Hooks/useSaveProduct';
import { useFetch } from '../Hooks/useCompany';
import '../styleSheet/Add.css'; 
import '../styleSheet/AddFinal.css'

const companies = [
    { nit: '1234567890', nombre: 'Company A' },
    { nit: '987654321', nombre: 'Company B' },
    { nit: '654321987', nombre: 'Company C' },
];


function CompanyModal({ isOpen, onClose, onSelectCompany }) {
    const { data: companies, loading, error } = useFetch('http://localhost:8081/empresas');
    if (!isOpen) return null; 
    if (loading) return <p>Loading...</p>; 
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Select a Company</h3>
                <ul>
                    {companies.map((company) => (
                        <li key={company.nit} onClick={() => onSelectCompany(company.nit)}>
                            {company.nombre} - {company.nit}
                        </li>
                    ))}
                </ul>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export function AddProductForm() {
    const [formData, setFormData] = useState({
        codigo: '',
        nombre: '',
        caracteristicas: '',
        precio: '',
        empresaNit: '',
    });

    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal

    const { saveProduct, loading, error, success } = useSaveProduct();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const productData = {
            codigo: formData.codigo,
            nombre: formData.nombre,
            caracteristicas: formData.caracteristicas,
            precio: parseFloat(formData.precio),
            empresaNit: formData.empresaNit,
        };
        saveProduct(productData);
    };

    const handleSelectCompany = (nit) => {
        setFormData((prevData) => ({
            ...prevData,
            empresaNit: nit,
        }));
        setIsModalOpen(false); 
    };

    return (
        <div className="add-product-form">
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Code:
                    <input
                        type="text"
                        name="codigo"
                        value={formData.codigo}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Name:
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Features:
                    <textarea
                        name="caracteristicas"
                        value={formData.caracteristicas}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="number"
                        name="precio"
                        value={formData.precio}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Company NIT:
                    <input
                        type="text"
                        name="empresaNit"
                        value={formData.empresaNit}
                        readOnly
                        onClick={() => setIsModalOpen(true)} 
                        required
                    />
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Product'}
                </button>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">Product saved successfully!</p>}
            </form>

            
            <CompanyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelectCompany={handleSelectCompany}
            />
        </div>
    );
}
