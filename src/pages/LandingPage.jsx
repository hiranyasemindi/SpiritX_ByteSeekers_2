// pages/LandingPage.js
import React from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import Carousel from '../components/Carousel';
import Lottie from 'lottie-react'; // Import Lottie for animations
import lottie1 from '../images/lottie1.json'; // Import the Lottie animation file
import ParagraphCard from '../components/ParagraphCard';


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
                    <Button onClick={() => alert('Explore More Clicked!')}>Explore More</Button>
                </div>
            </main>

            {/* University Carousel Section */}
            <Carousel />

            {/* New Section: Combined Lottie and Paragraph Card */}
            <section className="h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
                {/* Wavy Background using SVG */}
                <div className="absolute inset-0">
                    <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full">
                        <path
                            fill="#FFA726"
                            fillOpacity="1"
                            d="M0,192L80,176C160,160,320,128,480,138.7C640,149,800,203,960,213.3C1120,224,1280,192,1360,176L1440,160V320H1360C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320H0Z"
                        ></path>
                    </svg>
                </div>

                {/* Content Inside the Card */}
                <div className="relative w-full max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row items-center justify-center gap-8">
                    {/* Lottie Animation */}
                    <div className="w-full md:w-1/2">
                        <Lottie animationData={lottie1} loop={true} />
                    </div>

                    {/* Text Content */}
                    <ParagraphCard/>
                    
                </div>
            </section>

            

        </div>
    );
};

export default LandingPage;