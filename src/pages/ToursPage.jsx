import PageHero from "../common/PageHero";
import TourPackages from "../tours/TourPackages";
import CommonCallToAction from "../common/CommonCallToAction";

const ToursPage = () => {
  return (
    <>
      <PageHero
        title="Packages and Tours"
        image="/images/destination/hero.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Packages and Tours" },
        ]}
      />
        <TourPackages />
        <CommonCallToAction />
    </>
  );
};

export default ToursPage;