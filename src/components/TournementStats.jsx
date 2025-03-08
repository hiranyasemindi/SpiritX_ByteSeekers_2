import { MdOutlineSportsCricket } from 'react-icons/md';
import Card from './Card';
import { FaRunning, FaMedal, FaTrophy } from 'react-icons/fa';

function Tournament() {
    return (
        <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card 
                icon={<FaRunning />} 
                title="Overall Runs" 
                value="3456" 
            />

            <Card 
                icon={<MdOutlineSportsCricket />} 
                title="Overall Wickets" 
                value="120" 
            />

            <Card 
                icon={<FaMedal />} 
                title="Highest Run Scorer" 
                value="Ravi Sharma" 
            />

            <Card 
                icon={<FaTrophy />} 
                title="Highest Wicket Taker" 
                value="Ajay Kumar" 
            />
        </div>
    );
}

export default Tournament;
