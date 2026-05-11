import PageHero from "../common/PageHero";
import TourPackages from "../tours/TourPackages";
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
        
    </>
  );
};

export default ToursPage;