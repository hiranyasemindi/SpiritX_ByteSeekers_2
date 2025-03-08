import React from "react";
import Login from "../components/auth/Login";

function LoginPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Login />
            <footer className="bg-gray-800 text-white text-center py-4 mt-8">
                <p>© 2025 Your Company. All rights reserved.</p>
            </footer>
        </div>
    );
};
    
export default LoginPage
