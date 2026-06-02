import PageHero from "../common/PageHero";
import MiceIntro from "../components/mice/MiceIntro";
import MiceColombo from "../components/mice/MiceColombo";
import MiceHotels from "../components/mice/MiceHotels";
import MiceAccess from "../components/mice/MiceAccess";
import MiceClients from "../components/mice/MiceClients";
import MiceGallery from "../components/mice/MiceGallery";
import MiceTestimonials from "../components/mice/MiceTestimonials";
import CommonCallToAction from "../common/CommonCallToAction";

const MicePage = () => {
  return (
    <>
      <PageHero
        title="MICE"
        image="/images/home/hero-5.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "MICE" },
        ]}
      />
      <MiceIntro />
      <MiceColombo />
      <MiceHotels />
      <MiceAccess />
      <MiceClients />
      <MiceGallery />
      <MiceTestimonials />
      <CommonCallToAction />
    </>
  );
};

export default MicePage;
