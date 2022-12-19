import React from 'react'
import { useProductsContext } from '../context/ProductsContext';
import { useFormProduct } from '../hooks/useFormProduct';

const initialForm = {
    productName: "",
    price: "",
    description: ""
}

function ProductForm() {
    const { form, handleChange, handleChangeFile,
        pathImage, handleReset, handleSubmit } = useFormProduct({ initialForm });
    const { productToEdit, setShow, isSending } = useProductsContext();

    const closeModal = () => {
        setShow(false);
        handleReset();
    };

    const title = !productToEdit ? "Create Product" : "Edit Product"; 

    return (
        <section className="main">
            <h3 className='main__title main__title--productForm'>{title}</h3>
            <form className="main__productForm"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
                noValidate
            >
                <div className="main__productForm__topContainer">
                    <div className="main__productForm__leftContainer">
                        <img src={pathImage} alt="poster" className="main__image" />
                        <label className="main__upload">
                            <input
                                className="main__input main__input--file"
                                name="file"
                                type="file"
                                onChange={handleChangeFile}
                            />
                            <i className="fa-solid fa-upload main__icon" />
                        </label>
                    </div>
                    <div className="main__productForm__rightContainer">
                        <input
                            className="main__input"
                            placeholder="Product name"
                            name="productName"
                            value={form.productName}
                            type="text"
                            onChange={handleChange}
                        />
                        <input
                            className="main__input"
                            placeholder="Price"
                            name="price"
                            value={form.price}
                            type="number"
                            onChange={handleChange}
                        />
                        <textarea
                            className="main__input"
                            placeholder="Description"
                            name="description"
                            value={form.description}
                            type="text"
                            rows="5"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="main__productForm__bottomContainer">
                    <button className="main__input main__input--cancel" type="button" onClick={closeModal}>
                        Cancel
                    </button>
                    <button className="main__input main__input--send">
                    {isSending
                        ? <i className="fa-solid fa-spinner fa-lg fa-spin" />
                        : "Send"
                    }
                    </button>
                </div>
            </form>
        </section>
    )
}

export default ProductForm;