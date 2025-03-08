import { FaUsers, FaCreditCard, FaCalendarCheck, FaCog, FaChartBar, FaSignOutAlt, FaBars } from "react-icons/fa";
import { HiOutlineViewGrid } from "react-icons/hi";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path
      ? "bg-[#FF5B27] text-[#FFFFFFFF]"
      : "text-[#000000]";
  };
  return (
    <div className={`h-screen ${expanded ? "w-64" : "w-20"} bg-gray-900 text-white p-4 flex flex-col transition-all duration-300`}>
      
      {/* Toggle Button */}
      <button onClick={() => setExpanded(!expanded)} className="p-2 bg-gray-800 rounded-md mb-4">
        <FaBars />
      </button>
      
      {/* Logo */}
      <div className="flex items-center space-x-3 pb-6">
        <div className="bg-purple-500 h-8 w-8 rounded-full"></div>
        {expanded && <h1 className="text-lg font-bold">Teams.co</h1>}
      </div>
      
      {/* Profile */}
      {expanded && (
        <div className="flex flex-col items-center mb-6">
          <div className="bg-yellow-400 h-12 w-12 rounded-full"></div>
          <h2 className="text-sm mt-2">Aman</h2>
          <p className="text-xs text-gray-400">Product Designer</p>
        </div>
      )}

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
        <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center mt-4">
          <FaChartBar className="text-purple-400 text-2xl" />
          <p className="text-xs mt-2 text-center">Create Teams<br />Increase your speed</p>
        </div>
      )}

      {/* Logout Button */}
      <button className="flex items-center justify-center space-x-2 mt-4 py-2 px-4 bg-purple-600 rounded-lg text-white hover:bg-purple-500">
        <FaSignOutAlt />
        {expanded && <span>Logout</span>}
      </button>
    </div>
  );
}

function NavItem({ icon, text, expanded }) {
  return (
    <li className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded-md cursor-pointer">
      {icon}
      {expanded && <span>{text}</span>}
    </li>
  );
}
