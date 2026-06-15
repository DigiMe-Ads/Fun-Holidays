import PageHero from "../common/PageHero";
import AboutStory from "../about/AboutStory";
import TravelGuides from "../about/TravelGuide";
import WhyChooseUs from "../about/WhyChooseUs";
import CommonCallToAction from "../common/CommonCallToAction";
import AboutCTA from "../about/AboutCTA";

const AboutPage = () => {
  return (
    <>
      <PageHero
        title="About Us"
        image="/images/about/hero-3.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
      />
      <AboutStory />
      <TravelGuides />
        <WhyChooseUs />
        {/* <CommonCallToAction /> */}
        <AboutCTA />
    </>
  );
};

export default AboutPage;