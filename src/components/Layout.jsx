import React from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full p-10">
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;