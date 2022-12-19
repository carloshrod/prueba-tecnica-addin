import React from 'react'
import { useLocation } from 'react-router-dom';

function Container({ children }) {
    const {pathname} = useLocation();

    return (
        <main className={`container ${pathname !== "/products" && "container--login"}`}>
            {children}
        </main>
    )
}

export default Container;