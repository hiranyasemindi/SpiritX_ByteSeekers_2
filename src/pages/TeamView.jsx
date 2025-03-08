import React, { use, useState } from 'react'
import TeamProfileCard from '../components/TeamProfileCard'
import TeamPlayersTable from '../components/TeamPlayersTable'

export default function TeamView() {
  const [teamName, setTeamName] = useState('Team A')
  const [points, setPoints] = useState(100)
  const [budget, setBudget] = useState(1000000)
  const [user, setUser] = useState('User A')

  return (
   <>
      <h1 className="text-2xl font-bold mb-6">Team Summary</h1>
    <TeamProfileCard teamName={teamName} points={points} budget={budget} User={user}/>
    <TeamPlayersTable playerList={[
        {
          playerName: 'Dinesh Samarawickrama',
          university: 'University of Jaffna',
          category: 'Batsman',
          totalRuns: 400,
          ballsFaced: 444,
          inningsPlayed: 8,
          wickets: 0,
          oversBowled: 3,
          runsConceded: 27
        },
        {
          playerName: 'Suranga Sandakan',
          university: 'University of Moratuwa',
          category: 'Batsman',
          totalRuns: 235,
          ballsFaced: 261,
          inningsPlayed: 5,
          wickets: 0,
          oversBowled: 4,
          runsConceded: 36
        },
        {
          playerName: 'Sandakan Dickwella',
          university: 'University of Jaffna',
          category: 'Batsman',
          totalRuns: 368,
          ballsFaced: 408,
          inningsPlayed: 8,
          wickets: 0,
          oversBowled: 3,
          runsConceded: 27
        },
        {
          playerName: 'Sammu Rajapaksa',
          university: 'University of Ruhuna',
          category: 'Batsman',
          totalRuns: 240,
          ballsFaced: 266,
          inningsPlayed: 5,
          wickets: 0,
          oversBowled: 2,
          runsConceded: 16
        },
        {
          playerName: 'Suranga Bandara',
          university: 'University of Moratuwa',
          category: 'Bowler',
          totalRuns: 154,
          ballsFaced: 308,
          inningsPlayed: 14,
          wickets: 46,
          oversBowled: 140,
          runsConceded: 840
        },
        {
          playerName: 'Tharindu Embuldeniya',
          university: 'University of the Visual & Performing Arts',
          category: 'All-Rounder',
          totalRuns: 264,
          ballsFaced: 220,
          inningsPlayed: 12,
          wickets: 12,
          oversBowled: 60,
          runsConceded: 360
        }
    ]} isLoading={false}/>
   </>
  )
}
