import { FaUsers, FaCreditCard, FaCalendarCheck, FaCog, FaChartBar, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { HiOutlineViewGrid } from "react-icons/hi";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false); 
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile && (
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="fixed top-4 left-4 p-2 z-50 bg-white rounded-lg shadow-lg"
        >
          {mobileSidebarOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
      )}
      <AnimatePresence>
        {(isMobile ? mobileSidebarOpen : true) && (
          <motion.div
            initial={{ x: isMobile ? -300 : 0 }}
            animate={{ x: 0 }} 
            exit={{ x: isMobile ? -300 : 0 }} 
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`h-screen bg-white text-gray-900 p-4 flex flex-col shadow-lg fixed lg:relative z-40 ${
              isMobile ? "w-64" : "w-64"
            }`}
          >
            <div className="flex flex-col items-center justify-center mb-8">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz2agb3HNB6M4jcjneiNkCtWRW7zgLcbF54A&s"
                alt="App Logo"
                className="w-20 h-20 rounded-2xl"
              />
              <h1 className="text-2xl font-bold mt-3 text-[#000000]">Spirit11 Admin</h1>
            </div>
            <nav className="flex-1">
              <ul className="space-y-4">
                <NavItem icon={<HiOutlineViewGrid />} text="Dashboard" link="/dashboard" />
                <NavItem icon={<FaUsers />} text="Players" link="/players" />
                <NavItem icon={<FaCreditCard />} text="Tournement" link="/tournement" />
              </ul>
            </nav>
            <button className="flex items-center justify-center space-x-2 mt-4 py-2 px-4 bg-primary rounded-lg text-white hover:bg-primary">
              <FaSignOutAlt className="text-2xl" />
              <span>Logout</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {isMobile && mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
    </>
  );
}

function NavItem({ icon, text, link }) {
  return (
    <li
      className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
      onClick={() => window.location.href = link}
    >
      <span className="text-2xl text-gray-900">{icon}</span>
      <span>{text}</span>
    </li>
  );
}