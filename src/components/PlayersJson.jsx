import { useEffect, useState } from "react";
import { db, ref, onValue } from '../services/firebase';

function PlayersJson() {
    const [playersJson, setPlayersJson] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const playersRef = ref(db, 'players');

        const unsubscribe = onValue(playersRef, (snapshot) => {
            if (snapshot.exists()) {
                const playersData = snapshot.val();

                const playersJsonString = JSON.stringify(playersData, null, 2);
                console.log('playersJson:', playersJsonString);

                setPlayersJson(playersJsonString);
                setLoading(false);
            } else {
                console.log('No data available');
                setPlayersJson("{}");
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div>
            <h1>Players JSON Data</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <pre>{playersJson}</pre>
            )}
        </div>
    );
}

export default PlayersJson;