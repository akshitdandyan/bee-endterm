import express from "express";
import cors from "cors";
import { ADMIN_APP_URL, FRONTEND_APP_URL, PORT } from "./@configs/envs.js";

import userAuthRouter from "./routes/clientAuth.js";
import { connecDatabase, dbFixes } from "./@configs/db.js";
import { attachUser, blockForUnauthenticated } from "./@configs/middleware.js";
import subjectRouter from "./routes/clientDashboard/subject.js";
import fileRouter from "./routes/clientDashboard/files.js";
import eventsRouter from "./routes/clientDashboard/events.js";
import timetableRouter from "./routes/clientDashboard/timetable.js";
import profileRouter from "./routes/clientDashboard/profile.js";
import overviewRouter from "./routes/clientDashboard/overview.js";
import adminRouter from "./routes/adminRoutes/index.js";
import { sendFeedback } from "./@configs/telegram.js";

const app = express();

app.disable("x-powered-by");

app.use(
    express.json({
        limit: "50mb",
    })
);

app.use(express.urlencoded({ limit: "50mb", extended: true }));

const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://8cc7-180-94-34-135.in.ngrok.io", // "http://127.0.0.1:3000",
    // "http://127.0.0.1:3001",
    "https://web.whatsapp.com",
    FRONTEND_APP_URL,
    ADMIN_APP_URL,
];

app.use(
    cors({
        origin: function (origin, callback) {
            return callback(null, true);
            // return callback(null, true);
            // allow requests with no origin
            // (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                var msg =
                    "The CORS policy for this site does not " +
                    "allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
    })
);

app.use((req, res, next) => {
    console.log(`⬇️ ${new Date().toLocaleString()} [${req.method}] ${req.url}`);
    next();
});

// app.use(async (req, res, next) => {
//     await applyRateLimit(req, res);
//     next();
// });

app.use("/user", userAuthRouter);
app.use("/dashboard", attachUser, blockForUnauthenticated, overviewRouter);
app.use("/dashboard", attachUser, blockForUnauthenticated, subjectRouter);
app.use("/dashboard", attachUser, blockForUnauthenticated, fileRouter);
app.use("/dashboard", attachUser, blockForUnauthenticated, eventsRouter);
app.use("/dashboard", attachUser, blockForUnauthenticated, timetableRouter);
app.use("/dashboard", attachUser, blockForUnauthenticated, profileRouter);

app.use("/control", adminRouter);

// open apis
app.post("/api/v1/contact", async (req, res) => {
    const { success } = await sendFeedback(req.body.message);
    if (success) {
        res.status(200).json({
            success: true,
            message: "Feedback sent successfully",
        });
    } else {
        res.status(200).json({
            success: false,
            message:
                "Woops! Not sent, please contact via email 🥹: info.csecrew@gmail.com",
        });
    }
});

(async () => {
    await connecDatabase();
    await dbFixes();
    app.listen(PORT, () => {
        console.log("🌟Crew v2 server listening on port " + PORT);
    });
})();
