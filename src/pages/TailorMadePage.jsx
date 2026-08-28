import PageHero from "../common/PageHero";
import TailorMakePage from "../tailor-made/TailorMadeSection";
import CommonCallToAction from "../common/CommonCallToAction";
import TailorCTA from "../tailor-made/TailorCTA";
import useSEO from "../hooks/useSEO";

const TAILOR_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Tailor Made Sri Lanka Holidays",
  url: "https://www.funholidays.lk/tailor-made",
  description:
    "Fun Holidays designs fully bespoke, tailor-made Sri Lanka holiday packages for " +
    "solo travellers, couples, families & corporate groups.",
  serviceType: "Tailor-Made Holiday Planning",
  provider: {
    "@type": "TravelAgency",
    name: "Fun Holidays",
    url: "https://www.funholidays.lk",
    telephone: "+94322254811",
    email: "info@funholidays.lk",
  },
  areaServed: { "@type": "Country", name: "Sri Lanka" },
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: "https://www.funholidays.lk/tailor-made",
    servicePhone: "+94322254811",
    serviceEmail: "info@funholidays.lk",
  },
};

const TailorMadePage = () => {
  useSEO({
    title: "Tailor Made Sri Lanka Holidays | Bespoke Tour Packages | Fun Holidays",
    description:
      "Design your perfect Sri Lanka holiday with Fun Holidays. Fully bespoke, tailor-made " +
      "tour packages for solo travellers, couples, families & corporate groups. " +
      "Tell us your dream — we build it. Enquire today.",
    keywords:
      "tailor made Sri Lanka holidays, bespoke Sri Lanka tours, custom Sri Lanka itinerary, " +
      "private Sri Lanka tour, tailor made travel package Sri Lanka, personalised Sri Lanka holiday",
    canonical: "https://www.funholidays.lk/tailor-made",
    schema: TAILOR_SCHEMA,
  });

  return (
    <>
      <PageHero
        title="Tailor Made Sri Lanka Holidays"
        image="/images/destination/sunset-beach.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tailor Made Sri Lanka Holidays" },
        ]}
        />
        <TailorMakePage />
        {/* <CommonCallToAction /> */}
        <TailorCTA />
    </>
  );
};

export default TailorMadePage;
