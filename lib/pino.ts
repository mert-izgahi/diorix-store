import pino from "pino";
import dayjs from "dayjs";
import fs from "fs";
import path from "path";
import { HOSTNAME, LOG_LEVEL } from "../config";

//  Select logs folder path
const logDir = path.join(__dirname, "..", "logs");

if (!fs.existsSync(logDir)) {
    console.log("Failed to create log directory");
    fs.mkdirSync(logDir);
}


export const logger = pino({
    level: LOG_LEVEL || "info",
    transport: {
        targets: [
            {
                target: "pino-pretty",
                options: {
                    colorize: true,
                    translateTime: "SYS:HH:MM:ss",
                    ignore: "pid,hostname",
                }
            },
            {
                target: "pino/file",
                options: {
                    destination: path.join(logDir, "app.log"),
                }
            }
        ]
    },
    base: {
        pid: process.pid,
        hostname: HOSTNAME || "localhost"
    },
    timestamp: () => `,"time":"${dayjs().format("YYYY-MM-DD HH:mm:ss")}"`
});