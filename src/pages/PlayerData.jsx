import { useLocation } from "react-router-dom"
import PlayerProfileCard from "../components/PlayerProfileCard"
import PlayerStats from "../components/PlayerStats"

function PlayerData() {
    const location = useLocation()
    const { player } = location.state || {}
    return (
        <>
            <PlayerProfileCard player={player}/>
            <PlayerStats player={player} />
        </>
    )
}

export default PlayerData
