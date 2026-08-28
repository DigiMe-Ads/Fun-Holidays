import { useRef, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PageHero from "../common/PageHero";
import RelatedDestinations from "../destination/RelatedDestination";
import useScrollReveal from "../hooks/useScrollReveal";
import { FaCheck } from "react-icons/fa";
import useSEO from "../hooks/useSEO";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

// Convert activity title to URL slug
export const toSlug = (title) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const DestinationDetailPage = () => {
  const { slug } = useParams();

  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoc(doc(db, "destinations", slug))
      .then((snap) => {
        if (snap.exists()) setData({ ...snap.data(), slug: snap.id });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load destination:", err);
        setLoading(false);
      });
  }, [slug]);

  // Seeded data uses { title: "Destination Details", subtitle: "Name" }
  // Admin-created data uses { title: "Name" } with no subtitle
  const destName  = data?.subtitle || data?.title || "";
  const destLabel = data?.subtitle ? (data.title || "Destination Details") : "Destination Details";

  // Build schema only when data is available (hook must always be called)
  const destSchema = data
    ? {
        "@context": "https://schema.org",
        "@type": "TouristAttraction",
        name: destName,
        description: (data.overview || [])[0] || "",
        url: `https://www.funholidays.lk/destination/${slug}`,
        image: `https://www.funholidays.lk${data.heroImage || ""}`,
        touristType: ["Adventure tourist", "Cultural tourist", "Wildlife tourist"],
        containedInPlace: { "@type": "Country", name: "Sri Lanka" },
      }
    : null;

  useSEO({
    title: data
      ? `${destName} in Sri Lanka | Experiences | Fun Holidays`
      : "Sri Lanka Experiences & Activities | Fun Holidays",
    description: data
      ? `Discover ${destName} in Sri Lanka with Fun Holidays. ` +
        `${(data.highlights || [])[0] || ""} Book your Sri Lanka experience today.`
      : "Discover extraordinary Sri Lanka experiences with Fun Holidays.",
    keywords:
      `${destName}, things to do in Sri Lanka, Sri Lanka experiences, ` +
      "Sri Lanka activities, Fun Holidays Sri Lanka",
    canonical: `https://www.funholidays.lk/destination/${slug}`,
    schema: destSchema,
  });

  const galleryRef = useRef(null);
  const contentRef = useRef(null);
  const sidebarRef = useRef(null);

  useScrollReveal(galleryRef, 100);
  useScrollReveal(contentRef, 200);
  useScrollReveal(sidebarRef, 300);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading…</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-lg">Destination not found.</p>
        <Link to="/destinations" className="text-orange-500 underline text-sm">
          Back to Destinations
        </Link>
      </div>
    );
  }

  // Gallery layout: row1 = first 4, row2 = last 3
  const gallery     = data.gallery || [];
  const galleryRow1 = gallery.slice(0, 4);
  const galleryRow2 = gallery.slice(4, 7);

  return (
    <>
      <PageHero
        title={destLabel}
        image={data.heroImage}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Destinations", href: "/destinations" },
          { label: destName },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight">
            {destLabel} <br /> {destName}
          </h1>
        </div>

        {/* Gallery */}
        <div
          ref={galleryRef}
          style={{
            opacity: 0,
            transform: "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
          className="flex flex-col gap-2 mb-10"
        >
          {/* Row 1 — 4 equal images */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {galleryRow1.map((src, i) => (
              <div key={i} className="h-36 sm:h-44 rounded-xl overflow-hidden">
                <img
                  src={src}
                  alt={`gallery-${i}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>

          {/* Row 2 — 3 images, first one wider */}
          <div className="grid grid-cols-2 sm:grid-cols-[2fr_1fr_1fr] gap-2">
            {galleryRow2.map((src, i) => (
              <div key={i} className="h-36 sm:h-44 rounded-xl overflow-hidden">
                <img
                  src={src}
                  alt={`gallery-r2-${i}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Content + Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Overview + Highlights */}
          <div
            ref={contentRef}
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
            className="flex-1"
          >
            <h2 className="text-gray-900 font-bold text-2xl mb-3">Overview</h2>
            <div className="flex flex-col gap-3 mb-8">
              {(data.overview || []).map((para, i) => (
                <p key={i} className="text-gray-500 text-sm leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            <h2 className="text-gray-900 font-bold text-2xl mb-3">
              Top-highlight
            </h2>
            <ul className="flex flex-col gap-2">
              {(data.highlights || []).map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <FaCheck className="text-orange-500 text-xs mt-1 shrink-0" />
                  <span className="text-gray-600 text-sm">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Sidebar */}
          <div
            ref={sidebarRef}
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
            className="w-full lg:w-64 shrink-0"
          >
            <div className="border border-gray-200 rounded-2xl p-6 flex flex-col gap-5">
              <h3 className="text-gray-900 font-bold text-base">
                Top Travel Destinations
              </h3>

              {/* Pricing */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-gray-400 text-xs mb-1">To Child</p>
                  <p className="text-gray-900 text-2xl font-bold">
                    {data.toChild ?? data.price?.child ?? "—"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-xs mb-1">To Adult</p>
                  <p className="text-gray-900 text-2xl font-bold">
                    ${data.toAdult ?? data.price?.adult ?? "—"}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <Link
                to="/contact"
                className="w-full bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold text-sm py-3 rounded-xl text-center block"
              >
                Learn More About Us
              </Link>

              {/* Help */}
              <p className="text-gray-400 text-xs text-center">
                Need some help?{" "}
                <Link
                  to="/contact"
                  className="text-orange-500 underline hover:text-orange-600"
                >
                  Contact Us
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <RelatedDestinations currentSlug={slug} />
    </>
  );
};

export default DestinationDetailPage;
