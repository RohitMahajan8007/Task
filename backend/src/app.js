import express from "express";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.route.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))

app.use("/api/auth",authRouter);
app.use("/api/tasks",taskRouter);

app.use(express.static(path.join(__dirname, "../public")));


app.get("/*splat", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"));
});

export default app;