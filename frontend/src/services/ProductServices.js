import axios from "axios";
import { toast } from "react-toastify";
import Swal from 'sweetalert2/dist/sweetalert2.js';import { config } from "../config";
import { useProductsContext } from "../context/ProductsContext";

const { API_URL, PRODUCTS_API } = config;
const baseURL = API_URL + PRODUCTS_API;
const options = {
    headers: { 'Content-Type': 'multipart/form-data' }
}

export const ProductServices = () => {
    const { products, setProducts, setShow, setIsSending } = useProductsContext();

    const createProduct = async (data) => {
        try {
            setIsSending(true);
            const res = await axios.post(baseURL, data, options);
            const { savedProduct, msg } = res.data;
            setProducts([...products, savedProduct]);
            toast.success(msg);
        } catch (error) {
            console.log(error);
        } finally {
            setIsSending(false);
            setShow(false);
        }
    }

    const editProduct = async (data, productId) => {
        try {
            setIsSending(true);
            const res = await axios.put((baseURL + productId), data, options);
            const { updatedProducts, msg } = res.data;
            setProducts(updatedProducts);
            toast.success(msg);
        } catch (error) {
            console.log(error);
        } finally {
            setIsSending(false);
            setShow(false);
        }
    }

    const deleteProduct = async (productId) => {
        try {
            const resConfirm = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                showCancelButton: true,
                confirmButtonColor: '#20cb84',
                cancelButtonColor: '#dc4035',
                confirmButtonText: 'Accept'
            });
            if (resConfirm.isConfirmed) {
                const res = await axios.delete((baseURL + productId), options);
                const newData = products.filter((product) => product._id !== productId);
                setProducts(newData);
                toast.success(res.data.msg);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return {
        createProduct,
        editProduct,
        deleteProduct
    }
}