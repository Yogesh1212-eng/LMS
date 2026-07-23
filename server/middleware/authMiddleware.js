import jwt from "jsonwebtoken";
const authMiddleware=(req,res,next)=>{
    try{
        let token;
        //check authorization header
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")

        ){
            token=req.headers.authorization.split(" ")[1];

        }
        //token not found
        if (!token){
            return res.status(401).json({
                success:false,
                message:"Unauthorized,No Token",

            });

        }
        //verify token
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        // save uswer data in request
        req.user=decoded;
        next();

    }catch(error){
        return res.status(401).json({
            success:false,
            message:"Invalid or Expired Token",

        });
    }
};

export default authMiddleware;