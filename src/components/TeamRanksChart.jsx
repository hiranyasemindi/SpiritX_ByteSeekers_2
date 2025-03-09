import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getDatabase, ref, onValue } from 'firebase/database';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function TeamRanksChart() {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase();
    const teamsRef = ref(db, 'teams');

    onValue(teamsRef, (snapshot) => {
      const teamsData = snapshot.val();
      if (teamsData) {
        const formattedData = Object.keys(teamsData).map((teamId) => ({
          name: teamsData[teamId].teamName,
          points: teamsData[teamId].points || 0, 
        }));
        setChartData(formattedData);
      }
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div style={{ width: '100%', height: '500px' }}>
        <Skeleton height={500} />
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="points" fill="#FF5B27" />
      </BarChart>
    </ResponsiveContainer>
  );
}