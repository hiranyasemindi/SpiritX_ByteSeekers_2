function PlayerProfileCard() {
    return (
        <div className="max-w-7xl mx-auto px-6 pb-3">
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                <div className="flex flex-col space-y-2 w-2/3">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                        Player Name: John Doe
                        <span className="ml-3 inline-block px-3 py-1 text-sm font-semibold text-white bg-primary rounded-full">
                            Rank: A+
                        </span>
                    </h2>
                    <p className="text-gray-600">Category: All-rounder</p>
                    <p className="text-gray-600">University: XYZ University</p>
                    <p className="text-gray-600">Budget: <span className="text-primary text-lg font-semibold">LKR 9,000,000.00</span></p>
                </div>

                <div className="flex items-center justify-end ">
                    <img 
                        src="/img/player-avatar.png" 
                        alt="Player Avatar" 
                        className="w-24 h-24 rounded-full object-cover " 
                    />
                </div>
            </div>
        </div>
    );
}

export default PlayerProfileCard;
