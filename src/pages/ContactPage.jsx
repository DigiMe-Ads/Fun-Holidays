import PageHero from "../common/PageHero";
import ContactSection from "../contact/ContactSection";
import useSEO from "../hooks/useSEO";

const CONTACT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Fun Holidays | Plan Your Sri Lanka Holiday Today",
  url: "https://www.funholidays.lk/contact",
  description:
    "Contact Fun Holidays for Sri Lanka tour enquiries, tailor-made holiday planning " +
    "& MICE bookings. Call +94 32 225 4811 or email info@funholidays.lk.",
  mainEntity: {
    "@type": "TravelAgency",
    name: "Fun Holidays",
    telephone: "+94322254811",
    email: "info@funholidays.lk",
    address: {
      "@type": "PostalAddress",
      streetAddress: "25, Chilaw Road, Marawila",
      addressLocality: "Marawila",
      postalCode: "61210",
      addressCountry: "LK",
    },
    openingHours: "Mo-Sa 09:00-18:00",
  },
};

const ContactPage = () => {
  useSEO({
    title: "Contact Fun Holidays | Plan Your Sri Lanka Holiday Today",
    description:
      "Contact Fun Holidays for Sri Lanka tour enquiries, tailor-made holiday planning " +
      "& MICE bookings. Call +94 32 225 4811 or email info@funholidays.lk. " +
      "We respond within 24 hours.",
    keywords:
      "contact Fun Holidays, Sri Lanka tour enquiry, book Sri Lanka holiday, " +
      "Fun Holidays contact, Sri Lanka travel enquiry, Fun Holidays phone number",
    canonical: "https://www.funholidays.lk/contact",
    schema: CONTACT_SCHEMA,
  });

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
      <ContactSection />
    </>
  );
};

export default ContactPage;
