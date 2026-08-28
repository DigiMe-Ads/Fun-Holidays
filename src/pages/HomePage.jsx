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
import useSEO from "../hooks/useSEO";

const HOME_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Fun Holidays",
  url: "https://www.funholidays.lk",
  description:
    "Fun Holidays — trusted Sri Lanka travel agency offering tailor-made holiday packages, wildlife safaris, cultural tours & MICE services.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.funholidays.lk/tours?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const HomePage = () => {
  useSEO({
    title: "Sri Lanka Holiday Packages & Tours | Fun Holidays",
    description:
      "Plan your perfect Sri Lanka holiday with Fun Holidays. Tailor-made tour packages, " +
      "wildlife safaris, beach getaways, honeymoon tours & MICE events. Expert guides. Book today.",
    keywords:
      "Sri Lanka holiday packages, Sri Lanka tour packages, best holidays in Sri Lanka, " +
      "tailor-made Sri Lanka tours, Sri Lanka travel agency, Sri Lanka wildlife safari, " +
      "MICE Sri Lanka, honeymoon Sri Lanka",
    canonical: "https://www.funholidays.lk/",
    schema: HOME_SCHEMA,
  });

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
