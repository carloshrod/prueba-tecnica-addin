import { useEffect, useState } from "react";
import { config } from "../config";
import { useProductsContext } from "../context/ProductsContext";
import { ProductServices } from "../services/ProductServices";
import { validateProduct } from "../validations/validateProduct";

const { DEFAULT_IMAGE } = config;

export const useFormProduct = ({ initialForm }) => {
    const [form, setForm] = useState(initialForm);
    const [file, setFile] = useState("");
    const [pathImage, setPathImage] = useState("");
    const { createProduct, editProduct } = ProductServices();
    const { productToEdit, setProductToEdit } = useProductsContext();

    useEffect(() => {
        if (productToEdit?._id) {
            setPathImage(productToEdit?.productImage.secure_url || DEFAULT_IMAGE);
            setForm(productToEdit)
        } else {
            setPathImage(DEFAULT_IMAGE)
            setForm(initialForm);
        }
    }, [productToEdit, initialForm]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    };

    const handleChangeFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const image = e.target.files[0];
            if (image.type.includes("image")) {
                const reader = new FileReader()
                reader.readAsDataURL(image)
                reader.onload = function load() {
                    setPathImage(reader.result)
                }
                setFile(image);
            }
        }
    }

    const handleReset = () => {
        setTimeout(() => {
            if (!productToEdit) {
                setForm(initialForm);
                setPathImage(DEFAULT_IMAGE);
            }
            setProductToEdit(null);
        }, 1000);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateProduct(form, productToEdit, file)) {
            const formData = new FormData();
            formData.append("productName", form.productName);
            formData.append("price", form.price);
            formData.append("description", form.description);
            formData.append("file", file);
            
            if (!productToEdit) {
                await createProduct(formData);
                handleReset();
            } else {
                const productId = productToEdit._id;
                await editProduct(formData, productId);
                handleReset();
            }
        }
    };

    return {
        form,
        setForm,
        handleChange,
        handleChangeFile,
        pathImage,
        handleReset,
        handleSubmit
    }
}