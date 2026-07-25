import Course from "../models/Course.js";

export const createCourse=async(req,res)=>{
    try{
        const {title, description, price, category,thumbnail}= req.body;
        if (!title || !description || !price || !category){
            return res.status(400).json({
                success:false,
                message:"Please fill all required fields",

            });
            
        }
        const course=await Course.create({
            title,
            description,
            price,
            category,
            thumbnail,
            teacher:req.user.id,
        });

        res.status(201).json({
            success:true,
            message:"Course Created Successfully",
            course,

        });

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }

};

export const getAllCourses= async(req,res)=>{
    try{
        const courses = await Course.find()
        .populate("teacher","name email role")
        .sort({createdAt:-1});

        res.status(200).json({
            success:true,
            count:courses.length,
            courses,
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};

export const getSingleCourse = async (req, res) => {
    try {
    const course = await Course.findById(req.params.id)
        .populate("teacher", "name email role");

    if (!course) {
        return res.status(404).json({
        success: false,
        message: "Course not found",
        });
    }

    res.status(200).json({
        success: true,
        course,
    });

    } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message,
    });
    }
};
