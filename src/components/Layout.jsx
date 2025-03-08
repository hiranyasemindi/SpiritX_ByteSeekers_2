import React from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="h-screen w-full bg-red-50">
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
