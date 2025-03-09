import React from 'react'
import TournementStats from '../components/TournementStats'
import TeamTableUser from './TeamTableUser'
import Tournament from '../components/TournementStats'


export default function UserLeaderboard() {

    const tournements = [
        {
            id: 1,
            Name: 'Chamika Chandimal',
            Team: 'University of the Visual & Performing Arts',
            points: 100000,
        },
        {
            id: 2,
            Name: 'Chamika Chandimal',
            Team: 'University of the Visual & Performing Arts',
            points: 130,
        },
        {
            id: 3,
            Name: 'Chamika Chandimal',
            Team: 'University of the Visual & Performing Arts',
            points: 100,
        },
        {
            id: 4,
            Name: 'Chamika Chandimal',
            Team: 'University of the Visual & Performing Arts',
            points: 100,
        },
    ]
    return (
        <>
            <h1 className="text-2xl font-bold mb-6">Tournement Summary</h1>
            <TournementStats />
            <TeamTableUser teamData={tournements} />
        </>
    )
}
