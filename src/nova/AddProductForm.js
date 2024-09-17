import React, { useState } from 'react';
import { useSaveProduct } from '../Hooks/useSaveProduct';
import '../styleSheet/AddProductForm.css'; // Importar el CSS

export function AddProductForm() {
    const [formData, setFormData] = useState({
        codigo: '',
        nombre: '',
        caracteristicas: '',
        precio: '',
        empresaNit: '',
    });

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
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Product'}
                </button>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">Product saved successfully!</p>}
            </form>
        </div>
    );
}
