import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import {
  markLectureComplete,
  getProgress,
} from "../../services/progressService";

function Learning() {

  const { id } = useParams();

  const [lectures, setLectures] = useState([]);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchLectures();
    fetchProgress();
  }, [id]);


  const fetchLectures = async () => {

    try {

      const res = await api.get(`/lecture/${id}`);

      setLectures(res.data.lectures);

      if(res.data.lectures.length > 0){
        setCurrentLecture(res.data.lectures[0]);
      }

    } catch(err){
      console.log(err);
    }

  };
  const fetchProgress = async () => {
  try {
    const res = await getProgress(id);
    setProgress(res.progress.percentage);
  } catch (err) {
    console.log(err);
  }
};


  return (

    <section className="min-h-screen bg-[#0B1120] text-white p-10">

      <div className="mb-8">

  <h2 className="text-xl font-bold mb-2">
    Course Progress
  </h2>

  <div className="w-full bg-slate-700 rounded-full h-5">

    <div
      style={{
        width: `${progress}%`,
      }}
      className="bg-green-500 h-5 rounded-full"
    />

  </div>

  <p className="mt-2">
    {progress}% Completed
  </p>

</div>


      <div className="grid grid-cols-3 gap-6">


        {/* Lecture List */}

        <div className="bg-slate-900 p-5 rounded-xl">

          <h2 className="text-2xl font-bold mb-5">
            Lectures
          </h2>


          {
            lectures.map((lecture)=>(

              <button
                key={lecture._id}
                onClick={()=>setCurrentLecture(lecture)}
                className="block w-full text-left bg-slate-800 p-3 rounded-lg mb-3"
              >

                {lecture.title}

              </button>

            ))
          }


        </div>



        {/* Video Section */}

        <div className="col-span-2 bg-slate-900 p-6 rounded-xl">


        {
          currentLecture && (

            <>

            <h1 className="text-3xl font-bold mb-5">
              {currentLecture.title}
            </h1>


            <video
              src={currentLecture.videoUrl}
              controls
              className="w-full rounded-xl"
            />


            <p className="mt-5 text-slate-300">
              {currentLecture.description}
            </p>

          <button
  onClick={async () => {
    try {
      await markLectureComplete(currentLecture._id);

      await fetchProgress();

      alert("Lecture Completed");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  }}
  className="mt-5 bg-green-600 hover:bg-green-500 px-6 py-3 rounded-lg"
>
  ✓ Mark as Complete
</button>
              



            </>

          )
        }


        </div>


      </div>


    </section>

  );

}


export default Learning;