import PageHero from "../common/PageHero";
import ContactSection from "../contact/ContactSection";

const ContactPage = () => {
  return (
    <>
      <PageHero
        title="Contact Us"
        image="/images/contact/hero.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact Us" },
        ]}
      />
      <ContactSection   />
    </>
  );
};

export default ContactPage;