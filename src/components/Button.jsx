import React from 'react';
import { RingLoader } from 'react-spinners';

const Button = ({ children, onClick, loading = false ,styles}) => {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className={`relative inline-flex ${styles} items-center justify-center px-6 py-3 text-lg font-medium text-white rounded-md bg-primary focus:outline-none focus:ring-4 focus:ring-secondary transition-all duration-500 ease-in-out disabled:cursor-not-allowed`}
        >
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <RingLoader
                        color={'#ffff'}
                        loading={loading}
                        size={30}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            )}

            <span className={`relative z-10 ${loading ? 'opacity-0' : 'opacity-100'}`}>
                {children}
            </span>

            <span className="absolute inset-0 w-full h-full bg-white opacity-10 group-hover:opacity-20 transition-all duration-300 ease-in-out rounded-md"></span>
        </button>
    );
};

export default Button;
