import React, { useEffect, useState } from "react";

const Layout = ({ children }) => {

    const [clickCount, setClickCount] = useState(0);
    const [message, setMessage] = useState(" ");

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
        <div className="min-h-screen bg-gray-100 text-gray-900"
            style={{
                background: "rgb(249,249,255); linear-gradient(90deg, rgba(249,249,255,1) 19%, rgba(240,236,236,1) 50%, rgba(255,248,248,1) 100%)"
            }}>
            <header className="py-4 px-4 bg-black text-white shadow flex justify-between items-center">
                <h1 onClick={handleClick} className="text-2xl font-semibold italic">{message}</h1>
                <div>
                    <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white text-black text-lg font-bold m-1">-</div>
                    <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white text-black text-lg font-bold m-1">+</div>
                    <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white text-black text-lg font-bold m-1">×</div>
                </div>
            </header>
            <main className="p-4">{children}</main>
        </div>
    );
};

export default Layout;
