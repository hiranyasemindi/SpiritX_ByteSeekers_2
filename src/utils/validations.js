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

export const userValidateSignup = (username, password, confirmPassword) => {
    const errors = {};

    // Username validations
    if (!username) {
        errors.username = 'Username is required';
    } else if (username.length > 12) {
        errors.username = 'Username must be 12 characters or less';
    }

    // Password validations
    if (!password) {
        errors.password = 'Password is required';
    } else if (password.length < 6) {
        errors.password = 'Password must be 6 or more characters';
    } else {
        // Check for at least one lowercase letter
        const hasLowercase = /[a-z]/.test(password);
        // Check for at least one uppercase letter
        const hasUppercase = /[A-Z]/.test(password);
        // Check for at least one number
        const hasNumber = /\d/.test(password);
        // Check for at least one special character
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

        if (!hasLowercase) {
            errors.password = 'Password must contain at least one lowercase letter';
        } else if (!hasUppercase) {
            errors.password = 'Password must contain at least one uppercase letter';
        } else if (!hasNumber) {
            errors.password = 'Password must contain at least one number';
        } else if (!hasSpecialChar) {
            errors.password = 'Password must contain at least one special character';
        }
    }

    // Confirm Password validations
    if (!confirmPassword) {
        errors.confirmPassword = 'Confirm Password is required';
    } else if (confirmPassword !== password) {
        errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
};


export const validatePlayer = (data) => {
    const errors = {};
    if (!data.playerName.trim()) {
        errors.playerName = "Player name is required";
    }

    if (!data.university) {
        errors.university = "University is required";
    }

    if (!data.category) {
        errors.category = "Category is required";
    }

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

