import React from "react";
import UserLogin from "../components/auth/UserLogin";

function LoginPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <UserLogin />
        </div>
    );
};

export default LoginPage
