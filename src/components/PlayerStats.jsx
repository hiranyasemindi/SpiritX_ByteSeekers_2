import { FaRunning, FaTrophy, FaClock, FaBasketballBall, FaChartLine } from 'react-icons/fa';
import { FaShieldAlt } from 'react-icons/fa'; 
import Card from './Card'; 

function PlayerStats({player}) {
    return (
        <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card 
                title="Total Runs" 
                value={player.totalRuns} 
                icon={<FaRunning />} 
            />
            <Card 
                title="Balls Faced" 
                value={player.ballsFaced} 
                icon={<FaBasketballBall />} 
            />
            <Card 
                title="Innings Played" 
                value={player.inningsPlayed} 
                icon={<FaChartLine />} 
            />
            <Card 
                title="Wickets" 
                value={player.wickets} 
                icon={<FaTrophy />} 
            />
            <Card 
                title="Overs Bowled" 
                value={player.oversBowled} 
                icon={<FaClock />} 
            />
            <Card 
                title="Runs Conceded" 
                value={player.runsConceded} 
                icon={<FaShieldAlt />}
            />
        </div>
    );
}

export default PlayerStats;
