import React, { useEffect, useState } from 'react';
import TournementStats from '../components/TournementStats';
import { onValue, ref } from 'firebase/database';
import { db } from '../services/firebase';
import UserTeamTable from '../components/UserTeamTable';


export default function UserLeaderboard() {
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      let playersLoaded = false;
      let teamsLoaded = false;
  
      const checkLoadingStatus = () => {
        if (playersLoaded && teamsLoaded) {
          setIsLoading(false);
        }
      };
  
      const playersRef = ref(db, 'players');
      onValue(playersRef, (snapshot) => {
        const playersData = snapshot.val();
        if (playersData) {
          const playersList = Object.values(playersData);
          setPlayers(playersList);
        }
        playersLoaded = true; 
        checkLoadingStatus(); 
      });
  
      const teamsRef = ref(db, 'teams');
      onValue(teamsRef, (snapshot) => {
        const teamsData = snapshot.val();
        if (teamsData) {
          const teamsList = Object.keys(teamsData).map((teamId) => {
            const team = teamsData[teamId];
            team.ownerName = teamId;
            console.log(`Team ID: ${teamId}`);
            return team;
          });
          setTeams(teamsList);
          console.log(teamsList);
        }
        teamsLoaded = true; 
        checkLoadingStatus(); 
      });
    }, []);
  
    const calculateStats = () => {
      let totalRuns = 0;
      let totalWickets = 0;
      let highestRunScorer = { playerName: '', totalRuns: 0 };
      let highestWicketTaker = { playerName: '', wickets: 0 };
  
      players.forEach((player) => {
        totalRuns += parseInt(player.totalRuns, 10) || 0;
        totalWickets += parseInt(player.wickets, 10) || 0;
  
        if (player.totalRuns > highestRunScorer.totalRuns) {
          highestRunScorer = { playerName: player.playerName, totalRuns: player.totalRuns };
        }
  
        if (player.wickets > highestWicketTaker.wickets) {
          highestWicketTaker = { playerName: player.playerName, wickets: player.wickets };
        }
      });
  
      return { totalRuns, totalWickets, highestRunScorer, highestWicketTaker };
    };
  
    const { totalRuns, totalWickets, highestRunScorer, highestWicketTaker } = calculateStats();
  
    return (
      <>
        <h1 className="text-2xl font-bold mb-6">Tournement Summary</h1>
        <TournementStats
          runs={totalRuns}
          wickets={totalWickets}
          highestRunScorer={highestRunScorer}
          highestWicketTaker={highestWicketTaker}
          isLoading={isLoading}
        />
        <UserTeamTable teamData={teams} isLoading={isLoading} />
      </>
    );
}
