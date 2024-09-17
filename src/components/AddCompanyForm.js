import React, { useState } from 'react';
import { useSaveCompany } from '../Hooks/useSaveCompany';
import '../styleSheet/AddCompanyForm.css';

export function AddCompanyForm() {
    const [formData, setFormData] = useState({
        nit: '',
        nombre: '',
        direccion: '',
        telefono: ''
    });

    const { saveCompany, loading, error } = useSaveCompany();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await saveCompany(formData);
        setFormData({
            nit: '',
            nombre: '',
            direccion: '',
            telefono: ''
        });
    };

    return (
        <div className="add-company-form">
            <h2>Agregar Empresa</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nit">NIT</label>
                    <input
                        type="text"
                        id="nit"
                        name="nit"
                        value={formData.nit}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="direccion">Dirección</label>
                    <input
                        type="text"
                        id="direccion"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="telefono">Teléfono</label>
                    <input
                        type="text"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Saving....' : 'Save Company'}
                </button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}

export default AddCompanyForm;
