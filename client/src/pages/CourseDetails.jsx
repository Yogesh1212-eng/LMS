import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { enrollCourse } from "../services/enrollmentService";
import { toast } from "react-hot-toast";
import { addReview } from "../services/reviewService";


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
      setReviews(res.data.reviews);
    } catch (err) {
      console.log(err);
    }
  }

  const handleEnroll = async () => {
    try {
      const res = await enrollCourse(course._id);
      toast.success(res.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Enrollment Failed"
      );
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex justify-center items-center text-white text-2xl">
        Loading...
      </div>
    );
  }

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


  return (
    <section className="min-h-screen bg-[#0B1120] py-16">
      <div className="max-w-6xl mx-auto px-6">

        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-[420px] object-cover rounded-2xl"
        />

        <div className="mt-8">

          <h1 className="text-5xl font-bold text-white">
            {course.title}
          </h1>

          <p className="text-slate-400 mt-6 text-lg leading-8">
            {course.description}
          </p>

          <div className="mt-8 flex items-center gap-8">
            <h2 className="text-cyan-400 text-3xl font-bold">
              ₹ {course.price}
            </h2>
          </div>

          <div className="mt-5">
            <h3 className="text-yellow-400 text-2xl font-bold">
              ⭐ {(course.averageRating || 0).toFixed(1)} / 5
            </h3>

            <p className="text-slate-400">
              {course.totalReviews || 0} Reviews
            </p>
          </div>

          <button
            onClick={handleEnroll}
            className="mt-10 bg-green-600 hover:bg-green-500 px-8 py-4 rounded-xl"
          >
            Enroll Now
          </button>

        </div>
        
        <div className="mt-14 bg-slate-800 rounded-xl p-6">

  <h2 className="text-2xl font-bold mb-5 text-white">
    Write a Review
  </h2>

  <select
    value={rating}
    onChange={(e) => setRating(e.target.value)}
    className="w-full bg-slate-700 p-3 rounded-lg mb-4"
  >

    <option value="5">⭐⭐⭐⭐⭐</option>

    <option value="4">⭐⭐⭐⭐</option>

    <option value="3">⭐⭐⭐</option>

    <option value="2">⭐⭐</option>

    <option value="1">⭐</option>

  </select>

  <textarea
    rows="4"
    placeholder="Write your review..."
    value={comment}
    onChange={(e) => setComment(e.target.value)}
    className="w-full bg-slate-700 rounded-lg p-4"
  />

  <button
    onClick={handleReview}
    className="mt-5 bg-indigo-600 hover:bg-indigo-500 px-8 py-3 rounded-lg"
  >
    Submit Review
  </button>

</div>

        {/* Reviews */}

        <div className="mt-16">

          <h2 className="text-3xl font-bold text-white mb-8">
            Student Reviews
          </h2>

          {reviews.length === 0 ? (

            <p className="text-slate-400">
              No Reviews Yet
            </p>

          ) : (

            reviews.map((review) => (

              <div
                key={review._id}
                className="bg-slate-800 rounded-xl p-5 mb-5"
              >

                <div className="flex justify-between">

                  <h3 className="font-bold text-lg text-white">
                    {review.student?.name}
                  </h3>

                  <span className="text-yellow-400">
                    ⭐ {review.rating}/5
                  </span>

                </div>

                <p className="text-slate-300 mt-3">
                  {review.comment}
                </p>

              </div>

            ))

          )}

        </div>

      </div>
    </section>
  );
}

export default CourseDetails;