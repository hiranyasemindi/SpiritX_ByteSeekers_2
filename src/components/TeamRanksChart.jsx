import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Team A', points: 1 },
  { name: 'Team B', points: 2 },
  { name: 'Team C', points: 3 },
  { name: 'Team D', points: 4 },
  { name: 'Team E', points: 5 },
  { name: 'Team A', points: 1 },
  { name: 'Team B', points: 2 },
  { name: 'Team C', points: 3 },
  { name: 'Team D', points: 4 },
  { name: 'Team E', points: 5 },

];

export default function TeamRanksChart() {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        data={data}
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