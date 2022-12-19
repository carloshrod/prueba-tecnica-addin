import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { config } from "../config";
import { useAuthContext } from "./AuthContext";

const { API_URL } = config;

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [productToEdit, setProductToEdit] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [show, setShow] = useState(false);
    const { auth } = useAuthContext();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                if (auth) {
                    const res = await axios.get(API_URL + "products");
                    setProducts(res.data);
                    if (res.data.msg) toast.error(res.data.msg, { theme: "colored", autoClose: false });
                }
            } catch (error) {
                toast.error(error.message, { theme: "colored", autoClose: false })
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchProducts();
    }, [auth])

    const data = { products, setProducts, productToEdit, setProductToEdit, isLoading, isSending, setIsSending, show, setShow };

    return <ProductsContext.Provider value={data}>{children}</ProductsContext.Provider>
}

export const useProductsContext = () => useContext(ProductsContext);

export { ProductsProvider };