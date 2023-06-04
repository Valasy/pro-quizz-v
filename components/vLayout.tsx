import React, { useEffect, useState } from "react";

const Layout = ({ children }) => {

    const [clickCount, setClickCount] = useState(0);
    const [message, setMessage] = useState(".");

    useEffect(() => {
        if (clickCount === 1) {
            setMessage(":O ¿Qué fue eso?");
        } else if (clickCount === 2) {
            setMessage("D:< No lo hagas!");
        } else if (clickCount >= 10) {
            setMessage("DX ...");
        }
    }, [clickCount]);

    const handleClick = () => {
        setClickCount((prevCount) => prevCount + 1);
    };


    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            <header className="py-6 px-4 bg-black text-white shadow">
                <h1 onClick={handleClick} className="text-2xl font-semibold italic">{message}</h1>
            </header>
            <main className="p-4" >{children}</main>
        </div>
    );
};

export default Layout;
