function TeamDetails({ budget, teamName, teamLength, isCompleted , points}) {
    return (
        <div className=" pb-3">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center md:items-start justify-between">
                <div className="flex flex-col space-y-2 w-full md:w-2/3 text-center md:text-left">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex flex-col md:flex-row items-center md:items-center">
                        <span>Team Name: {teamName}</span>
                        {isCompleted && (
                            <span className="bg-primary ms-3 text-white px-3 py-1 text-sm font-medium rounded-full mr-2">
                                {points} points
                            </span>)}
                    </h2>
                    <p className="text-gray-600">
                        Budget Remaining: <span className="text-primary text-lg font-semibold">LKR {budget}.00</span>
                    </p>
                    <p className="text-gray-600">Total Players: {teamLength} / 11</p>
                </div>
                <div className="flex justify-center md:justify-end w-full md:w-1/3 mt-4 md:mt-0">
                    <img src="/images/player-avatar.png" alt="Player Avatar" className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover" />
                </div>
            </div>
        </div>
    )
}

export default TeamDetails
