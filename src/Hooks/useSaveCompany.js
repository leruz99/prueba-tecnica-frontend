import { useState } from 'react';

export function useSaveCompany() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function saveCompany(empresa) {
        const token = localStorage.getItem('token');
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:8081/empresas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(empresa),
            });

            if (!response.ok) {
                throw new Error('Failed to save company');
            }

            const result = await response.json();
            console.log('Company saved successfully:', result);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { saveCompany, loading, error };
}
