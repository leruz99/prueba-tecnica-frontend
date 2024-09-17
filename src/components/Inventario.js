import React from 'react';
import { useInventario } from '../Hooks/useInventario';
import { useDownloadPdf } from '../Hooks/useDownloadPdf';
import '../styleSheet/Inventario.css';

export function Inventario() {
  const token = localStorage.getItem('token');
  const { data: inventario, loading, error } = useInventario();
  const { pdfLoading, error: pdfError, downloadPdf } = useDownloadPdf(token);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="inventario-page">
      {/* Título */}
      <h1 className="inventario-title">Inventario de Productos</h1>

      {/* Tabla de productos */}
      <div className="inventario-container">
        <table className="inventario-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Características</th>
              <th>Precio</th>
              <th>Empresa</th>
            </tr>
          </thead>
          <tbody>
            {inventario.map((producto) => (
              <tr key={producto.codigo}>
                <td>{producto.codigo}</td>
                <td>{producto.nombre}</td>
                <td>{producto.caracteristicas}</td>
                <td>${producto.precio.toFixed(2)}</td>
                <td>{producto.empresa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      <div className="download-pdf-container">
        <button onClick={downloadPdf} className="download-pdf-button">
          {pdfLoading ? 'Descargando...' : 'Descargar PDF'}
        </button>
       
        {pdfError && <p className="error">{pdfError}</p>}
      </div>
    </div>
  );
}
