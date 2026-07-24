import OTP from "../models/OTP.js";
import otpGenerator from "otp-generator";
import mailSender from "../config/mailSender.js";

export const sendOTP= async(req,res)=>{
    try{
        const{email}=req.body;

        //check email
        if (!email){
            return res.status(400).json({
                success:false,
                message:"Email is required",


            });
        }
        //generate 6 digit otp
        const otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });

        //save otp in database
        await OTP.create({
            email,
            otp,
        });
        //send email
        await mailSender(
            email,
            "LMS Email Verification OTP",
            `
            <h2>Email Verification</h2>
            <p>Your OTP is : </p>
            <h1>${otp}</h1>
            <p>This OTP is valid for 5 minutes.</p>

            `
        );
        res.status(200).json({
            success:true,
            message:"OTP Sent Successfully",


        });

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,

        });
    }

};

