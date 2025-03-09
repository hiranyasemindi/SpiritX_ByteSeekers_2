import { useState, useEffect } from "react";
import { db, ref, get, set, onValue } from "../services/firebase";

function Team() {
    const [team, setTeam] = useState([]);
    const [teamName, setTeamName] = useState("");
    const [availablePlayers, setAvailablePlayers] = useState([]);
    const [loading, setLoading] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState(""); // Initial state is empty for no category
    const [budget, setBudget] = useState(9000000);
    const maxPlayers = 11;

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // You can change the number of items per page

    useEffect(() => {
        const username = localStorage.getItem("username");
        if (!username) return;

        const teamRef = ref(db, `teams/${username}`);
        get(teamRef).then((snapshot) => {
            if (snapshot.exists()) {
                const teamData = snapshot.val();
                setTeam(teamData.players || []);
                setTeamName(teamData.teamName || "My Team");
                updateBudget(teamData.players || []);
            }
        });

        const playersRef = ref(db, "players");

        const unsubscribe = onValue(playersRef, (snapshot) => {
            if (snapshot.exists()) {
                const playersData = snapshot.val();
                const playersList = [];
                for (let id in playersData) {
                    playersList.push({ id, ...playersData[id] });
                }
                setAvailablePlayers(playersList);
                setLoading(false);
            } else {
                console.log("No data available");
            }
        });
        return () => unsubscribe();
    }, []);

    const updateBudget = (players) => {
        const totalSpent = players.reduce((sum, player) => sum + player.playerValue , 0);
        setBudget(9000000 - totalSpent);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1); 
    };

    const handleRemovePlayer = (playerId) => {
        const newTeam = team.filter((p) => p.id !== playerId);
        setTeam(newTeam);
        updateBudget(newTeam);

        const username = localStorage.getItem("username");
        if (username) {
            set(ref(db, `teams/${username}/players`), newTeam);
        }
    };

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Filter players based on selected category
    const filteredPlayers = availablePlayers.filter((player) => 
        selectedCategory === "" || player.category === selectedCategory
    );

    // Pagination logic
    const indexOfLastPlayer = currentPage * itemsPerPage;
    const indexOfFirstPlayer = indexOfLastPlayer - itemsPerPage;
    const currentPlayers = filteredPlayers.slice(indexOfFirstPlayer, indexOfLastPlayer);

    // Total pages based on filtered players
    const totalPages = Math.ceil(filteredPlayers.length / itemsPerPage);

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
                    className={`px-4 py-2 mx-1 border rounded-md ${currentPage === i ? "bg-primary text-white" : "bg-white"}`}
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
        <div className="">
            <h2 className="text-2xl font-semibold mb-4">My Team</h2>

            {/* Team Info */}
            <div className="max-w-7xl mx-auto pb-3">
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center md:items-start justify-between">
                    <div className="flex flex-col space-y-2 w-full md:w-2/3 text-center md:text-left">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex flex-col md:flex-row items-center md:items-start">
                            <span>Team Name: {teamName}</span>
                        </h2>
                        <p className="text-gray-600">
                            Budget: <span className="text-primary text-lg font-semibold">LKR {budget}.00</span>
                        </p>
                        <p className="text-gray-600">Total Players: {team.length} / {maxPlayers}</p>
                    </div>
                    <div className="flex justify-center md:justify-end w-full md:w-1/3 mt-4 md:mt-0">
                        <img src="/images/player-avatar.png" alt="Player Avatar" className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover" />
                    </div>
                </div>
            </div>

            {/* Selected Players Table */}
            <h3 className="text-xl font-semibold mb-2">Selected Players</h3>
            <table className="min-w-full bg-white border border-gray-300 shadow-lg mb-6">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-left">Player Name</th>
                        <th className="py-2 px-4 border-b text-left">University</th>
                        <th className="py-2 px-4 border-b text-left">Category</th>
                        <th className="py-2 px-4 border-b text-left">Budget</th>
                        <th className="py-2 px-4 border-b text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {team.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="py-2 px-4 border-b text-center">No players added yet.</td>
                        </tr>
                    ) : (
                        team.map((player) => (
                            <tr key={player.id}>
                                <td className="py-2 px-4 border-b">{player.playerName}</td>
                                <td className="py-2 px-4 border-b">{player.university}</td>
                                <td className="py-2 px-4 border-b">{player.category}</td>
                                <td className="py-2 px-4 border-b">LKR {player.playerValue}.00 </td>
                                <td className="py-2 px-4 border-b">
                                    <button onClick={() => handleRemovePlayer(player.id)} className="text-red-500 hover:text-red-700">Remove</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Select Category */}
            <h3 className="text-xl font-semibold mb-2">Select Players</h3>
            <div className="flex space-x-4 mb-4">
                {["Batsman", "Bowler", "All-Rounder"].map((category) => (
                    <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`px-4 py-2 rounded-md ${selectedCategory === category ? "bg-primary text-white" : "bg-gray-200"}`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <table className="min-w-full bg-white border border-gray-300 shadow-lg">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-left">Player Name</th>
                        <th className="py-2 px-4 border-b text-left">University</th>
                        <th className="py-2 px-4 border-b text-left">Budget</th>
                        <th className="py-2 px-4 border-b text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPlayers.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="py-2 px-4 border-b text-center">No players available.</td>
                        </tr>
                    ) : (
                        currentPlayers.map((player) => (
                            <tr key={player.id}>
                                <td className="py-2 px-4 border-b">{player.playerName}</td>
                                <td className="py-2 px-4 border-b">{player.university}</td>
                                <td className="py-2 px-4 border-b">LKR {player.playerValue}</td>
                                <td className="py-2 px-4 border-b">
                                    <button className="text-green-500 hover:text-green-700">Add</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-4">{renderPagination()}</div>
            )}
        </div>
    );
}

export default Team;
