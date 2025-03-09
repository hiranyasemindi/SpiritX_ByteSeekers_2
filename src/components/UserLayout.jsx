import React from "react";
import UserSidebar from "./UserSidebar";
import Footer from "./Footer";
import FloatingChatButton from "./FloatingChatbot";

const Layout = ({ children }) => {
    return (
        <>
            <div className="flex min-h-screen bg-gray-100">
                <UserSidebar />
                <div className="flex flex-col flex-1 w-full pt-10 px-10">
                    <div className="flex-1">
                        {children}
                    </div>
                    <Footer />
                </div>
            </div>
            <FloatingChatButton />
        </>
    );
};

export default Layout;