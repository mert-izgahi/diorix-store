import express from "express";
import cookieParser from "cookie-parser";
import { MONGODB_URI, PORT } from "./config";
import { logger } from "./lib/pino";

// Middelwares
import { loggerMiddleware } from "./middlewares/logger.middleware";
import { errorHandlerMiddleware } from "./middlewares/error-handler.middleware";
import { notFoundMiddleware } from "./middlewares/notfound.middleware";
import { BadRequestError } from "./utils/app-errors";
import { connectDb } from "./lib/mongoose";

const app = express();

// Base Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb" }));
app.use(cookieParser());

// Middlewares
app.use(loggerMiddleware);

// Routes
app.get("/api/health", (req, res) => {
    throw new BadRequestError();
    res.status(200).json({
        status: "Ok",
        message: "Server is running",
        result: {
            timestamp: Date.now()
        }
    });
});

// Error Handlers
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);



// Server entry point
app.listen(PORT, async () => {
    await connectDb(MONGODB_URI);
    logger.info(`Server started on port ${PORT}`);
})