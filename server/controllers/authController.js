import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

    
    const hashedPassword = await bcrypt.hash(password, 10);
// Create new user
    const user = await User.create({
        name,
        email,
        password:hashedPassword,
        role,
    });
    const token = jwt.sign(
    {
    id: user._id,
    role: user.role,
    },
        process.env.JWT_SECRET,
    {
        expiresIn:process.env.JWT_EXPIRE,
    }
);
    const userResponse = user.toObject();
    delete userResponse.password;
    res.status(201).json({
    success: true,
    message: "User Registered Successfully",
    token,
    user:userResponse,
});

    } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message,
    });
    }
};

export const loginUser = async (req, res) => {
    try {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
        success: false,
        message: "Email and Password are required",
        });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({
        success: false,
        message: "User not found",
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({
        success: false,
        message: "Invalid Password",
        });
    }

    const token = jwt.sign(
        {
        id: user._id,
        role: user.role,
        },
        
            process.env.JWT_SECRET,
        {
        expiresIn:process.env.JWT_EXPIRE,
        }
    );
    const userResponse = user.toObject();
    delete userResponse.password;
    res.status(200).json({
        success: true,
        message: "Login Successful",
        token,
        user:userResponse,
    });

    } catch (error) {

    res.status(500).json({
        success: false,
        message: error.message,
    });

    }
};

export const getProfile=async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).select("-password");

        if (!user){
            return res.status(404).json({
                success:false,
                message:"User not found",
            });
        }
        res.status(200).json({
            success:true,
            user,
        });

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

export const adminDashboard= async (req,res)=>{
    res.status(200).json({
        success:true,
        message:"Welcome Admin",
    });
};
