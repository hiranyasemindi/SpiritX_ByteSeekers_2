import React, { useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import { validateLogin } from '../../utils/validations';
import { auth, signInWithEmailAndPassword, getIdToken } from '../../services/firebase';

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

            await loginWithFirebase(email, password)
                .then(({ user, error }) => {
                    if (error) {
                        setFirebaseError(error);
                    } else {
                        if (user.email === 'admin-spirit11@virul.me') {
                            console.log('User:', user);
                            localStorage.setItem('authToken', user.idToken);
                            window.location.href = 'admin/dashboard';
                        } else {
                            setFirebaseError('You are not an admin');
                        }
                    }
                })
                .catch((error) => {
                    console.error("Firebase login error:", error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const loginWithFirebase = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const idToken = await getIdToken(user);
    
            const expirationTime = Date.now() + 60 * 60 * 1000; 
    
            localStorage.setItem('authToken', idToken);
            localStorage.setItem('tokenExpiration', expirationTime);
    
            return { user: { ...user, idToken }, error: null };
        } catch (error) {
            console.error("Firebase error:", error);
            const friendlyMessage = firebaseErrorMessages[error.code] || "An unknown error occurred.";
            return { user: null, error: friendlyMessage };
        }
    };
    

    const firebaseErrorMessages = {
        "auth/invalid-email": "The email address is not valid.",
        "auth/user-disabled": "This user account has been disabled.",
        "auth/user-not-found": "No user found with this email.",
        "auth/wrong-password": "Incorrect password. Please try again.",
        "auth/invalid-credential": "Invalid credentials. ",
        "auth/too-many-requests": "Too many login attempts. Please try again later.",
        "auth/network-request-failed": "Network error. Please check your internet connection."
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-70">
            <div className="w-96 bg-white p-8 rounded-lg border border-gray-300 mb-6">
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
                        <Button type="submit" loading={loading} >Login</Button>
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
