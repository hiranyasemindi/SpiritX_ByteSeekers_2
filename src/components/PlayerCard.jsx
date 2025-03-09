import { MdPerson } from "react-icons/md";

function PlayerCard({ player }) {
    return (
        <div className="bg-white p-4 rounded-xl shadow-lg border-l-4 border-primary hover:scale-105 transition transform duration-300">
            <div className="flex items-center gap-3">
                <MdPerson className="text-primary text-3xl" />
                <div>
                    <h2 className="text-lg font-bold">{player.playerName}</h2>
                    <p className="text-sm text-gray-600">{player.category}</p>
                </div>
            </div>
            <div className="mt-3 text-right text-lg font-semibold text-gray-800">
                LKR {player.playerValue}.00
            </div>
            
        </div>
    );
}

export default PlayerCard;