import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { FiMoreVertical } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import { db, ref, remove } from "../services/firebase";


export default function TeamPlayersTable({playerList, isLoading}) {
  const [players, setPlayers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isMobile, setIsMobile] = useState(false);
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPlayers = players.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(players.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
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
    <div className="w-full">
      <div
        className={`flex ${isMobile ? "flex-col" : "items-center"
          } rounded-t-lg mb-4`}
      >
      </div>
      <table className="min-w-full bg-white border border-gray-300 shadow-lg">
        <thead>
          <tr>
          <th className="py-2 px-4 border-b text-left">Player Name</th>
            <th className="py-2 px-4 border-b text-left">University</th>
            <th className="py-2 px-4 border-b text-left">Category</th>
            <th className="py-2 px-4 border-b text-left">Total Runs</th>
            <th className="py-2 px-4 border-b text-left">Balls Faced</th>
            <th className="py-2 px-4 border-b text-left">Innings Played</th>
            <th className="py-2 px-4 border-b text-left">Wickets</th>
            <th className="py-2 px-4 border-b text-left">Overs Bowled</th>
            <th className="py-2 px-4 border-b text-left">Runs Conceded</th>
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
              <tr
                key={index}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate(`${player.id}`, { state: { player } })}
              >
                <td className="py-2 px-4 border-b text-center">{truncateText(player.playerName, 8)}</td>
                <td className="py-2 px-4 border-b">{truncateText(player.university, 20)}</td>
                <td className="py-2 px-4 border-b text-center">{player.category}</td>
                <td className="py-2 px-4 border-b text-center">{player.totalRuns}</td>
                <td className="py-2 px-4 border-b text-center">{player.ballsFaced}</td>
                <td className="py-2 px-4 border-b text-center">{player.inningsPlayed}</td>
                <td className="py-2 px-4 border-b text-center">{player.wickets}</td>
                <td className="py-2 px-4 border-b text-center">{player.oversBowled}</td>
                <td className="py-2 px-4 border-b text-center">{player.runsConceded}</td>
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
}
