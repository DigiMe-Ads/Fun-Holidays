import PageHero from "../common/PageHero";
import ActivitiesGrid from "../destination/ActivitiesGrid";
import FullWidthImage from "../common/FullWidthImage";
import CommonCallToAction from "../common/CommonCallToAction";

const DestinationPage = () => {
  return (
    <>
      <PageHero
        title="Fun Things To Do"
        image="/images/destination/hero.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Fun Things To Do" },
        ]}
      />
      <ActivitiesGrid />
      <FullWidthImage
        image="/images/destination/fishermen.png"
        alt="Stilt fishermen at sunset, Sri Lanka"
      />
        <CommonCallToAction />
    </>
  );
};

export default DestinationPage;