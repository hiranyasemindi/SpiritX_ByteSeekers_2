import React, { useEffect, useState } from 'react';
import TeamProfileCard from '../components/TeamProfileCard';
import TeamPlayersTable from '../components/TeamPlayersTable';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';

export default function TeamView() {
  const [teamName, setTeamName] = useState('');
  const [points, setPoints] = useState(0);
  const [budget, setBudget] = useState(0);
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const db = getDatabase();
    const teamRef = ref(db, `teams/${id}`);

    onValue(teamRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTeamName(data.teamName);
        setBudget(data.budget);
        setPoints(data.points || 0);

        const playerList = data.players ? Object.values(data.players) : [];
        setPlayers(playerList);
      }
      setIsLoading(false);
    });
  }, [id]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Team Summary</h1>
      <TeamProfileCard teamName={teamName} points={points} budget={budget} User={id} />
      <TeamPlayersTable playerList={players} isLoading={isLoading} />
    </>
  );
}