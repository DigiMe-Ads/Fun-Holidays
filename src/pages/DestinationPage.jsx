import PageHero from "../common/PageHero";

const AboutUs = () => {
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
      {/* rest of page content */}
    </>
  );
};

export default AboutUs;