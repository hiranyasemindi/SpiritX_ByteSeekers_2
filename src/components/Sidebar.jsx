import { FaUsers, FaCreditCard, FaCalendarCheck, FaCog, FaChartBar, FaSignOutAlt, FaBars } from "react-icons/fa";
import { HiOutlineViewGrid } from "react-icons/hi";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);

  return (
    <motion.div 
      animate={{ width: expanded ? 256 : 80 }} 
      className="h-screen bg-gray-900 text-white p-4 flex flex-col transition-all duration-300"
    >
      {/* Toggle Button */}
      <button onClick={() => setExpanded(!expanded)} className="p-2 bg-gray-800 rounded-md mb-4 flex justify-center">
        <FaBars className="text-2xl" />
      </button>
      
      {/* Logo */}
      <div className="flex items-center space-x-3 pb-6">
        <div className="bg-purple-500 h-8 w-8 rounded-full"></div>
        {expanded && <motion.h1 animate={{ opacity: expanded ? 1 : 0 }} className="text-lg font-bold">Teams.co</motion.h1>}
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-4">
          <NavItem icon={<HiOutlineViewGrid />} text="Dashboard" expanded={expanded} />
          <NavItem icon={<FaUsers />} text="Teams" expanded={expanded} />
          <NavItem icon={<FaCreditCard />} text="Payments" expanded={expanded} />
          <NavItem icon={<FaCalendarCheck />} text="Attendance" expanded={expanded} />
          <NavItem icon={<FaCog />} text="Settings" expanded={expanded} />
        </ul>
      </nav>

      {/* Create Teams Button */}
      {expanded && (
        <motion.div animate={{ opacity: expanded ? 1 : 0 }} className="bg-gray-800 p-4 rounded-lg flex flex-col items-center mt-4">
          <FaChartBar className="text-purple-400 text-2xl" />
          <p className="text-xs mt-2 text-center">Create Teams<br />Increase your speed</p>
        </motion.div>
      )}

      {/* Logout Button */}
      <button className="flex items-center justify-center space-x-2 mt-4 py-2 px-4 bg-purple-600 rounded-lg text-white hover:bg-purple-500">
        <FaSignOutAlt className="text-2xl" />
        {expanded && <motion.span animate={{ opacity: expanded ? 1 : 0 }}>Logout</motion.span>}
      </button>
    </motion.div>
  );
}

function NavItem({ icon, text, expanded }) {
  return (
    <motion.li 
      animate={{ justifyContent: expanded ? "start" : "center" }}
      className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded-md cursor-pointer"
    >
      <span className="text-2xl">{icon}</span>
      {expanded && <motion.span animate={{ opacity: expanded ? 1 : 0 }}>{text}</motion.span>}
    </motion.li>
  );
}
