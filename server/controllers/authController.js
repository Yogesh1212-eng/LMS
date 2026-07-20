import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
    try {
    const { name, email, password, role } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
        return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
        });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({
        success: false,
        message: "User already exists",
        });
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password:hashedPassword,
        role,
    });

    res.status(201).json({
        success: true,
        message: "User Registered Successfully",
        user,
    });

    } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message,
    });
    }
};