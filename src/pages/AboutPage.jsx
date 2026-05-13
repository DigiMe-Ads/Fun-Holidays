import PageHero from "../common/PageHero";
import AboutStory from "../about/AboutStory";
import TravelGuides from "../about/TravelGuide";
import WhyChooseUs from "../about/WhyChooseUs";
import CommonCallToAction from "../common/CommonCallToAction";

const AboutPage = () => {
  return (
    <>
      <PageHero
        title="About Us"
        image="/images/about/hero.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
      />
      <AboutStory />
      <TravelGuides />
        <WhyChooseUs />
        <CommonCallToAction />
    </>
  );
};

export default AboutPage;