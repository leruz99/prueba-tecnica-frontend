import { useState } from 'react';

export function useUpdateProduct() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const saveProduct = async (product) => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`http://localhost:8081/productos/${product.codigo}`, {
                method: product.codigo ? 'PUT' : 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(product),
            });

            if (!response.ok) {
                throw new Error('Failed to save product');
            }

            const result = await response.json();
            console.log('Product saved successfully:', result);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { saveProduct, loading, error };
}
