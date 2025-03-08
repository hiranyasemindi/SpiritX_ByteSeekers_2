import { FaRunning, FaTrophy, FaClock, FaBasketballBall, FaChartLine } from 'react-icons/fa';
import { FaShieldAlt } from 'react-icons/fa'; 
import Card from './Card'; 

function PlayerStats() {
    return (
        <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card 
                title="Total Runs" 
                value="3456" 
                icon={<FaRunning />} 
                iconColor="blue-600" 
                bgColor="bg-blue-100" 
                textColor="blue-600"
            />
            <Card 
                title="Balls Faced" 
                value="1500" 
                icon={<FaBasketballBall />} 
                iconColor="green-600" 
                bgColor="bg-green-100" 
                textColor="green-600"
            />
            <Card 
                title="Innings Played" 
                value="56" 
                icon={<FaChartLine />} 
                iconColor="purple-600" 
                bgColor="bg-purple-100" 
                textColor="purple-600"
            />
            <Card 
                title="Wickets" 
                value="120" 
                icon={<FaTrophy />} 
                iconColor="yellow-600" 
                bgColor="bg-yellow-100" 
                textColor="yellow-600"
            />
            <Card 
                title="Overs Bowled" 
                value="350" 
                icon={<FaClock />} 
                iconColor="orange-600" 
                bgColor="bg-orange-100" 
                textColor="orange-600"
            />
            <Card 
                title="Runs Conceded" 
                value="1800" 
                icon={<FaShieldAlt />} 
                iconColor="red-600" 
                bgColor="bg-red-100" 
                textColor="red-600"
            />
        </div>
    );
}

export default PlayerStats;
