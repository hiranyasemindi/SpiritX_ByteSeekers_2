import React from 'react';

const CarouselCard = ({ logo, name, description }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 ">
            <img 
                src={logo} 
                alt={`Logo of ${name}`} // More descriptive alt text for accessibility
                className="h-24 mx-auto mb-4 object-contain" // 'object-contain' keeps the logo proportionate
            />
            <h3 className="text-xl font-bold mb-3 text-gray-800">{name}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

export default CarouselCard;
