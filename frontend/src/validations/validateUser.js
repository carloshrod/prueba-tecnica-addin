import { toast } from "react-toastify";

let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
let regexPass = /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])((?=.*\W)|(?=.*_)).*$/;

const toastValidate = (msg) => {
    toast.error(msg, { position: "bottom-center", toastId: "validate" });
}

export const validateUser = (form) => {
    if (!form.username || !form.email || !form.password) {
        toastValidate("All fields required!");
        return;
    }

    if (form.username.length < 5) {
        toastValidate("Username should contain at least 5 characters!");
        return;
    }
    if (!regexEmail.test(form.email)) {
        toastValidate("Invalid email format!");
        return;
    }
    if (!regexPass.test(form.password)) {
        toastValidate("Password should contain at least 8 characters, an uppercase, a lowercase, a number and a special character!");
        return;
    }
    return true;
}

export const validateLogin = (form) => {
    if (!form.username || !form.password) {
        toastValidate("All fields required!");
        return;
    }
    return true;
}