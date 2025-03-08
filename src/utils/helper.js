function calculateBattingStrikeRate(totalRuns, totalBallsFaced) {
    return (totalRuns / totalBallsFaced) * 100;
}

function calculateBattingAverage(totalRuns, inningsPlayed) {
    return totalRuns / inningsPlayed;
}

function calculateBowlingStrikeRate(totalBallsBowled, totalWicketsTaken) {
    return totalBallsBowled / totalWicketsTaken;
}

function calculateEconomyRate(totalRunsConceded, totalBallsBowled) {
    return (totalRunsConceded / (totalBallsBowled*6)) * 6;
}

function calculatePlayerPoints(battingStrikeRate, battingAverage, bowlingStrikeRate, economyRate) {
    const battingPoints = (battingStrikeRate / 5) + (battingAverage * 0.8);
    const bowlingPoints = (500 / bowlingStrikeRate) + (140 / economyRate);
    return battingPoints + bowlingPoints;
}

function calculatePlayerValue(points) {
    const value = (9 * points + 100) * 1000;
    return Math.round(value / 50000) * 50000;
}

module.exports = {
    calculateBattingStrikeRate,
    calculateBattingAverage,
    calculateBowlingStrikeRate,
    calculateEconomyRate,
    calculatePlayerPoints,
    calculatePlayerValue
};