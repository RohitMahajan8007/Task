import userModel from "../models/auth.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "../config/config.js";


async function sendTokenResponse(user, res, message) {

    const token = jwt.sign({
        id: user._id
    }, config.JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie("token", token);

    res.status(200).json({
        message: message, 
        success: true,     
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
    })
}



export const RegisterConroller = async (req, res) => {
    const { username, email, password } = req.body;
    try {

        const existingUser = await userModel.findOne({
            $or: [
                { email },
            ]
        })

        if (existingUser) {
            return res.status(409).json({
                message: "invalid credentials"
            })
        }

        const hash = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            username, email, password: hash,
        })

        res.status(201).json({
            success: true,
            message: "User Register Successfully....",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });


    } catch (error) {
        res.status(500).json({
            message: error.message || "Failed to Register user"
        })
    }
}

export const LoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        if (!user.password) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        const isPassword = await bcrypt.compare(password, user.password);

        if (!isPassword) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        await sendTokenResponse(user, res, "User Login Successfully.....")

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message || "Failed to login.",
        });
    }
}

export const getMe = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            user: req.user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};

export const logout = (req, res) => {
    res.clearCookie("token");

    return res.status(200).json({
        success: true,
        message: "Logout successful",
    })
}