import { useEffect, useState } from "react";
import { calculateBattingAverage, calculateBattingStrikeRate, calculateBowlingStrikeRate, calculateEconomyRate, calculatePlayerPoints, calculatePlayerValue } from "../utils/helper";

function PlayerProfileCard({ player }) {
    const [playerValue, setPlayerValue] = useState(0);
    const calculateBudget = (player) => {
        const battingStrike = calculateBattingStrikeRate(player.totalRuns, player.ballsFaced);
        const battingAverage = calculateBattingAverage(player.totalRuns, player.inningsPlayed);
        const bowlingStrikeRate = calculateBowlingStrikeRate(player.oversBowled, player.wickets);
        const economyRate = calculateEconomyRate(player.runsConceded, player.oversBowled);
        const playerPoints = calculatePlayerPoints(battingStrike, battingAverage, bowlingStrikeRate, economyRate);
        console.log(battingStrike, battingAverage, bowlingStrikeRate, economyRate, playerPoints);
        const playerValue = calculatePlayerValue(playerPoints);
        setPlayerValue(playerValue);
    }
    useEffect(() => {
        calculateBudget(player);
    }, []);
    return (
        <div className="max-w-7xl mx-auto px-6 pb-3">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center md:items-start justify-between">
                <div className="flex flex-col space-y-2 w-full md:w-2/3 text-center md:text-left">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex flex-col md:flex-row items-center md:items-start">
                        <span>Player Name: {player.playerName}</span>
                    </h2>
                    <p className="text-gray-600">Category: {player.category}</p>
                    <p className="text-gray-600">University: {player.university}</p>
                    <p className="text-gray-600">
                        Budget: <span className="text-primary text-lg font-semibold">LKR {playerValue}.00</span>
                    </p>
                </div>

                <div className="flex justify-center md:justify-end w-full md:w-1/3 mt-4 md:mt-0">
                    <img
                        src="/images/player-avatar.png"
                        alt="Player Avatar"
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
}

export default PlayerProfileCard;
