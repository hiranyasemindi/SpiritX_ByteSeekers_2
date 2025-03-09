import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../Input';
import Button from '../Button';
import { getDatabase, ref, get } from 'firebase/database';
import CryptoJS from 'crypto-js';
import toast from 'react-hot-toast';

const UserLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const generateToken = () => CryptoJS.lib.WordArray.random(32).toString();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

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
            const database = getDatabase();
            const userRef = ref(database, `users/${username}`);
            const snapshot = await get(userRef);

            if (!snapshot.exists()) {
                setErrors({ loginError: 'User not found' });
                setLoading(false);
                return;
            }

            const userData = snapshot.val();

            const secretKey = "86d29979-dcb3-4580-a049-a0c9e21ce494";
            const hashedPassword = CryptoJS.HmacSHA256(password, secretKey).toString();

            if (hashedPassword !== userData.password) {
                setErrors({ loginError: 'Invalid Credentials' });
                setLoading(false);
                return;
            }

            const token = generateToken();
            const expiry = new Date().getTime() + 60 * 60 * 1000;

            localStorage.setItem('authToken', token);
            localStorage.setItem('username', username);
            localStorage.setItem('authExpiry', expiry.toString());

            toast.success('Login successful!');
            navigate('/user/leaderboard'); 

            setUsername('');
            setPassword('');
            setLoading(false);
        } catch (error) {
            setErrors({ loginError: error.message });
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-70">
            <div className="w-96 bg-white p-8 rounded-lg border border-gray-300 mb-6">
                <img src="/images/logo.png" alt="Spirit11 Logo" className="w-24 mx-auto pb-6" />
                {errors.loginError && <p className="text-red-500 text-sm mt-1 text-center mb-2">{errors.loginError}</p>}

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
                        <Button styles={'w-full'} type="submit" loading={loading}>Login</Button>
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
