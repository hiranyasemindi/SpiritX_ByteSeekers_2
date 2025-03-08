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
