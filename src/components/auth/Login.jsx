import React, { useState } from 'react';
import Input from '../Input';
import Button from '../Button';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-96 bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-center text-primary mb-6">Login</h2>

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={handleUsernameChange}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={handlePasswordChange}
                    />

                    <div className="mt-6">
                        <Button type="submit">Login</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
