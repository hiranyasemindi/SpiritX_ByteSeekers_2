import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PlayerTable = ({ players, onAddNewPlayer, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(13);

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

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center p-4 rounded-t-lg mb-4">
        <input
          type="text"
          placeholder="Search by player name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-md mr-4 flex-grow outline-primary"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3.5 border border-gray-300 rounded-md mr-4 outline-primary"
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
      <table className="min-w-full bg-white border border-gray-300">
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
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            // Show skeleton loading states
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
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 border rounded-md ${
                currentPage === index + 1 ? 'bg-primary text-white' : 'bg-white'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayerTable;