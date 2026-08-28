import PageHero from "../common/PageHero";
import TourPackages from "../tours/TourPackages";
import CommonCallToAction from "../common/CommonCallToAction";
import ToursCTA from "../tours/toursCTA";
import useSEO from "../hooks/useSEO";

const TOURS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Sri Lanka Tour Packages | Fun Holidays",
  url: "https://www.funholidays.lk/tours",
  description: "Handpicked Sri Lanka tour packages — beach tours, cultural tours, wildlife safaris, honeymoon & family holidays.",
  numberOfItems: 5,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Golden Beach Tour (5 Days)",         url: "https://www.funholidays.lk/tours/golden-beach-tour"        },
    { "@type": "ListItem", position: 2, name: "Best of Sri Lanka Tour (7 Days)",    url: "https://www.funholidays.lk/tours/best-of-sri-lanka-tour"    },
    { "@type": "ListItem", position: 3, name: "Amazing Sri Lanka Tour (7 Days)",   url: "https://www.funholidays.lk/tours/amazing-sri-lanka-tour"   },
    { "@type": "ListItem", position: 4, name: "Culture & Heritage Tour (8 Days)",  url: "https://www.funholidays.lk/tours/culture-heritage-tour"    },
    { "@type": "ListItem", position: 5, name: "Honeymoon Tour (9 Days)",            url: "https://www.funholidays.lk/tours/honeymoon-tour"           },
  ],
};

const ToursPage = () => {
  useSEO({
    title: "Sri Lanka Tour Packages | Wildlife, Beach & Culture | Fun Holidays",
    description:
      "Browse handpicked Sri Lanka tour packages — 5-day golden beach tours, 7-day cultural tours, " +
      "wildlife safaris, romantic honeymoon packages & family holidays. Expert guides, personalised service.",
    keywords:
      "Sri Lanka tour packages, Sri Lanka safari tours, cultural tours Sri Lanka, beach tours Sri Lanka, " +
      "honeymoon Sri Lanka, Sri Lanka 7 day tour, family holidays Sri Lanka, Sri Lanka travel packages",
    canonical: "https://www.funholidays.lk/tours",
    schema: TOURS_SCHEMA,
  });

  return (
    <>
      <PageHero
        title="Sri Lanka Tour Packages"
        image="/images/destination/hero.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Sri Lanka Tour Packages" },
        ]}
      />
        <TourPackages />
        <ToursCTA />
    </>
  );
};

export default ToursPage;
