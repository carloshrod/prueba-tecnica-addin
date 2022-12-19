import React from 'react'
import UserForm from '../components/UserForm';

function Signup() {
    const formTexts = {
        linkPath: "/",
        linkLabel: "Login",
        title: "Welcome",
        paragraph1: "Enter your info to create an account:",
        paragraph2: "Do you have an account?",
    }

    return (
        <div>
            <UserForm formTexts={formTexts} />
        </div>
    )
}

export default Signup;