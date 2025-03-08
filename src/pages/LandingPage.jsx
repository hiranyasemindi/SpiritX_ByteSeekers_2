// pages/LandingPage.js
import React from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import Carousel from '../components/Carousel';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <Header />

            {/* Landing Page */}
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
            </main>

            {/* University Carousel Section */}
            <Carousel />
        </div>
    );
};

export default LandingPage;