import React, { useState } from 'react';

const PlayerTable = ({ players, onAddNewPlayer }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter players based on the search term
  const filteredPlayers = players.filter(player =>
    player.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      {/* Search Field */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by player name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Add New User Button */}
      <div className="mb-4">
        <button
          onClick={onAddNewPlayer}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add New User
        </button>
      </div>

      {/* Player Table */}
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
          {filteredPlayers.map((player, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{player.Name}</td>
              <td className="py-2 px-4 border-b">{player.University}</td>
              <td className="py-2 px-4 border-b">{player.Category}</td>
              <td className="py-2 px-4 border-b">{player['Total Runs']}</td>
              <td className="py-2 px-4 border-b">{player['Balls Faced']}</td>
              <td className="py-2 px-4 border-b">{player['Innings Played']}</td>
              <td className="py-2 px-4 border-b">{player.Wickets}</td>
              <td className="py-2 px-4 border-b">{player['Overs Bowled']}</td>
              <td className="py-2 px-4 border-b">{player['Runs Conceded']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerTable;