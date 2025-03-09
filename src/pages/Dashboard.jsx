import React, { useEffect, useState } from 'react';
import DashboardStat from '../components/DashboardStat';
import TeamRanksChart from '../components/TeamRanksChart';
import { db, ref, onValue } from '../services/firebase';

export default function Dashboard() {
  const [players, setPlayers] = useState(0);
  const [users, setUsers] = useState(0);
  const [teams, setTeams] = useState(0);
  const [categories, setCategories] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const playersRef = ref(db, 'players');
    const usersRef = ref(db, 'users');
    const teamsRef = ref(db, 'teams');
    const categoriesRef = ref(db, 'categories');

    let loadedCount = 0;
    const totalLoads = 4;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === totalLoads) {
        setLoading(false);
      }
    };

    const unsubscribePlayers = onValue(playersRef, (snapshot) => {
      if (snapshot.exists()) {
        const playersData = snapshot.val();
        const playersList = Object.keys(playersData).map(id => ({ id, ...playersData[id] }));
        setPlayers(playersList.length);
      } else {
        console.log('No players data available');
      }
      checkAllLoaded();
    });

    const unsubscribeUsers = onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const usersData = snapshot.val();
        const usersList = Object.keys(usersData).map(id => ({ id, ...usersData[id] }));
        setUsers(usersList.length);
      } else {
        console.log('No users data available');
      }
      checkAllLoaded();
    });

    const unsubscribeTeams = onValue(teamsRef, (snapshot) => {
      if (snapshot.exists()) {
        const teamsData = snapshot.val();
        const teamsList = Object.keys(teamsData).map(teamName => ({ teamName, ...teamsData[teamName] }));
        setTeams(teamsList.length);
      } else {
        console.log('No teams data available');
      }
      checkAllLoaded();
    });

    const unsubscribeCategories = onValue(categoriesRef, (snapshot) => {
      if (snapshot.exists()) {
        const categoriesData = snapshot.val();
        const categoriesList = Object.keys(categoriesData).map(category => ({ category, ...categoriesData[category] }));
        setCategories(categoriesList.length);
      } else {
        console.log('No categories data available');
      }
      checkAllLoaded();
    });

    return () => {
      unsubscribePlayers();
      unsubscribeUsers();
      unsubscribeTeams();
      unsubscribeCategories();
    };
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <DashboardStat isLoading={loading} playersCount={players} usersCount={users} teamsCount={teams} categoriesCount={categories} />
      <div className='mt-6'>
        <TeamRanksChart />
      </div>
    </div>
  );
}