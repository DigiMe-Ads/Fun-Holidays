import PageHero from "../common/PageHero";
import TailorMakePage from "../tailor-made/TailorMadeSection";
import CommonCallToAction from "../common/CommonCallToAction";

const TailorMadePage = () => {
  return (
    <>
      <PageHero
        title="Tailor-Made Holidays"
        image="/images/destination/sunset-beach.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tailor-Made Holidays" },
        ]}
        />
        <TailorMakePage />
        <CommonCallToAction />
    </>
  );
};

export default TailorMadePage;