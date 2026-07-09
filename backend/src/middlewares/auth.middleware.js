import jwt from "jsonwebtoken";
import userModel from "../models/auth.model.js";
import { config } from "../config/config.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "unauthorized access",
      });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = await userModel.findById(decoded.id)

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "unauthorized access",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};