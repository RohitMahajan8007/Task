import { Router } from "express";
import { getMe, LoginController, logout, RegisterConroller } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const authRouter = Router();



authRouter.post("/register",RegisterConroller);
authRouter.post("/login",LoginController);
authRouter.get("/getme",authenticate,getMe);
authRouter.post("/logout",authenticate,logout);



export default authRouter;