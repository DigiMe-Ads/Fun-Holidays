import PageHero from "../common/PageHero";
import ActivitiesGrid from "../destination/ActivitiesGrid";
import FullWidthImage from "../common/FullWidthImage";
import CommonCallToAction from "../common/CommonCallToAction";
import useSEO from "../hooks/useSEO";

const DEST_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  name: "Fun Things to Do in Sri Lanka",
  url: "https://www.funholidays.lk/destinations",
  description:
    "Discover the best things to do in Sri Lanka — elephant safaris, whale watching, " +
    "the Kandy Perahera, beach holidays, nature trails, surfing & more.",
  touristType: ["Adventure tourist", "Cultural tourist", "Wildlife tourist", "Beach tourist"],
  containedInPlace: {
    "@type": "Country",
    name: "Sri Lanka",
  },
  hasMap: "https://www.google.com/maps?q=Sri+Lanka",
};

const DestinationPage = () => {
  useSEO({
    title: "Fun Things to Do in Sri Lanka | Experiences & Activities | Fun Holidays",
    description:
      "Discover the best things to do in Sri Lanka. Elephant safaris, whale watching, " +
      "the Kandy Perahera, beach holidays, nature trails, surfing & wildlife safaris. " +
      "Plan your Sri Lanka experiences with Fun Holidays.",
    keywords:
      "things to do in Sri Lanka, Sri Lanka activities, Sri Lanka attractions, " +
      "Sri Lanka experiences, Sri Lanka travel guide, elephant safari Sri Lanka, " +
      "whale watching Sri Lanka, Kandy Perahera, Sri Lanka wildlife",
    canonical: "https://www.funholidays.lk/destinations",
    schema: DEST_SCHEMA,
  });

  return (
    <>
      <PageHero
        title="Fun Things to Do in Sri Lanka"
        image="/images/destination/related-mountain.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Fun Things to Do in Sri Lanka" },
        ]}
      />
      <ActivitiesGrid />
      <FullWidthImage
        image="/images/destination/fishermen.png"
        alt="Traditional stilt fishermen at sunset in Sri Lanka"
      />
        <CommonCallToAction />
    </>
  );
};

export default DestinationPage;
