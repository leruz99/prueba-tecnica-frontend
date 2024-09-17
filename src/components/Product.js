import {React,useState} from 'react';
import {AddProductForm} from './AddProduct'
import { useProducts } from '../Hooks/useProduct';
import { useDeleteProduct } from '../Hooks/useDeleteProduct';
import '../styleSheet/ProductList.css'; 
import { EditProductForm } from './EditProduct';

export function Product() {
    const { deleteProduct, loading: deleting, error: deleteError } = useDeleteProduct();
    const productsUrl = 'http://localhost:8081/productos'; // Cambia esta URL a la de tu API
    const { data: products, loading, error } = useProducts(productsUrl);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editProductId, setEditProductId] = useState(null);

    const handleDelete = (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(productId);
        }
    };
    const handleEdit = (productId) => {
        setEditProductId(productId);
        setIsEditModalOpen(true);
    };

    return (
        <div className="product-list">
            
            <h1>Lista de Productos</h1>
            {loading ? (
                <p>Cargando productos...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : products && products.length > 0 ? (
                <ul>
                    {products.map(product => (
                        <li key={product.id}>
                            <h3>{product.nombre}</h3>
                            <p>Precio: ${product.precio}</p>
                            <p>Descripción: {product.descripcion}</p>
                            <button className="delete-product-button" onClick={() => handleDelete(product.codigo)}>
                                Delete
                            </button>
                            <button className="edit-product-button" onClick={() => handleEdit(product.codigo)}>
                                Edit
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay productos disponibles.</p>
            )}
            <button className="new-product-button" onClick={() => setIsModalOpen(true)}>
                New Product
            </button>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <AddProductForm onClose={() => setIsModalOpen(false)} />
                        <button className="close-modal" onClick={() => setIsModalOpen(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
            {isEditModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <EditProductForm productId={editProductId} onClose={() => setIsEditModalOpen(false)} />
                        <button className="close-modal" onClick={() => setIsEditModalOpen(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}


