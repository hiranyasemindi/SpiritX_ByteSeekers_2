export const validateLogin = (email, password) => {
    const errors = {};

    if (!email.trim()) {
        errors.email = "Email is required";
    }

    if (!password) {
        errors.password = "Password is required";
    }

    return errors;
};

export const validatePlayer = (data) => {
    const errors = {};

    // Check for required fields first
    if (!data.playerName.trim()) {
        errors.playerName = "Player name is required";
    }

    if (!data.university) {
        errors.university = "University is required";
    }

    if (!data.category) {
        errors.category = "Category is required";
    }

    // Check if the numeric fields are positive numbers if required fields are valid
    if (data.totalRuns && data.totalRuns < 0) {
        errors.totalRuns = "Total Runs must be a positive number";
    } else if (!data.totalRuns) {
        errors.totalRuns = "Total Runs is required";
    }

    if (data.ballsFaced && data.ballsFaced < 0) {
        errors.ballsFaced = "Balls Faced must be a positive number";
    } else if (!data.ballsFaced) {
        errors.ballsFaced = "Balls Faced is required";
    }

    if (data.inningsPlayed && data.inningsPlayed < 0) {
        errors.inningsPlayed = "Innings Played must be a positive number";
    } else if (!data.inningsPlayed) {
        errors.inningsPlayed = "Innings Played is required";
    }

    if (data.wickets && data.wickets < 0) {
        errors.wickets = "Wickets must be a positive number";
    } else if (!data.wickets) {
        errors.wickets = "Wickets are required";
    }

    if (data.oversBowled && data.oversBowled < 0) {
        errors.oversBowled = "Overs Bowled must be a positive number";
    } else if (!data.oversBowled) {
        errors.oversBowled = "Overs Bowled is required";
    }

    if (data.runsConceded && data.runsConceded < 0) {
        errors.runsConceded = "Runs Conceded must be a positive number";
    } else if (!data.runsConceded) {
        errors.runsConceded = "Runs Conceded is required";
    }

    return errors;
};

