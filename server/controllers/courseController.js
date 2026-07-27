import Course from "../models/Course.js";
import Lecture from "../models/Lecture.js";
import cloudinary from "../config/cloudinary.js";

export const createCourse = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    if (!title || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    let thumbnailUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "LMS/Courses",
      });

      thumbnailUrl = result.secure_url;
    }

    const course = await Course.create({
      title,
      description,
      price,
      category,
      thumbnail: thumbnailUrl,
      teacher: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Course Created Successfully",
      course,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL COURSES =================
export const getAllCourses = async (req, res) => {
  try {
    const { keyword, category, minPrice, maxPrice } = req.query;

    const filter = {};

    if (keyword) {
      filter.title = { $regex: keyword, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const courses = await Course.find(filter)
      .populate("teacher", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: courses.length,
      courses,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET SINGLE COURSE =================
export const getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "teacher",
      "name email role"
    );

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


// ================= UPDATE COURSE =================
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;

    let course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Ownership Check
    if (
      course.teacher.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this course",
      });
    }

    const updateData = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
    };

    // New Thumbnail Upload
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "LMS/Courses",
      });

      updateData.thumbnail = result.secure_url;
    }

    course = await Course.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Course Updated Successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= DELETE COURSE =================
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    await course.deleteOne();

    res.status(200).json({
        success: true,
        message: "Course deleted Successfully",
    });
    } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message,
    });
    }
};