import { useState } from 'react';

export function useDownloadPdf(token) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const downloadPdf = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8081/inventario/downloadPdf', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
          'Authorization': `Bearer ${token}`, 
        },
      });

      if (!response.ok) {
        throw new Error('Failed to download PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank'); 
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, downloadPdf };
}
