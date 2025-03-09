import React from 'react';

const CarouselCard = ({name, description, maxNameLength = 26 }) => {
    const truncatedName = name.length > maxNameLength ? name.substring(0, maxNameLength) + '...' : name;
    const imagePath = `/images/${name.toLowerCase().replace(/\s+/g, '_')}.png`;
    console.log(imagePath);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 ">
            <img 
                src={imagePath} 
                alt={`Logo of ${name}`} 
                className="h-24 mx-auto mb-4 object-contain" 
            />
            <h3 className="text-xl font-bold mb-3 text-gray-800">{truncatedName}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

export default CarouselCard;
