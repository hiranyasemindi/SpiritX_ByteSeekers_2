import React from "react";

function SelectPlayersTable({
    currentPlayers,
    totalPages,
    currentPage,
    onAddPlayer,
    handlePageChange
}) {

    const renderPagination = () => {
        const paginationButtons = [];
        const maxPagesToShow = 5;
        let startPage, endPage;

        if (totalPages <= maxPagesToShow) {
            startPage = 1;
            endPage = totalPages;
        } else {
            const halfMaxPages = Math.floor(maxPagesToShow / 2);
            if (currentPage <= halfMaxPages) {
                startPage = 1;
                endPage = maxPagesToShow;
            } else if (currentPage + halfMaxPages >= totalPages) {
                startPage = totalPages - maxPagesToShow + 1;
                endPage = totalPages;
            } else {
                startPage = currentPage - halfMaxPages;
                endPage = currentPage + halfMaxPages;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            paginationButtons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-4 py-2 mx-1 border rounded-md ${currentPage === i ? "bg-primary text-white" : "bg-white"}`}
                >
                    {i}
                </button>
            );
        }

        if (startPage > 1) {
            paginationButtons.unshift(
                <span key="start-ellipsis" className="px-4 py-2 mx-1">...</span>
            );
        }

        if (endPage < totalPages) {
            paginationButtons.push(
                <span key="end-ellipsis" className="px-4 py-2 mx-1">...</span>
            );
        }

        return paginationButtons;
    };

    return (
        <div>
            <table className="min-w-full bg-white border border-gray-300 shadow-lg">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-left">Player Name</th>
                        <th className="py-2 px-4 border-b text-left">University</th>
                        <th className="py-2 px-4 border-b text-left">Budget</th>
                        <th className="py-2 px-4 border-b text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPlayers.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="py-2 px-4 border-b text-center">No players available.</td>
                        </tr>
                    ) : (
                        currentPlayers.map((player) => (
                            <tr key={player.id}>
                                <td className="py-2 px-4 border-b">{player.playerName}</td>
                                <td className="py-2 px-4 border-b">{player.university}</td>
                                <td className="py-2 px-4 border-b">LKR {player.playerValue} .00</td>
                                <td className="py-2 px-4 border-b" onClick={() => onAddPlayer(player.key)}>
                                    <button className="text-green-500 hover:text-green-700">Add</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {totalPages > 1 && (
                <div className="flex justify-center mt-4">{renderPagination()}</div>
            )}
        </div>
    );
}

export default SelectPlayersTable;
