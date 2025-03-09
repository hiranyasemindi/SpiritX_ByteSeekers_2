import { useState, useEffect } from "react";
import { db, ref, get, set, update, onValue, off, remove } from "../services/firebase";
import toast from "react-hot-toast";
import TeamDetails from "./TeamDetails";
import SelectedTeamTable from "./SelectedTeamTable";
import SelectPlayersTable from "./SelectPlayersTable";
import { calculateBattingAverage, calculateBattingStrikeRate, calculateBowlingStrikeRate, calculateEconomyRate, calculatePlayerPoints } from "../utils/helper";

function Team({ team }) {
    const [availablePlayers, setAvailablePlayers] = useState([]);
    const [teamPlayers, setTeamPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        const username = localStorage.getItem("username");
        if (!username) {
            toast.error("No username found in localStorage");
            return;
        }

        const allPlayersRef = ref(db, "players");
        const teamRef = ref(db, `teams/${username}/players`);

        let allPlayersData = {};
        let teamPlayersData = {};

        const updateAvailablePlayers = (all, team) => {
            const teamIds = new Set(Object.keys(team));

            const allPlayersArray = Object.entries(all).map(([key, player]) => ({ key, ...player }));

            const filteredPlayers = allPlayersArray.filter(player => !teamIds.has(player.key));

            setAvailablePlayers(filteredPlayers);
            setLoading(false);
        };

        const unsubscribeAllPlayers = onValue(allPlayersRef, (snapshot) => {
            allPlayersData = snapshot.val() || {};
            console.log(allPlayersData)
            updateAvailablePlayers(allPlayersData, teamPlayersData);
        });

        const unsubscribeTeamPlayers = onValue(teamRef, (snapshot) => {
            teamPlayersData = snapshot.val() || {};
            setTeamPlayers(Object.values(teamPlayersData));
            updateAvailablePlayers(allPlayersData, teamPlayersData);
        });

        return () => {
            off(allPlayersRef, "value", unsubscribeAllPlayers);
            off(teamRef, "value", unsubscribeTeamPlayers);
        };
    }, []);

    const calculateTotalValue = (players) => {
        return players.reduce((total, player) => total + player.playerValue, 0);
    };

    const handleClear = async (playerKey) => {
        const username = localStorage.getItem("username");
        if (!username) {
            toast.error("No username found in localStorage");
            return;
        }

        const teamRef = ref(db, `teams/${username}`);
        const playerRef = ref(db, `teams/${username}/players/${playerKey}`);

        try {
            const snapshot = await get(playerRef);
            if (!snapshot.exists()) {
                toast.error("Player not found!");
                return;
            }
            const player = snapshot.val();

            const teamSnapshot = await get(teamRef);
            const teamData = teamSnapshot.val() || {};
            const currentSpent = teamData.spentAmount || 0;

            await update(teamRef, { spentAmount: Math.max(0, currentSpent - player.playerValue) });
            await remove(playerRef);

            toast.success("Player removed successfully!");
        } catch (error) {
            console.error("Error removing player:", error);
            toast.error("Failed to remove player.");
        }
    };


    useEffect(() => {
        setIsCompleted(teamPlayers.length === 11);
    }, [teamPlayers]);

    const handleAddPlayer = async (playerKey) => {
        const username = localStorage.getItem("username");
        if (!username) {
            toast.error("No username found in localStorage");
            return;
        }

        const player = availablePlayers.find((p) => p.key === playerKey);
        if (!player) {
            toast.error("Player not found!");
            return;
        }

        const totalSelectedValue = calculateTotalValue(teamPlayers);
        const remainingBudget = 9000000 - totalSelectedValue;

        if (remainingBudget - player.playerValue < 0) {
            toast.error("Not enough budget to add this player.");
            return;
        }

        if (teamPlayers.length >= 11) {
            toast.error("You cannot add more than 11 players.");
            return;
        }

        const teamRef = ref(db, `teams/${username}`);

        try {
            const snapshot = await get(teamRef);
            const teamData = snapshot.val() || {};
            const currentSpent = teamData.spentAmount || 0;

            await update(teamRef, { spentAmount: currentSpent + player.playerValue });

            const teamPlayerRef = ref(db, `teams/${username}/players/${playerKey}`);
            await set(teamPlayerRef, player);

            toast.success("Player added successfully!");

            if (teamPlayers.length + 1 === 11) {
                const totalPoints = calculateTeamPoints([...teamPlayers, player]);
                await update(teamRef, { points: Math.round(totalPoints * 100) / 100 });
            }
        } catch (error) {
            console.error("Error adding player:", error);
            toast.error("Failed to add player.");
        }
    };
    


    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const calculateTeamPoints = (players) => {
        let totalPoints = 0;
        players.forEach(player => {
            const battingStrike = calculateBattingStrikeRate(player.totalRuns, player.ballsFaced);
            const battingAverage = calculateBattingAverage(player.totalRuns, player.inningsPlayed);
            const bowlingStrikeRate = calculateBowlingStrikeRate(player.oversBowled, player.wickets);
            const economyRate = calculateEconomyRate(player.runsConceded, player.oversBowled);
            const playerPoints = calculatePlayerPoints(battingStrike, battingAverage, bowlingStrikeRate, economyRate);
            totalPoints += playerPoints;
        });
        return totalPoints;
    };

    const filteredPlayers = availablePlayers.filter((player) =>
        selectedCategory === "" || player.category === selectedCategory
    );

    const indexOfLastPlayer = currentPage * itemsPerPage;
    const indexOfFirstPlayer = indexOfLastPlayer - itemsPerPage;
    const currentPlayers = filteredPlayers.slice(indexOfFirstPlayer, indexOfLastPlayer);
    const totalPages = Math.ceil(filteredPlayers.length / itemsPerPage);

    const totalSelectedValue = calculateTotalValue(teamPlayers);

    const remainingBudget = 9000000 - totalSelectedValue;

    return (
        <div className="">
            <h2 className="text-2xl font-semibold mb-4">My Team</h2>
            <TeamDetails budget={remainingBudget} teamLength={teamPlayers?.length} teamName={team.teamName} points={team.points} isCompleted={isCompleted} />
            <SelectedTeamTable team={teamPlayers} handleClear={(id) => handleClear(id)} />

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

            <SelectPlayersTable onAddPlayer={(id) => handleAddPlayer(id)} currentPlayers={currentPlayers} totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
        </div>
    );
}

export default Team;
