import React, { useEffect, useState } from 'react';
import PlayerTable from '../components/PlayerTable';
import { useNavigate } from 'react-router-dom';
import { db, ref, onValue } from '../services/firebase'; // Import onValue

export default function Players() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const playersRef = ref(db, 'players');

    const unsubscribe = onValue(playersRef, (snapshot) => {
      if (snapshot.exists()) {
        const playersData = snapshot.val();
        const playersList = [];
        for (let id in playersData) {
          playersList.push({ id, ...playersData[id] });
        }
        console.log('playersList:', playersList);
        setPlayers(playersList); 
      } else {
        console.log('No data available');
      }
    });

    return () => unsubscribe();
  }, []);

  const navigate = useNavigate();

  return (
    <PlayerTable playerList={players} onAddNewPlayer={() => navigate('add')} />
  );
}
