import React from 'react'
import DashboardStat from '../components/DashboardStat'
import TeamRanksChart from '../components/TeamRanksChart'

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <DashboardStat isLoading={false}/>
      <div className='mt-6'>
      <TeamRanksChart />
      </div>
    </div>
  )
}
