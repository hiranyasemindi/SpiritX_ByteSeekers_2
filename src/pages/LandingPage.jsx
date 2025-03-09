import React from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import Carousel from '../components/Carousel';
import Lottie from 'lottie-react';
import lottie1 from '../images/lottie1.json';
import ParagraphCard from '../components/ParagraphCard';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
            {/* Header */}
            <Header />

            {/* Hero Section */}
            <section className="snap-start h-screen flex items-center justify-center relative">
                <div className="absolute inset-0">
                    <img
                        src="./images/img2.png"
                        alt="Cricket Stadium"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                </div>

                <div className="relative z-10 text-center text-white max-w-2xl px-4">
                    <h1 className="text-5xl font-bold mb-6">Welcome to CricketHub</h1>
                    <p className="text-xl mb-8">
                        Your ultimate destination for live scores, player stats, match schedules, and everything cricket!
                    </p>
                </div>
            </section>

            {/* Carousel Section */}
            <section className="snap-start h-screen flex items-center justify-center bg-gray-50">
                <Carousel />
            </section>

            {/* Lottie and Paragraph Section */}
            <section className="snap-start h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
                <div className="absolute inset-0">
                    <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full">
                        <path
                            fill="#FFA726"
                            fillOpacity="1"
                            d="M0,192L80,176C160,160,320,128,480,138.7C640,149,800,203,960,213.3C1120,224,1280,192,1360,176L1440,160V320H1360C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320H0Z"
                        ></path>
                    </svg>
                </div>

                <div className="relative w-full max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row items-center justify-center gap-8">
                    <div className="w-full md:w-1/2">
                        <Lottie animationData={lottie1} loop={true} />
                    </div>
                    <ParagraphCard />
                </div>
            </section>

            {/* Team Section */}
            <section className="snap-start h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
                <div className="relative w-full max-w-6xl mx-auto p-8 flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <h2 className="text-4xl font-bold mb-6 text-primary">
                            Build Your Ultimate Team & Compete!
                        </h2>
                        <p className="text-lg text-gray-700 mb-6 text-justify">
                            We have some of the most talented cricket players from top universities.
                            You can form your own dream team, strategize with them, and compete in exciting tournaments!
                            Showcase your skills and experience the thrill of university-level cricket like never before.
                        </p>
                        <p className="text-lg text-gray-700 mb-6 text-justify">
                            Whether you are an experienced captain or just starting out, our platform gives you the chance to build and
                            manage a competitive cricket team. Are you ready to lead your team to victory?
                        </p>
                        <Button onClick={() => navigate('/user/login')}>
                            Start Compete
                        </Button>
                    </div>

                    <div className="w-full md:w-1/2 flex justify-center">
                        <img
                            src="./images/img1.png"
                            alt="Team Celebration"
                            className="w-82 h-82 object-cover rounded-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default LandingPage;