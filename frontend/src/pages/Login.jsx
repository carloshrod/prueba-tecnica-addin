import React from 'react'
import UserForm from '../components/UserForm';

function Login() {
    const formTexts = {
        linkPath: "/signup",
        linkLabel: "Signup",
        title: "Welcome back",
        paragraph1: "Enter your credentials to sign in:",
        paragraph2: "Don't you have an account?",
    }

    return (
        <UserForm formTexts={formTexts} />
    )
}

export default Login;