import React, { useState } from 'react'
import PlayerTable from '../components/PlayerTable'

export default function Players() {
    const [players, setPlayers] = useState([
        {
          Name: 'Chamika Chandimal',
          University: 'University of the Visual & Performing Arts',
          Category: 'Batsman',
          'Total Runs': 530,
          'Balls Faced': 588,
          'Innings Played': 10,
          Wickets: 0,
          'Overs Bowled': 3,
          'Runs Conceded': 21
        },
      ]);
    
  return (
   <PlayerTable players={players} />
  )
}
