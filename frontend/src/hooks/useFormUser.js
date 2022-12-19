import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { validateUser } from "../validations/validateUser";

export const useFormUser = ({ initialForm }) => {
    const [form, setForm] = useState(initialForm);
    const { signup, login } = useAuthContext();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    };

    const handleSubmitSignup = (e) => {
        e.preventDefault();
        if (validateUser(form)) {
            signup(form)
        }
    };

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        login(form);
    };

    return {
        handleChange,
        handleSubmitSignup,
        handleSubmitLogin
    }
}
