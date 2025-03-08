import React, { useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import { userValidateSignup } from '../../utils/validations';
import { getDatabase, ref, set } from 'firebase/database';
import CryptoJS from 'crypto-js';

const UserSignup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [firebaseError, setFirebaseError] = useState(null);

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = userValidateSignup(username, password, confirmPassword);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);
            setFirebaseError(null);

            try {
                // Get the secret key from .env file
                const secretKey = process.env.REACT_APP_SECRET_KEY;

                // Hash the password using the secret key
                const hashedPassword = CryptoJS.HmacSHA256(password, secretKey).toString();

                // Save user data in Firebase Realtime Database
                const database = getDatabase();
                const userRef = ref(database, `users/${username}`); // Use username as the key
                await set(userRef, {
                    username,
                    password: hashedPassword, // Save the hashed password
                    createdAt: new Date().toISOString()
                });

                // Reset form fields
                setUsername('');
                setPassword('');
                setConfirmPassword('');
                setLoading(false);

                alert('Signup successful!');

            } catch (error) {
                setFirebaseError(error.message);
                setLoading(false);
            }
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-70">
            <div className="w-96 bg-white p-8 rounded-lg border border-gray-300 mb-6">
                <img src="/images/logo.png" alt="Spirit11 Logo" className="w-24 mx-auto pb-6" />
                {firebaseError && <p className="text-red-500 text-sm mt-1 text-center mb-2">{firebaseError}</p>}

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}

                    <Input
                        label="Password"
                        type="password"
                        styles={'mt-4'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

                    <Input
                        label="Confirm Password"
                        type="password"
                        styles={'mt-4'}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}

                    <div className="mt-6">
                        <Button styles={'w-full'} type="submit" loading={loading} >Signup</Button>
                    </div>
                </form>
            </div>

            <footer className="text-center py-2 text-textColor w-full">
                <p className='text-sm'>© 2025 Byte Seekers. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default UserSignup;