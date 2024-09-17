import { useState } from 'react';

export function useSaveProduct() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function saveProduct(procudto) {
        const token = localStorage.getItem('token');
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:8081/productos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(procudto),
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
    }

    return { saveProduct, loading, error };
}
