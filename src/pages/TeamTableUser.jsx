import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import { FaMedal } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function TeamTableUser({ teamData, isLoading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(13);
  const totalPages = Math.ceil(teamData.length / itemsPerPage);
  const prevRankRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth <= 768 ? 9 : 13);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (prevRankRef.current) {
      const prevRank = prevRankRef.current;
      const currentRank = teamData.map((team) => team.points);
      if (JSON.stringify(prevRank) !== JSON.stringify(currentRank)) {
      }
    }
    prevRankRef.current = teamData.map((team) => team.points);
  }, [teamData]);

  const renderPagination = () => {
    const paginationButtons = [];
    const maxPagesToShow = 8;
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
          className={`px-4 py-2 mx-1 border rounded-md ${currentPage === i ? 'bg-primary text-white' : 'bg-white'
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const sortedTeams = teamData
    .map((team) => ({ ...team, points: parseInt(team.points, 10) }))
    .sort((a, b) => b.points - a.points)
    .map((team, index) => ({ ...team, rank: index + 1 }));

  const renderRank = (rank) => {
    if (rank === 1) {
      return (
        <div className="flex items-center justify-center">
          <FaMedal className="text-yellow-500 text-2xl" />
          <span className="ml-2 font-bold">{rank}</span>
        </div>
      );
    } else if (rank === 2) {
      return (
        <div className="flex items-center justify-center">
          <FaMedal className="text-gray-400 text-2xl" />
          <span className="ml-2 font-bold">{rank}</span>
        </div>
      );
    } else if (rank === 3) {
      return (
        <div className="flex items-center justify-center">
          <FaMedal className="text-yellow-700 text-2xl" />
          <span className="ml-2 font-bold">{rank}</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full font-bold">
            {rank}
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <table className="min-w-full bg-white border border-gray-300 shadow-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Name</th>
            <th className="py-2 px-4 border-b text-center">Team name</th>
            <th className="py-2 px-4 border-b text-center">Points</th>
            <th className="py-2 px-4 border-b text-center">Team Rank</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            Array.from({ length: itemsPerPage }).map((_, index) => (
              <tr key={index} className="hover:bg-gray-100">
                {Array.from({ length: 4 }).map((_, index) => (
                  <td className="py-2 px-4 border-b text-center" key={index}>
                    <Skeleton width={170} height={20} />
                  </td>
                ))}
              </tr>
            ))
          ) : sortedTeams.length > 0 ? (
            <AnimatePresence>
              {sortedTeams
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((team) => (
                  <motion.tr
                    key={team.id}
                    layout
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="hover:bg-gray-100"
                    onClick={() => {
                      navigate(`team/${team.id}`)
                    }}
                  >
                    <td
                      className="py-2 px-4 border-b truncate cursor-pointer text-center"
                      title={team.Name}
                      style={{ maxWidth: '170px' }}
                    >
                      {truncateText(team.Name, 50)}
                    </td>
                    <td
                      className="py-2 px-4 border-b truncate cursor-pointer text-center"
                      title={team.Team}
                      style={{ maxWidth: '170px' }}
                    >
                      {truncateText(team.Team, 50)}
                    </td>
                    <td
                      className="py-2 px-4 border-b truncate cursor-pointer text-center"
                      title={team.points}
                      style={{ maxWidth: '170px' }}
                    >
                      {team.points}
                    </td>
                    <td
                      title={team.rank}
                      className="py-2 px-4 border-b text-center cursor-pointer"
                    >
                      {renderRank(team.rank)}
                    </td>
                  </motion.tr>
                ))}
            </AnimatePresence>
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