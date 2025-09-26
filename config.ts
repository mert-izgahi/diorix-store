import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, ".env") });


export const PORT = process.env.PORT || 5001;
export const LOG_LEVEL = process.env.LOG_LEVEL || "info";
export const HOSTNAME = process.env.HOSTNAME || "localhost";

export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce";

export const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d"; 