import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import FeaturedCourses from "../components/home/FeaturedCourses";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Categories from "../components/home/Categories";
import Testimonials from "../components/home/Testimonials";

function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Categories />
      <FeaturedCourses />
      <WhyChooseUs />
      <Testimonials />

    </>
  );
}

export default Home;