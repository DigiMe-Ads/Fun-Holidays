import Hero from "../Home/Hero";
import StatsBar from "../Home/StatsBar";
import DestinationsCollage from "../Home/DestinationCollage";
import AboutBanner from "../Home/AboutBanner";
import AboutDetails from "../Home/AboutDetails";
import TravelExperience from "../Home/TravelExperience";
import DestinationsRow from "../Home/DestinationsRow";
import Testimonials from "../Home/Testimonials";
import BlogSection from "../Home/BlogSection";
import CallToAction from "../Home/CallToAction";

const HomePage = () => {
  return (
    <main>
      <div >
        <Hero/>
        <StatsBar/>
        <DestinationsCollage/>
        <AboutBanner/>
        <AboutDetails/> 
        <TravelExperience/>
        <DestinationsRow/>
        <Testimonials/>
        <BlogSection/>
        <CallToAction/>
      </div>
    </main>
  );
};

export default HomePage;