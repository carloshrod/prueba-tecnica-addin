import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useFormUser } from '../hooks/useFormUser';

const initialFormLogin = {
    username: "",
    password: ""
}

const initialFormSignup = {
    username: "",
    email: "",
    password: ""
}

function UserForm({ formTexts }) {
    const { linkPath, linkLabel, title, paragraph1, paragraph2 } = formTexts;
    const { pathname } = useLocation();
    const isLogin = pathname === "/";
    const initialForm = isLogin ? initialFormLogin : initialFormSignup;
    const { handleChange, handleSubmitLogin, handleSubmitSignup } = useFormUser({ initialForm });
    const { isSending } = useAuthContext();

    return (
        <section className="main">
            <h2 className="main__title">{title}<span>!</span></h2>
            <p className="main__paragraph">{paragraph1}</p>
            <form className="main__signinForm"
                encType="multipart/form-data"
                onSubmit={isLogin ? handleSubmitLogin : handleSubmitSignup}
                noValidate
            >
                <input
                    className="main__input"
                    placeholder="Username"
                    name="username"
                    type="text"
                    onChange={handleChange}
                />
                {!isLogin &&
                    <input
                        className="main__input"
                        placeholder="Email"
                        name="email"
                        type="text"
                        onChange={handleChange}
                    />}
                <input
                    className="main__input"
                    placeholder="Password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                />
                <button className="main__input main__input--send">
                    {isSending
                        ? <i className="fa-solid fa-spinner fa-lg fa-spin" />
                        : "Send"
                    }
                </button>
            </form>
            <p className="main__paragraph">
                {paragraph2} Go to <Link to={linkPath}>{linkLabel}</Link>
            </p>
        </section>
    )
}

export default UserForm;