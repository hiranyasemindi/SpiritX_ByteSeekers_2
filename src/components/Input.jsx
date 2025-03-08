import React from 'react';

const Input = ({ label, type = "text", placeholder, value, onChange }) => {
    return (
        <div className="relative w-full">
            {label && (
                <label className="block text-lg font-medium text-textColor mb-2">{label}</label>
            )}

            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="
          block w-full px-4 py-3 text-lg font-medium text-gray-700 placeholder-gray-400 border-[1.5px] border-gray-300 rounded-md
          focus:outline-none focus:ring-2 focus:ring-secondary focus:border-primary transition-all duration-300 ease-in-out
          bg-white hover:bg-gray-50 focus:bg-white"
            />
        </div>
    );
};

export default Input;
