import { useState } from 'react';

export function useDeleteProduct() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteProduct = async (productId) => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`http://localhost:8081/productos/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, 
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete product');
            }

            console.log('Product deleted successfully');
            

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { deleteProduct, loading, error };
}
