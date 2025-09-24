import mongoose from "mongoose";
import { logger } from "./pino";

export const connectDb = async (connectionString: string) => {
    try {
        const conn = await mongoose.connect(connectionString);
        logger.info(`Connected to MongoDB ${conn.connection.host}`);
    } catch (err: any) {
        logger.error("Error connecting to MongoDB", err.message);
    }
}

