import { useEffect, useState } from "react";
import { db, ref, onValue } from '../services/firebase';
import { useNavigate } from "react-router-dom";

function PlayersJson() {
    const [playersJson, setPlayersJson] = useState(""); // State to store JSON string
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const playersRef = ref(db, 'players');

        const unsubscribe = onValue(playersRef, (snapshot) => {
            if (snapshot.exists()) {
                const playersData = snapshot.val();

                // Convert the players data to JSON format
                const playersJsonString = JSON.stringify(playersData, null, 2); // Pretty-print JSON
                console.log('playersJson:', playersJsonString);

                // Update the state with the JSON string
                setPlayersJson(playersJsonString);
                setLoading(false);
            } else {
                console.log('No data available');
                setPlayersJson("{}"); // Set empty JSON object if no data exists
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const navigate = useNavigate();

    return (
        <div>
            <h1>Players JSON Data</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <pre>{playersJson}</pre> // Display the JSON string in a <pre> tag for formatting
            )}
        </div>
    );
}

export default PlayersJson;