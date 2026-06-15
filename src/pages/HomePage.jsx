import Hero from "../Home/Hero";
import StatsBar from "../Home/StatsBar";
import DestinationsCollage from "../Home/DestinationCollage";
import AboutBanner from "../Home/AboutBanner";
import AboutDetails from "../Home/AboutDetails";
import TravelExperience from "../Home/TravelExperience";
import DestinationsRow from "../Home/DestinationsRow";
import TourPackages from "../tours/TourPackages";
import Testimonials from "../Home/Testimonials";
import BlogSection from "../Home/BlogSection";
import CallToAction from "../Home/CallToAction";
import FeaturedCallouts from "../Home/FeaturedCallOuts";
import MiceGallery from "../components/mice/MiceGallery";
import MiceTestimonials from "../components/mice/MiceTestimonials";

const HomePage = () => {
  return (
    <main>
      <div >
        <Hero/>
        {/* <StatsBar/> */}
        <FeaturedCallouts/>
        <DestinationsCollage/>
        <AboutBanner/>
        <AboutDetails/> 
        <TravelExperience/>
        {/* <DestinationsRow/> */}
        <TourPackages />
        <MiceGallery/>
        <MiceTestimonials/>
        {/* <Testimonials/> */}
        <BlogSection/>
        <CallToAction/>
      </div>
    </main>
  );
};

export default HomePage;