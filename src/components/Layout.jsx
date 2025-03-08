import React from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = ({ children }) => {

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <main className="flex-1 overflow-y-auto p-8 bg-gray-100 mt-16">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
       <Footer/>
      </div>
    </div>
  );
};

export default Layout;