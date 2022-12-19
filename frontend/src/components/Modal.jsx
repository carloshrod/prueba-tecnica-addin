import React from 'react'
import { useProductsContext } from '../context/ProductsContext';
import ProductForm from './ProductForm';

function Modal() {
    const { show } = useProductsContext();
    
    return (
        <div className={`modal ${show && "modal--show"}`}>
            <div className="modal__container">
                <ProductForm />
            </div>
        </div>
    )
}

export default Modal;