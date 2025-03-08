import React from 'react'
import DashboardStat from '../components/DashboardStat'

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <p className="text-xl">Welcome to the dashboard</p>
      <DashboardStat/>
    </div>
  )
}
