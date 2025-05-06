export const mongoErrorHandler = (error: any) => {
    if (error.name === "MongoServerError") {
        if (error.code === 11000) {
            return new Error("Duplicate key error");
        }
        return new Error("MongoDB server error");
    } else if (error.name === "ValidationError") {
        return new Error("Validation error");
    } else if (error.name === "CastError") {
        return new Error("Invalid ObjectId");
    }
    return new Error("Unknown error");
}