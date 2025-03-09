import { FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { HiOutlineViewGrid } from "react-icons/hi";
import { MdSportsCricket, MdPeopleAlt, MdGroups, MdChat, MdAttachMoney   } from "react-icons/md"; // Updated icons
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut, auth } from '../services/firebase'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Sidebar() {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userTokenExpiration');
        navigate('/');
    }

    return (
        <>
            {isMobile && (
                <button
                    onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                    className="fixed top-4 left-4 p-2 z-50 bg-white rounded-lg shadow-sm"
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
                        className={`h-screen bg-white text-gray-900 p-4 flex flex-col shadow-lg fixed lg:relative z-40 ${isMobile ? "w-64" : "w-80"
                            }`}
                    >
                        <div className="flex flex-col items-center justify-center mb-8">
                            <img
                                src="/images/logo.png"
                                alt="App Logo"
                                className="h-24 rounded-2xl"
                            />
                            <h1 className="text-2xl font-bold mt-3 text-[#000000]">Spirit11 User</h1>
                        </div>
                        <nav className="flex-1">
                            <ul className="space-y-4">
                                <NavItem icon={<HiOutlineViewGrid />} text="Leaderboard" link="/user/leaderboard" />
                                <NavItem icon={<MdSportsCricket />} text="Players" link="/user/players" />
                                <NavItem icon={<MdGroups />} text="My Team" link="/user/team" />
                                <NavItem icon={<MdAttachMoney  />} text="Budget" link="/user/budget" />
                            </ul>
                        </nav>
                        <button onClick={handleLogout} className="relative inline-flex w-full items-center justify-center px-6 py-3 font-medium bg-o rounded-md bg-secondary
                text-primary focus:outline-none focus:ring-4 focus:ring-secondary transition-all duration-500 ease-in-out">
                            <FaSignOutAlt />
                            <span className="ps-3">Logout</span>
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
    const isActive = window.location.pathname.startsWith(link);

    return (
        <li
            className={`flex items-center space-x-3 px-6 py-3 rounded-md cursor-pointer ${isActive ? "bg-primary text-white" : "hover:bg-gray-100"
                }`}
            onClick={() => (window.location.href = link)}
        >
            <span className={`text-2xl ${isActive ? "text-white" : "text-gray-900"}`}>{icon}</span>
            <span>{text}</span>
        </li>
    );
}
