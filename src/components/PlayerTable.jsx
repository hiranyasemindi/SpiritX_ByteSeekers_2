import React, { useState, useEffect } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PlayerTable = ({ players, onAddNewPlayer, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState();
  const [isMobile, setIsMobile] = useState(false);
  const [openPopoverId, setOpenPopoverId] = useState(null); // Track which player's popover is open

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setItemsPerPage(window.innerWidth <= 768 ? 9 : 15);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = [...new Set(players.map(player => player.Category))];

  const filteredPlayers = players.filter(player =>
    player.Name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '' || player.Category === selectedCategory)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPlayers = filteredPlayers.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredPlayers.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const handleMoreClick = (playerId) => {
    // If the same player's popover is clicked again, close it
    if (openPopoverId === playerId) {
      setOpenPopoverId(null);
    } else {
      // Otherwise, open the popover for the clicked player
      setOpenPopoverId(playerId);
    }
  };

  const handleDelete = (playerId) => {
    console.log('Deleted player ID:', playerId);
    setOpenPopoverId(null); // Close the popover after deletion
  };

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
          className={`px-4 py-2 mx-1 border rounded-md ${
            currentPage === i ? 'bg-primary text-white' : 'bg-white'
          }`}
        >
          {i}
        </button>
      );
    }

    if (startPage > 1) {
      paginationButtons.unshift(
        <span key="start-ellipsis" className="px-4 py-2 mx-1">...</span>
      );
    }

    if (endPage < totalPages) {
      paginationButtons.push(
        <span key="end-ellipsis" className="px-4 py-2 mx-1">...</span>
      );
    }

    return paginationButtons;
  };

  return (
    <div className="overflow-x-auto">
      <div className={`flex ${isMobile ? 'flex-col' : 'items-center'} rounded-t-lg mb-4`}>
        <input
          type="text"
          placeholder="Search by player name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`px-4 py-3 border border-gray-300 rounded-md ${isMobile ? 'mb-2' : 'mr-4'} flex-grow outline-primary`}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={`px-4 py-3.5 border border-gray-300 rounded-md ${isMobile ? 'mb-2' : 'mr-4'} outline-primary`}
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
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">University</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Total Runs</th>
            <th className="py-2 px-4 border-b">Balls Faced</th>
            <th className="py-2 px-4 border-b">Innings Played</th>
            <th className="py-2 px-4 border-b">Wickets</th>
            <th className="py-2 px-4 border-b">Overs Bowled</th>
            <th className="py-2 px-4 border-b">Runs Conceded</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            Array.from({ length: itemsPerPage }).map((_, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">
                  <Skeleton width={170} height={20} />
                </td>
                <td className="py-2 px-4 border-b">
                  <Skeleton width={170} height={20} />
                </td>
                <td className="py-2 px-4 border-b">
                  <Skeleton width={170} height={20} />
                </td>
                <td className="py-2 px-4 border-b">
                  <Skeleton width={50} height={20} />
                </td>
                <td className="py-2 px-4 border-b">
                  <Skeleton width={50} height={20} />
                </td>
                <td className="py-2 px-4 border-b">
                  <Skeleton width={50} height={20} />
                </td>
                <td className="py-2 px-4 border-b">
                  <Skeleton width={50} height={20} />
                </td>
                <td className="py-2 px-4 border-b">
                  <Skeleton width={50} height={20} />
                </td>
                <td className="py-2 px-4 border-b">
                  <Skeleton width={50} height={20} />
                </td>
                <td className="py-2 px-4 border-b">
                  <Skeleton width={50} height={20} />
                </td>
              </tr>
            ))
          ) : currentPlayers.length > 0 ? (
            currentPlayers.map((player, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td
                  className="py-2 px-4 border-b truncate cursor-pointer"
                  title={player.Name}
                  style={{ maxWidth: '170px' }}
                >
                  {truncateText(player.Name, 30)}
                </td>
                <td
                  className="py-2 px-4 border-b truncate cursor-pointer"
                  title={player.University}
                  style={{ maxWidth: '170px' }}
                >
                  {truncateText(player.University, 30)}
                </td>
                <td
                  className="py-2 px-4 border-b truncate cursor-pointer"
                  title={player.Category}
                  style={{ maxWidth: '170px' }}
                >
                  {truncateText(player.Category, 30)}
                </td>
                <td className="py-2 px-4 border-b">{player['Total Runs']}</td>
                <td className="py-2 px-4 border-b">{player['Balls Faced']}</td>
                <td className="py-2 px-4 border-b">{player['Innings Played']}</td>
                <td className="py-2 px-4 border-b">{player.Wickets}</td>
                <td className="py-2 px-4 border-b">{player['Overs Bowled']}</td>
                <td className="py-2 px-4 border-b">{player['Runs Conceded']}</td>
                <td className="py-2 px-4 border-b cursor-pointer relative">
                  <FiMoreVertical onClick={() => handleMoreClick(player.id)} />
                  {openPopoverId === player.id && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md z-50 shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <button
                          onClick={() => handleDelete(player.id)}
                          className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Delete
                        </button>
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
        <div className="flex justify-center mt-4">
          {renderPagination()}
        </div>
      )}
    </div>
  );
};

export default PlayerTable;