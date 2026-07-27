import Course from "../models/Course.js";
import Lecture from "../models/Lecture.js";

export const createLecture = async (req, res) => {
    try{
        const {title, description, videoUrl, duration}=req.body;
        const { courseId }=req.params;

        if(!title || !description || !videoUrl){
            return res.status(400).json({
                success:false,
                message:"All Fields are required",

            });
        }
        const course=await Course.findById(courseId);

        if(!course){
            return res.status(404).json({
                success:false,
                message:"Course not found",
            });
        }

        const lecture = await Lecture.create({
            title,
            description,
            videoUrl,
            duration,
            course:courseId,

        });

        course.lectures.push(Lecture._id);
        await course.save();

        res.status(201).json({
            success:true,
            message:"Lecture Created Successfully",
            lecture,
        });

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }

};

export const getCourseLectures = async (req, res) => {
    try{
        const {courseId}=req.params;

        const course = await Course.findById(courseId).populate("lectures");
        if (!course){
            return res.status(404).json({
                success:false,
                message:"Course not found",
            });
        }

        res.status(200).json({
            success:true,
            count:course.lectures.length,
            lectures: course.lectures,
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }

};

export const getLectureById = async (req, res) => {
    try {
        const { id } = req.params;

        const lecture = await Lecture.findById(id);

        if (!lecture) {
            return res.status(404).json({
                success: false,
                message: "Lecture not found",
            });
        }

        res.status(200).json({
            success: true,
            lecture,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateLecture = async (req, res) => {
    try {
    const { id } = req.params;

    const lecture = await Lecture.findById(id);

    if (!lecture) {
        return res.status(404).json({
        success: false,
        message: "Lecture not found",
        });
    }

    const updatedLecture = await Lecture.findByIdAndUpdate(
        id,
        req.body,
        {
        new: true,
        runValidators: true,
        }
    );

    res.status(200).json({
        success: true,
        message: "Lecture Updated Successfully",
        lecture: updatedLecture,
    });

} catch (error) {
    res.status(500).json({
        success: false,
        message: error.message,
    });
    }
};

export const deleteLecture = async (req, res) => {
    try {
    const { id } = req.params;

    const lecture = await Lecture.findById(id);

    if (!lecture) {
        return res.status(404).json({
        success: false,
        message: "Lecture not found",
        });
    }

    await Lecture.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: "Lecture Deleted Successfully",
    });

    } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message,
    });
    }  
};