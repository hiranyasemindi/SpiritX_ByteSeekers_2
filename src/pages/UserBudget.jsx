import { useState } from "react";
import PlayerCard from "../components/PlayerCard";

function UserBudget() {
    const initialBudget = 9000000; // Initial budget is 9 million
    const [budget, setBudget] = useState(initialBudget); // Current budget state
    const [players, setPlayers] = useState([
        { id: 1, name: "Player 1", value: 20000, details: "Batsman", purchased: false },
        { id: 2, name: "Player 2", value: 150000, details: "Bowler", purchased: false },
        { id: 3, name: "Player 3", value: 180000, details: "All-Rounder", purchased: false },
        { id: 4, name: "Player 4", value: 220000, details: "Bowler", purchased: false },
        { id: 5, name: "Player 5", value: 175000, details: "Batsman", purchased: false },
        { id: 6, name: "Player 6", value: 200000, details: "Wicketkeeper", purchased: false },
        { id: 7, name: "Player 7", value: 250000, details: "Batsman", purchased: false },
        { id: 8, name: "Player 8", value: 300000, details: "Bowler", purchased: false },
        { id: 9, name: "Player 9", value: 190000, details: "All-Rounder", purchased: false },
        
    ]);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const playersPerPage = 6; // Number of players to display per page

    // Calculate the total number of pages
    const totalPages = Math.ceil(players.length / playersPerPage);

    // Get the players for the current page
    const indexOfLastPlayer = currentPage * playersPerPage;
    const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
    const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);

    // Calculate the total value of purchased players
    const totalPurchasedValue = players
        .filter((player) => player.purchased) // Filter purchased players
        .reduce((total, player) => total + player.value, 0); // Sum their values

    // Calculate the remaining budget
    const remainingBudget = initialBudget - totalPurchasedValue;

    // Function to handle purchasing a player
    const handlePurchase = (playerId) => {
        setPlayers((prevPlayers) =>
            prevPlayers.map((player) =>
                player.id === playerId ? { ...player, purchased: true } : player
            )
        );
    };

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="w-full h-full">
            <h1 className="text-2xl font-bold mb-6">Budget Tracker</h1>
            {/* Budget and Players Summary Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Budget Card */}
                <div className="bg-white text-black p-6 rounded-2xl shadow-lg h-44 flex flex-col justify-between">
                    <div className="text-xl font-semibold text-center">Remaining Budget</div>
                    <div className="text-3xl font-bold text-center">${remainingBudget.toLocaleString()}</div>

                    {/* Budget Progress Bar */}
                    <div className="w-full bg-gray-300 h-3 rounded-full mt-2">
                        <div
                            className="bg-primary/80 h-full rounded-full transition-all duration-500"
                            style={{ width: `${(remainingBudget / initialBudget) * 100}%` }} // Calculate progress based on remaining budget
                        ></div>
                    </div>
                </div>

                {/* Players Card */}
                <div className="bg-white text-black p-6 rounded-2xl shadow-lg h-44 flex flex-col justify-between">
                    <div className="text-xl font-semibold text-center">Players in Your Team</div>
                    <div className="text-3xl font-bold text-center">
                        {players.filter((player) => player.purchased).length}
                    </div>
                    <div className="text-md text-center text-gray-600">
                        You can add {11 - players.filter((player) => player.purchased).length} more players
                    </div>
                </div>
            </div>

            {/* Player Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {currentPlayers.map((player) => (
                    <PlayerCard
                        key={player.id}
                        player={player}
                        onPurchase={() => handlePurchase(player.id)} // Pass purchase handler
                        isPurchased={player.purchased} // Pass purchased status
                    />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 rounded-lg ${
                            currentPage === index + 1
                                ? "bg-primary text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default UserBudget;