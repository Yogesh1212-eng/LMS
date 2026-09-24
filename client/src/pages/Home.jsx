import React from "react";
import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import FeaturedCourses from "../components/home/FeaturedCourses";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Categories from "../components/home/Categories";
import Testimonials from "../components/home/Testimonials";

function Home() {
  return (
    <div className="w-full bg-[#070A12] selection:bg-blue-600/30 selection:text-blue-200">
      <Hero />
      <Stats />
      <Categories />
      <FeaturedCourses />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
}

export default Home;