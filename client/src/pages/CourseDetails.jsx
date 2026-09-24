import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { enrollCourse } from "../services/enrollmentService";
import { toast } from "react-hot-toast";
import { addReview } from "../services/reviewService";
import {
  Star,
  BookOpen,
  IndianRupee,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  ArrowRight,
  User,
} from "lucide-react";

function CourseDetails() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    loadCourse();
    loadReviews();
  }, [id]);

  async function loadCourse() {
    try {
      const res = await api.get(`/course/${id}`);
      setCourse(res.data.course);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load course");
    }
  }

  async function loadReviews() {
    try {
      const res = await api.get(`/review/${id}`);
      setReviews(res.data.reviews || []);
    } catch (err) {
      console.log(err);
    }
  }

  const handleEnroll = async () => {
    try {
      const res = await enrollCourse(course._id);
      toast.success(res.message || "Enrolled Successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Enrollment Failed"
      );
    }
  };

  const handleReview = async () => {
    try {
      await addReview(course._id, {
        rating,
        comment,
      });

      toast.success("Review Added");
      setRating(5);
      setComment("");

      loadCourse();
      loadReviews();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Review Failed"
      );
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-[#070A12] flex justify-center items-center text-slate-400 text-lg">
        Loading track details...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#070A12] py-12 sm:py-16 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Course Media Card */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.6)] bg-slate-950">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-72 sm:h-[420px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-slate-950/40 to-transparent pointer-events-none" />

          <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>Interactive Program</span>
          </div>
        </div>

        {/* Course Overview */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8">
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {course.title}
            </h1>

            <p className="text-slate-300 mt-5 text-base sm:text-lg leading-relaxed font-normal">
              {course.description}
            </p>

            {/* Quick Metrics Bar */}
            <div className="mt-8 flex flex-wrap items-center gap-6 pt-6 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                </div>
                <span className="text-white font-bold text-lg">
                  {(course.averageRating || 0).toFixed(1)}
                </span>
                <span className="text-slate-500 text-sm">
                  ({course.totalReviews || 0} reviews)
                </span>
              </div>

              <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />

              <div className="text-slate-400 text-sm">
                Category: <span className="text-slate-200 font-semibold">{course.category || "Technology"}</span>
              </div>
            </div>
          </div>

          {/* Pricing & Enrollment Sticky Card */}
          <div className="lg:col-span-4 bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-slate-800 rounded-3xl p-6 sm:p-7 backdrop-blur-xl shadow-2xl">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
              Tuition Fee
            </span>
            <div className="flex items-center gap-1 text-emerald-400 font-black text-4xl mt-1 tracking-tight">
              <IndianRupee className="w-8 h-8" />
              <span>{course.price}</span>
            </div>

            <button
              onClick={handleEnroll}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-4 rounded-xl shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:-translate-y-0.5 transition cursor-pointer"
            >
              <span>Enroll Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <ul className="mt-6 space-y-2.5 text-xs text-slate-400 border-t border-slate-800/80 pt-5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Full Lifetime Access</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Verified Completion Certificate</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Direct Access to Instructor</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Write a Review Card */}
        <div className="mt-16 bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Write a Review
              </h2>
              <p className="text-xs text-slate-400">Share your learning feedback with the community</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Rating
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full sm:w-60 bg-slate-950/80 border border-slate-800 text-amber-400 p-3 rounded-xl focus:outline-none focus:border-blue-600 transition text-sm font-semibold cursor-pointer"
              >
                <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                <option value="4">⭐⭐⭐⭐ (4/5)</option>
                <option value="3">⭐⭐⭐ (3/5)</option>
                <option value="2">⭐⭐ (2/5)</option>
                <option value="1">⭐ (1/5)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Your Comments
              </label>
              <textarea
                rows="4"
                placeholder="What did you think of the pace, exercises, and mentorship?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-600 transition text-sm"
              />
            </div>

            <button
              onClick={handleReview}
              className="bg-blue-700 hover:bg-blue-600 text-white font-semibold px-7 py-3 rounded-xl shadow-md transition cursor-pointer text-sm"
            >
              Submit Review
            </button>
          </div>
        </div>

        {/* Reviews Stack */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-800">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Student Reviews
            </h2>
            <span className="text-xs font-semibold text-blue-400 bg-blue-950/60 border border-blue-800/60 px-3 py-1 rounded-full">
              {reviews.length} Feedbacks
            </span>
          </div>

          {reviews.length === 0 ? (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-sm">
              No reviews yet. Be the first learner to leave feedback!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-gradient-to-b from-slate-900/80 to-slate-950/90 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-blue-700 text-white font-bold text-xs flex items-center justify-center">
                          {review.student?.name ? review.student.name.charAt(0).toUpperCase() : "S"}
                        </div>
                        <h3 className="font-bold text-white text-sm">
                          {review.student?.name || "Verified Student"}
                        </h3>
                      </div>

                      <span className="text-amber-400 text-xs font-bold bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                        ⭐ {review.rating}/5
                      </span>
                    </div>

                    <p className="text-slate-300 mt-4 text-sm leading-relaxed">
                      "{review.comment}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

export default CourseDetails;