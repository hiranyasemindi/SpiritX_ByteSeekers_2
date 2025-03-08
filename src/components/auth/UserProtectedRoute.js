// components/UserProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const UserProtectedRoute = ({ children }) => {
    // Check if the user is authenticated
    const token = localStorage.getItem('userToken');
    const tokenExpiration = localStorage.getItem('userTokenExpiration');

    // If there's no token or the token has expired, redirect to the login page
    if (!token || !tokenExpiration || Date.now() > tokenExpiration) {
        return <Navigate to="/login" replace />;
    }

    // If authenticated, render the children (protected pages)
    return children;
};

export default UserProtectedRoute;