import { useEffect, useState } from 'react';
import { db, ref, onValue } from '../services/firebase';
import PlayerCard from "../components/PlayerCard";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // For proper styling

const YourComponent = () => {
    const [players, setPlayers] = useState([]);
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const username = localStorage.getItem("username");

    useEffect(() => {
        const teamRef = ref(db, `teams/${username}`);
        const unsubscribe = onValue(teamRef, (snapshot) => {
            if (snapshot.exists()) {
                const teamData = snapshot.val();
                setTeam(teamData);

                if (teamData.players) {
                    const playersArray = Object.values(teamData.players);
                    setPlayers(playersArray);
                } else {
                    setPlayers([]);
                }
                setLoading(false); // Set loading to false when data is fetched
            } else {
                setTeam(null);
                setPlayers([]);
                setLoading(false); // Set loading to false when no data is available
            }
        });

        return () => unsubscribe();
    }, [username]);

    return (
        <div className="w-full h-full">
            <h1 className="text-2xl font-bold mb-6">Budget Tracker</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white text-black p-6 rounded-2xl shadow-lg h-44 flex flex-col justify-between">
                    <div className="text-xl font-semibold text-center">
                        {loading ? <Skeleton width={150} /> : 'Remaining Budget'}
                    </div>
                    <div className="text-2xl font-bold text-center">
                        {loading ? <Skeleton width={200} /> : `LKR ${team?.budget - team?.spentAmount}.00 / LKR ${team?.budget}.00`}
                    </div>
                    <div className="w-full bg-gray-300 h-3 rounded-full mt-2">
                        <div
                            className="bg-primary/80 h-full rounded-full transition-all duration-500"
                            style={{ width: `${((team?.budget - team?.spentAmount) / team?.budget) * 100}%` }}
                        ></div>
                    </div>
                </div>

                <div className="bg-white text-black p-6 rounded-2xl shadow-lg h-44 flex flex-col justify-between">
                    <div className="text-xl font-semibold text-center">
                        {loading ? <Skeleton width={180} /> : 'Players in Your Team'}
                    </div>
                    <div className="text-3xl font-bold text-center text-primary">
                        {loading ? <Skeleton width={50} /> : players.length}
                    </div>
                    <div className="text-md text-center text-gray-600">
                        {loading ? <Skeleton width={120} /> : `You can add ${11 - players.length} more players`}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {loading
                    ? Array(6).fill(0).map((_, index) => (
                        <div key={index} className="w-full">
                            <Skeleton height={150} />
                        </div>
                    ))
                    : players?.map((player) => (
                        <PlayerCard
                            key={player.key}
                            player={player}
                        />
                    ))}
            </div>
        </div>
    );
};

export default YourComponent;
