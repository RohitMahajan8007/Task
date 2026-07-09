import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { createTask ,getAllTasks , getTaskById ,updateTask,deleteTask } from "../controllers/task.controller.js";

const taskRouter = Router();

taskRouter.post("/", authenticate, createTask);
taskRouter.get("/", authenticate, getAllTasks);
taskRouter.get("/:id", authenticate, getTaskById);
taskRouter.put("/:id", authenticate, updateTask);
taskRouter.delete("/:id", authenticate, deleteTask);

export default taskRouter;