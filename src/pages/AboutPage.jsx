import PageHero from "../common/PageHero";
import AboutStory from "../about/AboutStory";
import TravelGuides from "../about/TravelGuide";
import WhyChooseUs from "../about/WhyChooseUs";
import CommonCallToAction from "../common/CommonCallToAction";
import AboutCTA from "../about/AboutCTA";
import useSEO from "../hooks/useSEO";

const ABOUT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Fun Holidays | Trusted Sri Lanka Travel Agency",
  url: "https://www.funholidays.lk/about",
  description:
    "Learn about Fun Holidays — a trusted Sri Lanka travel agency with expert guides, " +
    "tailor-made holidays, wildlife tours & MICE services. Your Sri Lanka holiday starts here.",
  mainEntity: {
    "@type": "TravelAgency",
    name: "Fun Holidays",
    url: "https://www.funholidays.lk",
    description:
      "Fun Holidays is a trusted Sri Lanka travel agency specialising in tailor-made holiday " +
      "packages, wildlife safaris, cultural tours, beach getaways & MICE events.",
    foundingLocation: { "@type": "Place", name: "Marawila, Sri Lanka" },
    areaServed: { "@type": "Country", name: "Sri Lanka" },
  },
};

const AboutPage = () => {
  useSEO({
    title: "About Fun Holidays | Trusted Sri Lanka Travel Agency",
    description:
      "Learn about Fun Holidays — a trusted Sri Lanka travel agency with expert guides, " +
      "tailor-made holidays, wildlife tours, beach packages & MICE services. " +
      "Discover why travellers choose Fun Holidays for their Sri Lanka experience.",
    keywords:
      "Fun Holidays Sri Lanka, Sri Lanka travel agency, about Fun Holidays, " +
      "Sri Lanka tour operator, Sri Lanka expert guide, trusted Sri Lanka travel company",
    canonical: "https://www.funholidays.lk/about",
    schema: ABOUT_SCHEMA,
  });

  return (
    <>
      <PageHero
        title="About Fun Holidays"
        image="/images/about/hero-3.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Fun Holidays" },
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
