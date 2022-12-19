import { toast } from "react-toastify";

let regexNumber = /^[0-9]+$/;

const toastValidate = (msg) => {
    toast.error(msg, { position: "bottom-center", toastId: "validate" });
}

export const validateProduct = (form, productToEdit, file) => {
    if (!form.productName || !form.price || !form.description) {
        toastValidate("All fields required!");
        return;
    }

    if (form.productName.length > 50) {
        toastValidate("Product name should not have more than 50 characters!");
        return;
    }

    if (!productToEdit && !file) {
        toastValidate("Hey, don't forget to upload a product image!");
        return;
    }

    if (!regexNumber.test(form.price)) {
        toastValidate("Price should be a number!");
        return;
    }

    return true;
}
