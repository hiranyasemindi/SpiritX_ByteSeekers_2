import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { FiMoreVertical } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import { db, ref, remove } from "../services/firebase";

const PlayerTable = ({ playerList, onAddNewPlayer, isLoading }) => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isMobile, setIsMobile] = useState(false);
  const [openPopoverId, setOpenPopoverId] = useState(null);
  const popoverRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setPlayers(playerList);
  }, [playerList]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setItemsPerPage(window.innerWidth <= 768 ? 5 : 10);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setOpenPopoverId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const categories = [...new Set(players.map((player) => player.category))];

  const filteredPlayers = players.filter(
    (player) =>
      player.playerName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || player.category === selectedCategory)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPlayers = filteredPlayers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredPlayers.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const handleMoreClick = (playerId, event) => {
    if (openPopoverId === playerId) {
      setOpenPopoverId(null);
    } else {
      setOpenPopoverId(playerId);
      const buttonRect = event.target.getBoundingClientRect();
      const popover = popoverRef.current;
      if (popover) {
        const popoverRect = popover.getBoundingClientRect();
        let top = buttonRect.bottom;
        if (top + popoverRect.height > window.innerHeight) {
          top = buttonRect.top - popoverRect.height;
        }
        let left = buttonRect.left;
        if (left + popoverRect.width > window.innerWidth) {
          left = window.innerWidth - popoverRect.width;
        }

        popover.style.top = `${top}px`;
        popover.style.left = `${left}px`;
      }
    }
  };

  const handleDelete = async (playerId) => {
    const confirmed = window.confirm("Are you sure you want to delete this player?");
    if (!confirmed) return;

    try {
      const playerRef = ref(db, 'players/' + playerId);
      await remove(playerRef);

      const updatedPlayers = players.filter(player => player.id !== playerId);
      setPlayers(updatedPlayers);

      setOpenPopoverId(null);

      toast.success("Player deleted successfully");
    } catch (error) {
      console.error("Error deleting player:", error);
      toast.error("Failed to delete player. Please try again.");
    }
  };

  const handleEdit = (player) => {
    navigate('edit', { state: { player } });
    setOpenPopoverId(null);
  };

  const renderPagination = () => {
    const paginationButtons = [];
    const maxPagesToShow = 5;
    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const halfMaxPages = Math.floor(maxPagesToShow / 2);
      if (currentPage <= halfMaxPages) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + halfMaxPages >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - halfMaxPages;
        endPage = currentPage + halfMaxPages;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 mx-1 border rounded-md ${currentPage === i ? "bg-primary text-white" : "bg-white"
            }`}
        >
          {i}
        </button>
      );
    }

    if (startPage > 1) {
      paginationButtons.unshift(
        <span key="start-ellipsis" className="px-4 py-2 mx-1">
          ...
        </span>
      );
    }

    if (endPage < totalPages) {
      paginationButtons.push(
        <span key="end-ellipsis" className="px-4 py-2 mx-1">
          ...
        </span>
      );
    }

    return paginationButtons;
  };

  return (
    <div className="w-full h-full">
      <div
        className={`flex ${isMobile ? "flex-col" : "items-center"
          } rounded-t-lg mb-4`}
      >
        <input
          type="text"
          placeholder="Search by player name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`px-4 py-3 border border-gray-300 rounded-md ${isMobile ? "mb-2" : "mr-4"
            } flex-grow outline-primary`}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={`px-4 py-3.5 border border-gray-300 rounded-md ${isMobile ? "mb-2" : "mr-4"
            } outline-primary`}
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button
          onClick={onAddNewPlayer}
          className="px-4 py-3 bg-primary text-white rounded-md"
        >
          Add New Player
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300 shadow-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">University</th>
            <th className="py-2 px-4 border-b text-left">Category</th>
            <th className="py-2 px-4 border-b text-left">Total Runs</th>
            <th className="py-2 px-4 border-b text-left">Balls Faced</th>
            <th className="py-2 px-4 border-b text-left">Innings Played</th>
            <th className="py-2 px-4 border-b text-left">Wickets</th>
            <th className="py-2 px-4 border-b text-left">Overs Bowled</th>
            <th className="py-2 px-4 border-b text-left">Runs Conceded</th>
            <th className="py-2 px-4 border-b text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            Array.from({ length: itemsPerPage }).map((_, index) => (
              <tr key={index} className="hover:bg-gray-100">
                {Array.from({ length: 9 }).map((_, index) => (
                  <td className="py-2 px-4 border-b" key={index}>
                    <Skeleton width={100} height={20} />
                  </td>
                ))}
              </tr>
            ))
          ) : currentPlayers.length > 0 ? (
            currentPlayers.map((player, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{truncateText(player.university, 20)}</td>
                <td className="py-2 px-4 border-b text-center">{player.category}</td>
                <td className="py-2 px-4 border-b text-center">{player.totalRuns}</td>
                <td className="py-2 px-4 border-b text-center">{player.ballsFaced}</td>
                <td className="py-2 px-4 border-b text-center">{player.inningsPlayed}</td>
                <td className="py-2 px-4 border-b text-center">{player.wickets}</td>
                <td className="py-2 px-4 border-b text-center">{player.oversBowled}</td>
                <td className="py-2 px-4 border-b text-center">{player.runsConceded}</td>
                <td className="py-2 px-4 border-b relative">
                  <FiMoreVertical
                    onClick={(e) => handleMoreClick(player.id, e)}
                    className="cursor-pointer"
                  />
                  {openPopoverId === player.id && (
                    <div
                      ref={popoverRef}
                      className="absolute right-0 mt-2 w-48 rounded-md z-50 shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    >
                      <div className="py-1">
                        <div
                          onClick={() => handleDelete(player.id)}
                          className="block w-full px-4 py-2 text-md hover:bg-gray-100 text-red-600 font-medium"
                        >
                          <div className="flex items-center justify-center gap-1">
                            <MdOutlineDelete />
                            Delete
                          </div>
                        </div>
                      </div>
                      <div>
                        <div
                          onClick={() => handleEdit(player)}
                          className="block w-full px-4 py-2 text-md hover:bg-gray-100 text-yellow-500 font-medium"
                        >
                          <div className="flex items-center justify-center gap-1">
                            <CiEdit />
                            Edit
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="py-2 px-4 border-b text-center">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">{renderPagination()}</div>
      )}
    </div>
  );
};

export default PlayerTable;  