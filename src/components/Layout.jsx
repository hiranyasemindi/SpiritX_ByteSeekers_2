import React from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = ({ children }) => {

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
       <Footer/>
      </div>
    </div>
  );
};

export default Layout;