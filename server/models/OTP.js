import mongoose from "mongoose";


const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,

    },
    otp:{
        type:String,
        required:true,
        
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:300, //otp expires after 5 min
    },

},
{
    timestamps:true,
}
);

const OTP =mongoose.model("OTP",otpSchema);

export default OTP;
