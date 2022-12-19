import React from 'react'
import { useProductsContext } from '../context/ProductsContext';
import { ProductServices } from '../services/ProductServices';

function ProductCard({ product }) {
    const { productName, price, productImage } = product;
    const { setProductToEdit, setShow } = useProductsContext();
    const { deleteProduct } = ProductServices();

    const handleEdit = () => {
        setProductToEdit(product)
        setShow(true);
    };

    const handleDelete = () => deleteProduct(product._id);

    return (
        <li className="productCard">
            <div className="productCard__options">
                <img
                    className="productCard__image"
                    src={productImage?.secure_url}
                    alt={productName}
                />
                <div className="productCard__btnContainer">
                    <button
                        data-tip data-for="toolTipEdit"
                        className="productCard__btn productCard__btn--edit"
                        onClick={handleEdit}
                    >
                        <i className="fa-solid fa-pen" />
                    </button>
                    <button
                        data-tip data-for="toolTipDelete"
                        className="productCard__btn productCard__btn--delete"
                        onClick={handleDelete}
                    >
                        <i className="fa-solid fa-trash-can" />
                    </button>
                </div>
            </div>
            <div className="productCard__name">{productName}</div>
            <div className="productCard__info">
                <span>${price}</span>
            </div>
        </li>
    )
}

export default ProductCard;