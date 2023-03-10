import axios from "axios";
import { toast } from "react-toastify";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { config } from "../config";
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
            if (products.length > 0) {
                setProducts([...products, savedProduct]);
            } else {
                setProducts([savedProduct])
            }
            toast.success(msg);
        } catch (error) {
            toast.error(error.response?.data?.msg || error.message);
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
            toast.error(error.response?.data?.msg || error.message);
            console.log(error);
        } finally {
            setIsSending(false);
            setShow(false);
        }
    }

    const deleteProduct = async (productId) => {
        try {
            const resConfirm = await Swal.fire({
                icon: "warning",
                html: `Are you sure to delete this product? <br> You won't be able to revert this!`,
                showCancelButton: true,
                confirmButtonColor: '#20cb84',
                cancelButtonColor: '#dc4035',
                confirmButtonText: 'Accept',
                width: "24em",
            });
            if (resConfirm.isConfirmed) {
                const res = await axios.delete((baseURL + productId), options);
                const newData = products.filter((product) => product._id !== productId);
                setProducts(newData);
                toast.success(res.data.msg);
            }
        } catch (error) {
            toast.error(error.response?.data?.msg || error.message);
            console.log(error);
        }
    }

    return {
        createProduct,
        editProduct,
        deleteProduct
    }
}