export const Message = {
    AUTH: {
        ACCESS_DENIED : "Access denied: token not found.",
        INVALID_TOKEN : "Token is invalid or expired.",
        LOGIN_FAILED : "Invalid login credentials.",
        EMAIL_EXISTS : "User with this email already exists.",
    },
    PERMISSIONS: {
        FORBIDDEN : "Access denied: insufficient permissions.",
    },
    USER : {
        NOT_FOUND : "User not found.",
        CREATED : "User successfully registered!",
        LOGGED_IN : "User successfully logged in!",
        REG_FAILED : "Registration failed.",

    },
    NEWS : {
        CREATED : "News post created successfully.",
        BREAKING_EXISTS : "There is already an active BREAKING NEWS.",
        CREATION_FAILED : "Error creating a new post.",
        FAIL : "Your request couldn't be done. Please try again!",
        SUCCESS: "Your request has been processed successfully!"
    },
    GENERAL: {
        SERVER_ERROR : "Something went wrong. Please try again.",
    },
    DB: {
        CONNECTION_ERROR : "Connection error.",
        CONNECTED : "Successfully connected to database!",
    },
};

