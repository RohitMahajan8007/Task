import express from "express";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.route.js";
import cors from "cors";




const app = express();

app.use(express.json());
app.use(cookieParser());
const allowedOrigin = process.env.FRONTEND_URL 
    ? process.env.FRONTEND_URL.replace(/\/$/, "") 
    : "http://localhost:5173";

app.use(cors({
    origin : allowedOrigin,
    credentials : true
}))

app.use("/api/auth",authRouter);
app.use("/api/tasks",taskRouter);

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Server is healthy",
       
    });
});




export default app;