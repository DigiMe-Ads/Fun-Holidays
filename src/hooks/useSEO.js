import { useEffect, useRef } from "react";

// ─── Constants ───────────────────────────────────────────────────────────────
export const SITE_URL   = "https://www.funholidays.lk";
export const SITE_NAME  = "Fun Holidays";
export const DEFAULT_TITLE = "Sri Lanka Holiday Packages & Tours | Fun Holidays";
export const DEFAULT_DESC  =
  "Discover expertly crafted Sri Lanka holiday packages with Fun Holidays. " +
  "Tailor-made tours, wildlife safaris, beach getaways & MICE events. Book today.";

// ─── Global LocalBusiness / TravelAgency schema (injected once) ──────────────
const BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["TravelAgency", "LocalBusiness"],
      "@id": `${SITE_URL}/#business`,
      name: "Fun Holidays",
      alternateName: "Fun Holidays Sri Lanka",
      url: SITE_URL,
      logo: `${SITE_URL}/fun-holidays-logo.png`,
      image: `${SITE_URL}/fun-holidays-logo.png`,
      description:
        "Fun Holidays is a trusted Sri Lanka travel agency offering tailor-made holiday " +
        "packages, wildlife safaris, beach getaways, cultural tours & MICE services.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "25, Chilaw Road, Marawila",
        addressLocality: "Marawila",
        postalCode: "61210",
        addressRegion: "North Western Province",
        addressCountry: "LK",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "7.4144",
        longitude: "79.8300",
      },
      telephone: "+94322254811",
      email: "info@funholidays.lk",
      openingHours: "Mo-Sa 09:00-18:00",
      priceRange: "$$",
      currenciesAccepted: "USD, EUR, GBP, LKR",
      areaServed: { "@type": "Country", name: "Sri Lanka" },
    },
  ],
};

// ─── DOM helpers ─────────────────────────────────────────────────────────────
function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${CSS.escape(name)}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setOg(property, content) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function injectJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

// Inject global business schema once when the module is first imported
injectJsonLd("schema-business", BUSINESS_SCHEMA);

// ─── Hook ────────────────────────────────────────────────────────────────────
/**
 * useSEO — lightweight per-page SEO hook (no extra packages needed).
 *
 * @param {object} options
 * @param {string}  [options.title]       Page <title>. Falls back to DEFAULT_TITLE.
 * @param {string}  [options.description] Meta description. Falls back to DEFAULT_DESC.
 * @param {string}  [options.keywords]    Meta keywords (comma-separated).
 * @param {string}  [options.canonical]   Full canonical URL. Defaults to SITE_URL + pathname.
 * @param {object}  [options.schema]      Page-level JSON-LD schema object.
 */
const useSEO = ({
  title,
  description,
  keywords,
  canonical,
  schema,
} = {}) => {
  // Serialise at mount time so that inline object literals don't cause
  // effect re-runs on every render (refs don't appear in deps).
  const schemaRef = useRef(schema ? JSON.stringify(schema) : null);

  useEffect(() => {
    const t    = title       || DEFAULT_TITLE;
    const d    = description || DEFAULT_DESC;
    const url  = canonical   || `${SITE_URL}${window.location.pathname}`;

    // Title
    document.title = t;

    // Standard meta
    setMeta("description", d);
    setMeta("robots", "index, follow");
    if (keywords) setMeta("keywords", keywords);

    // Open Graph
    setOg("og:title",       t);
    setOg("og:description", d);
    setOg("og:type",        "website");
    setOg("og:site_name",   SITE_NAME);
    setOg("og:url",         url);
    setOg("og:image",       `${SITE_URL}/fun-holidays-logo.png`);
    setOg("og:locale",      "en_US");

    // Twitter Card
    setMeta("twitter:card",        "summary_large_image");
    setMeta("twitter:title",       t);
    setMeta("twitter:description", d);
    setMeta("twitter:image",       `${SITE_URL}/fun-holidays-logo.png`);

    // Canonical
    setCanonical(url);

    // Page-level JSON-LD (cleared if no schema for this page)
    if (schemaRef.current) {
      injectJsonLd("schema-page", JSON.parse(schemaRef.current));
    } else {
      const el = document.getElementById("schema-page");
      if (el) el.textContent = "";
    }

    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title, description, keywords, canonical]); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useSEO;
