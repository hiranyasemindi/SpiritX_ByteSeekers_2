import React from 'react';

const Select = ({ label, options = [], value, onChange, styles, name }) => {
    return (
        <div className={`relative w-full ${styles}`}>
            {label && (
                <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
            )}

            <select
                value={value}
                onChange={onChange}
                name={name}
                className="
                    block w-full px-4 py-3 text-md font-normal text-gray-700 placeholder-gray-400 border-[1px] border-gray-300 rounded-md
                    focus:outline-none focus:ring-2 focus:ring-secondary focus:border-primary transition-all duration-300 ease-in-out
                    bg-white hover:bg-gray-50 focus:bg-white"
            >
                <option value="" disabled>Select an option</option>
                {options.map((option, index) => (
                    <option key={index} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
