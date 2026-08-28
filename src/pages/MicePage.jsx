import PageHero from "../common/PageHero";
import MiceIntro from "../components/mice/MiceIntro";
import MiceColombo from "../components/mice/MiceColombo";
import MiceHotels from "../components/mice/MiceHotels";
import MiceAccess from "../components/mice/MiceAccess";
import MiceClients from "../components/mice/MiceClients";
import MiceGallery from "../components/mice/MiceGallery";
import MiceTestimonials from "../components/mice/MiceTestimonials";
import CommonCallToAction from "../common/CommonCallToAction";
import MiceCTA from "../components/mice/MiceCTA";
import useSEO from "../hooks/useSEO";

const MICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "MICE Sri Lanka — Corporate Events & Incentive Travel",
  url: "https://www.funholidays.lk/mice",
  description:
    "Fun Holidays delivers seamless MICE (Meetings, Incentives, Conferences & Exhibitions) " +
    "solutions across Sri Lanka — corporate events, incentive programmes & conference packages.",
  serviceType: "MICE Travel & Corporate Events",
  provider: {
    "@type": "TravelAgency",
    name: "Fun Holidays",
    url: "https://www.funholidays.lk",
    telephone: "+94322254811",
    email: "info@funholidays.lk",
  },
  areaServed: { "@type": "Country", name: "Sri Lanka" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "MICE Sri Lanka Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Corporate Events Sri Lanka"      } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Incentive Travel Sri Lanka"      } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Conference Packages Sri Lanka"   } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Team Building Tours Sri Lanka"   } },
    ],
  },
};

const MicePage = () => {
  useSEO({
    title: "MICE Sri Lanka | Corporate Events & Incentive Travel | Fun Holidays",
    description:
      "Sri Lanka MICE travel specialists. Corporate events, conferences, incentive programmes " +
      "& team-building tours across Sri Lanka. Fun Holidays delivers seamless, end-to-end MICE solutions.",
    keywords:
      "MICE Sri Lanka, corporate events Sri Lanka, incentive travel Sri Lanka, " +
      "conference packages Sri Lanka, corporate tours Sri Lanka, team building Sri Lanka, " +
      "meetings incentives conferences exhibitions Sri Lanka",
    canonical: "https://www.funholidays.lk/mice",
    schema: MICE_SCHEMA,
  });

  return (
    <>
      <PageHero
        title="MICE Sri Lanka"
        image="/images/home/hero-5.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "MICE Sri Lanka" },
        ]}
      />
      <MiceIntro />
      <MiceColombo />
      <MiceHotels />
      <MiceAccess />
      <MiceClients />
      {/* <MiceGallery />
      <MiceTestimonials /> */}
      {/* <CommonCallToAction /> */}
      <MiceCTA />
    </>
  );
};

export default MicePage;
