import PageHero from "../common/PageHero";
import ContactSection from "../contact/ContactSection";

const ContactPage = () => {
  return (
    <>
      <PageHero
        title="Contact Us"
        image="/images/contact/hero-1.webp"
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