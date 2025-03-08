import React, { useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import { validateLogin } from '../../utils/validations';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [firebaseError, setFirebaseError] = useState(null);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateLogin(email, password);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);
            setFirebaseError(null);

            
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-70">
            <div className="w-96 bg-white p-8 rounded-lg border border-gray-300 mb-6">

                <img src="/images/logo.png" alt="Spirit11 Logo" className="w-24 mx-auto" />
                <h2 className="text-2xl font-bold text-center text-dark mb-6">Spirit11 Admin Login</h2>
                {firebaseError && <p className="text-red-500 text-sm mt-1 text-center mb-2">{firebaseError}</p>}

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

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

export default Login;
