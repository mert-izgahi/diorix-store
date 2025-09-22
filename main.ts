import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config";
import { logger } from "./lib/pino";

// Middelwares
import { loggerMiddleware } from "./middlewares/logger.middleware";

const app = express();

// Base Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb" }));
app.use(cookieParser());

// Middlewares
app.use(loggerMiddleware);

// Routes
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello from server!"
    });
})


// Server entry point
app.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`);
})