import React from 'react';

const CarouselCard = ({ logo, name, description, maxNameLength = 26 }) => {
    const truncatedName = name.length > maxNameLength ? name.substring(0, maxNameLength) + '...' : name;

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 ">
            <img 
                src={logo} 
                alt={`Logo of ${name}`} 
                className="h-24 mx-auto mb-4 object-contain" 
            />
            <h3 className="text-xl font-bold mb-3 text-gray-800">{truncatedName}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

export default CarouselCard;
