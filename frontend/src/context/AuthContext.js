import { createContext, useContext, useState } from "react";
import axios from "axios";
import { config } from "../config";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import Swal from 'sweetalert2/dist/sweetalert2.js';

const { API_URL } = config;
const { LOGIN, SIGNUP } = config.AUTH_API;

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isSending, setIsSending] = useState(false);
    const navigate = useNavigate();

    const getAuth = () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                return {
                    payload: jwtDecode(token), auth: true
                }
            }
            return {
                payload: null, auth: false
            }
        } catch (error) {
            console.error(error);
        }
    };
    const { payload, auth } = getAuth();

    const signup = async (form) => {
        try {
            setIsSending(true);
            const res = await axios.post(API_URL + SIGNUP, form);
            if (res) {
                const { token, username } = res.data;
                localStorage.setItem("token", token);
                toast.success(
                    <div>
                        Bienvenid@, <b>{username}</b>
                    </div>,
                    { position: "top-center", autoClose: 3000 }
                );
                navigate("/products");
            }
        } catch (error) {
            toast.error(error.response?.data?.msg || error.message, { position: "bottom-center" });
            console.error(error);
        } finally {
            setIsSending(false);
        }
    }

    const login = async (form) => {
        try {
            setIsSending(true);
            const res = await axios.post(API_URL + LOGIN, form);
            if (res) {
                const { token, username } = res.data;
                localStorage.setItem("token", token);
                toast.success(
                    <div>
                        Bienvenid@, <b>{username}</b>
                    </div>,
                    { position: "top-center", autoClose: 3000 }
                );
                navigate("/products");
            }
        } catch (error) {
            toast.error(error.response?.data?.msg || error.message, { position: "bottom-center" });
            console.error(error);
        } finally {
            setIsSending(false);
        }
    }

    const logout = async () => {
        const resConfirm = await Swal.fire({
            icon: "question",
            text: "Are you sure to sign out?",
            showCancelButton: true,
            confirmButtonColor: '#20cb84',
            cancelButtonColor: '#dc4035',
            confirmButtonText: 'Accept',
            width: "18em"
        });
        if (resConfirm.isConfirmed) {
            localStorage.removeItem("token");
            toast.success("Come back soon!", {position: "top-center"});
            navigate("/");
        }
    }

    const data = { payload, auth, signup, login, logout, isSending };

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext);

export { AuthProvider };
