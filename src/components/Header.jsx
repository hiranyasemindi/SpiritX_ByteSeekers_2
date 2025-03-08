import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/user-login');
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-20 backdrop-blur-md shadow-sm">
            <div className="mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo - Aligned to the Left */}
                <div className="flex items-center">
                    <img src="/images/logo.png" alt="CricketHub Logo" className="h-16" />
                </div>

                {/* Get Started Button - Aligned to the Right */}
                <div className="flex items-center py-2">
                    <button 
                        onClick={handleGetStarted} 
                        className="relative inline-flex w-full items-center justify-center px-6 py-3 font-medium rounded-md bg-primary
                                   text-secondary focus:outline-none focus:ring-4 focus:ring-secondary transition-all duration-500 ease-in-out">
                        <span className="pe-3">Get Started</span>
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
