import React, { useState, useEffect } from 'react';
import { useProducts } from '../Hooks/useProduct'; 
import { useUpdateProduct } from '../Hooks/useUpdateProduct';
import { useFetch } from '../Hooks/useCompany';

export function EditProductForm({ productId, onClose }) {
    const { data: product, loading: fetching, error: fetchError } = useProducts(`http://localhost:8081/productos/${productId}`);
    const { saveProduct, loading: saving, error: saveError } = useUpdateProduct();
    const [formData, setFormData] = useState({
        codigo: '',
        nombre: '',
        caracteristicas: '',
        precio: '',
        empresaNit: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (product) {
            setFormData({
                codigo: product.codigo,
                nombre: product.nombre,
                caracteristicas: product.caracteristicas,
                precio: product.precio,
                empresaNit: product.empresaNit,
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await saveProduct(formData);
            onClose(); 
        } catch (error) {
            console.error('Failed to save product:', error);
        }
    };
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

    const handleSelectCompany = (nit) => {
        setFormData((prevData) => ({
            ...prevData,
            empresaNit: nit,
        }));
        setIsModalOpen(false);
    };

    if (fetching) return <p>Loading...</p>;
    if (fetchError) return <p>Error: {fetchError}</p>;

    return (
        <div className="add-product-form">
            <h2>Edit Product</h2>
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
                <button type="submit" disabled={saving}>
                    {saving ? 'Saving...' : 'Save Product'}
                </button>
                {saveError && <p className="error">{saveError}</p>}
            </form>

            <CompanyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelectCompany={handleSelectCompany}
            />
        </div>
    );
}
