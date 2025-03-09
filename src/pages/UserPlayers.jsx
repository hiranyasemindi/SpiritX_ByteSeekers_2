import { useEffect, useState } from "react";
import { db, ref, onValue } from '../services/firebase';
import { useNavigate } from "react-router-dom";
import PlayerTable from "../components/PlayerTable";

function UserPlayers() {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        const username = localStorage.getItem("username");
        if (!username) {
            console.log("No username found in localStorage");
            setLoading(false);
            return;
        }

        const playersRef = ref(db, 'players');
        const teamRef = ref(db, `teams/${username}/players`);

        let allPlayersData = {};
        let teamPlayersData = {};

        const updateAvailablePlayers = () => {
            const teamPlayerIds = new Set(Object.keys(teamPlayersData));

            const availablePlayers = Object.entries(allPlayersData)
                .filter(([key]) => !teamPlayerIds.has(key))
                .map(([key, player]) => ({ id: key, ...player }));

            setPlayers(availablePlayers);
            setLoading(false);
        };

        const unsubscribeAllPlayers = onValue(playersRef, (snapshot) => {
            if (snapshot.exists()) {
                allPlayersData = snapshot.val();
                updateAvailablePlayers();
            } else {
                console.log('No players data available');
                setLoading(false);
            }
        });

        const unsubscribeTeamPlayers = onValue(teamRef, (snapshot) => {
            if (snapshot.exists()) {
                teamPlayersData = snapshot.val();
                updateAvailablePlayers();
            } else {
                teamPlayersData = {};
                updateAvailablePlayers();
            }
        });

        return () => {
            unsubscribeAllPlayers();
            unsubscribeTeamPlayers();
        };
    }, []);

    const navigate = useNavigate();

    return (
        <PlayerTable
            isUser={true}
            playerList={players}
            isLoading={loading}
            onAddNewPlayer={() => navigate('add')}
        />
    );
}

export default UserPlayers;
