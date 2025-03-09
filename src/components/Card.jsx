import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

function Card({ icon, title, value }) {
    const [animationProps, setAnimationProps] = useState({
        scale: 0.8,
        opacity: 0.6,
        delay: 0,
    });
    useEffect(() => {
        const randomScale = Math.random() * 0.4 + 0.8; 
        const randomOpacity = Math.random() * 0.3 + 0.4; 
        const randomDelay = Math.random() * 2;

        setAnimationProps({
            scale: randomScale,
            opacity: randomOpacity,
            delay: randomDelay,
        });
    }, []);

    return (
        <motion.div
            className="bg-white p-6 rounded-md shadow-lg flex flex-col items-center relative overflow-hidden"
            whileHover={{ scale: 1.05 }} 
            transition={{ type: 'spring', stiffness: 300 }}
        >
            <motion.div
                className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-secondary z-0 opacity-60"
                initial={{ scale: 0.8, opacity: 0.6 }}
                animate={{
                    scale: animationProps.scale + 0.4, 
                    opacity: animationProps.opacity - 0.2,
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                    delay: animationProps.delay,
                }}
            ></motion.div>
            <motion.div
                className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full z-0 bg-secondary opacity-60"
                initial={{ scale: 0.8, opacity: 0.6 }}
                animate={{
                    scale: animationProps.scale + 0.2,
                    opacity: animationProps.opacity - 0.1,
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                    delay: animationProps.delay + 1, 
                }}
            ></motion.div>

            {icon && <div className="text-primary text-4xl mb-4 z-10">{icon}</div>}
            <h3 className="text-lg font-semibold text-gray-700 z-10">{title}</h3>
            <p className="text-2xl z-10 font-bold text-center text-primary">{value}</p>
        </motion.div>
    );
}

export default Card;