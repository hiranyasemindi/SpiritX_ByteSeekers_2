import React, { useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import { getDatabase, ref, get } from 'firebase/database';
import CryptoJS from 'crypto-js';

const UserLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [firebaseError, setFirebaseError] = useState(null);

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setFirebaseError(null);

        // Basic validation
        if (!username) {
            setErrors({ username: 'Username is required' });
            return;
        }
        if (!password) {
            setErrors({ password: 'Password is required' });
            return;
        }

        setLoading(true);

        try {
            // Fetch user data from Firebase Realtime Database
            const database = getDatabase();
            const userRef = ref(database, `users/${username}`);
            const snapshot = await get(userRef);

            if (!snapshot.exists()) {
                throw new Error('User not found');
            }

            const userData = snapshot.val();

            // Hash the entered password using the secret key from .env
            const secretKey = process.env.REACT_APP_SECRET_KEY;
            const hashedPassword = CryptoJS.HmacSHA256(password, secretKey).toString();

            // Compare the hashed password with the stored hashed password
            if (hashedPassword !== userData.password) {
                throw new Error('Invalid password');
            }

            // Login successful
            alert('Login successful!');
            console.log('User Data:', userData);

            // Reset form fields
            setUsername('');
            setPassword('');
            setLoading(false);

        } catch (error) {
            setFirebaseError(error.message);
            setLoading(false);
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

                    <div className="mt-6">
                        <Button styles={'w-full'} type="submit" loading={loading} >Login</Button>
                    </div>
                </form>
            </div>

            <footer className="text-center py-2 text-textColor w-full">
                <p className='text-sm'>© 2025 Byte Seekers. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default UserLogin;