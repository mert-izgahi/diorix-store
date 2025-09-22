import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config";

const app = express();

// Base Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb" }));
app.use(cookieParser());


// Routes
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello from server!"
    });
})


// Server entry point
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})