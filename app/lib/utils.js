import mongoose from "mongoose";

export const connectToDB = async () => {
    if (mongoose.connection.readyState === 1) {
        console.log("Using existing database connection");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to database");
    } catch (error) {
        console.error("Error connecting to database:", error);
        throw new Error("Database connection failed");
    }
}