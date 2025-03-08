import React from 'react';

const Button = ({ children, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="
        relative inline-flex w-full items-center justify-center px-6 py-3 text-lg font-medium text-white rounded-full 
        bg-primary focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-500 ease-in-out"
        >
            <span className="absolute inset-0 w-full h-full bg-white opacity-10 group-hover:opacity-20 transition-all duration-300 ease-in-out rounded-full"></span>
            <span className="relative z-10">{children}</span>
        </button>
    );
};

export default Button;
