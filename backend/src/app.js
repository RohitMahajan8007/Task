import express from "express";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.route.js";
import cors from "cors";




const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))

app.use("/api/auth",authRouter);
app.use("/api/tasks",taskRouter);



export default app;