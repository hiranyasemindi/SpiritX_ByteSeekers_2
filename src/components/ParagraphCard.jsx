// components/PlayerInfoCard.js
import React from 'react';
import Button from './Button'; // Import your custom Button component

const ParagraphCard = () => {
    return (
        <div className="w-full md:w-1/2 text-center md:text-left pr-6">
                        <h2 className="text-3xl font-bold mb-8 text-primary text-center">
                            Our Talented Players
                        </h2>
                        <p className="text-lg text-gray-700 mb-6 pt-3 text-justify">
                            At Spirit11, we take pride in nurturing the best cricket talent from universities across the country. Our players come from prestigious institutions like the University of Colombo, University of Moratuwa, and many more. They bring passion, skill, and dedication to the game, making every match a thrilling experience.
                        </p>
                        <p className="text-lg text-gray-700 mb-6 text-justify">
                            Whether it's mastering the perfect cover drive or delivering a match-winning spell, our players are trained to excel in all aspects of the game. Join us to witness the future stars of cricket in action!
                        </p>
                    </div>
    );
};

export default ParagraphCard;