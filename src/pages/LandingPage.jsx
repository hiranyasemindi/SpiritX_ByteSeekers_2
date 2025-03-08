import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

// import Logo from '../assets/logo.png'; // Import the logo image

const LandingPage = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header with Glassmorphism Effect */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-20 backdrop-blur-md shadow-sm">
                <div className="mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Logo - Aligned to the Left */}
                    <div className="flex items-center">
                        <img src="/images/logo.png" alt="CricketHub Logo" className="h-16" />
                    </div>

                    {/* Get Started Button - Aligned to the Right */}
                    <div className="flex items-center py-2">
                        <button className="relative inline-flex w-full items-center justify-center px-6 py-3 font-medium rounded-md bg-primary
                                       text-secondary focus:outline-none focus:ring-4 focus:ring-secondary transition-all duration-500 ease-in-out">
                            <span className="pe-3">Get Started</span>
                            <FaArrowRight />
                        </button>
                    </div>
                </div>
            </header>

            {/* Body Section */}
            <main className="relative h-screen flex items-center justify-center">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    <img
                        src="https://img.freepik.com/free-photo/cricket-match-with-player_23-2151702205.jpg?t=st=1741438164~exp=1741441764~hmac=5a50d5326ce1361007787013efbd9752947ba815fb0d134bc9ba792b9f447005&w=1380"
                        alt="Cricket Stadium"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                </div>

                {/* Text Overlay */}
                <div className="relative z-10 text-center text-white max-w-2xl px-4">
                    <h1 className="text-5xl font-bold mb-6">Welcome to CricketHub</h1>
                    <p className="text-xl mb-8">
                        Your ultimate destination for live scores, player stats, match schedules, and everything cricket!
                    </p>
                </div>

                {/* Footer Section - Placed Above the Image */}
                
            </main>
        </div>
    );
};

export default LandingPage;
