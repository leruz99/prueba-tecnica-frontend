import { useState, useEffect } from 'react';

export function useProducts(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setData(data))
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));
    }, [url]);

    return { data, loading, error };
}
