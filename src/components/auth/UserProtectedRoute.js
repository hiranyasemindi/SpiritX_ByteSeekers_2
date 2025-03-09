import React from 'react';
import { Navigate } from 'react-router-dom';

const UserProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('authToken');
    const expiry = localStorage.getItem('authExpiry');

    if (!token || !expiry || new Date().getTime() > parseInt(expiry)) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authExpiry');
        return <Navigate to="/login" />;
    }

    return children;
};

export default UserProtectedRoute;