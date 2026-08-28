import { useRef, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PageHero from "../common/PageHero";
import useScrollReveal from "../hooks/useScrollReveal";
import { FaCheck, FaTimes, FaCalendarAlt } from "react-icons/fa";
import useSEO from "../hooks/useSEO";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

const TourDetailPage = () => {
  const { slug } = useParams();

  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoc(doc(db, "tours", slug))
      .then((snap) => {
        if (snap.exists()) setData({ ...snap.data(), slug: snap.id });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load tour:", err);
        setLoading(false);
      });
  }, [slug]);

  // subtitle may be stored as 'subtitle' (seeded) or 'duration' (admin-created)
  const subtitle = data?.subtitle || data?.duration || "";
  // thumbnail may be stored as 'thumbnailImage' (seeded) or 'image' (admin-created)
  const thumbnail = data?.thumbnailImage || data?.image || "";

  // Build schema only when data is available (hook must always be called)
  const tourSchema = data
    ? {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: data.title,
        description: `${data.tagline}. ${subtitle} guided tour of Sri Lanka with Fun Holidays.`,
        url: `https://www.funholidays.lk/tours/${slug}`,
        image: `https://www.funholidays.lk${data.heroImage || thumbnail}`,
        provider: {
          "@type": "TravelAgency",
          name: "Fun Holidays",
          url: "https://www.funholidays.lk",
          telephone: "+94322254811",
          email: "info@funholidays.lk",
        },
        touristType: ["Adventure tourist", "Cultural tourist", "Leisure tourist"],
        itinerary: {
          "@type": "ItemList",
          name: `${data.title} Day-by-Day Itinerary`,
          numberOfItems: (data.itinerary || []).length,
        },
      }
    : null;

  useSEO({
    title: data
      ? `${data.title} | Sri Lanka Tour Packages | Fun Holidays`
      : "Sri Lanka Tour Packages | Fun Holidays",
    description: data
      ? `${data.tagline}. ${subtitle} Sri Lanka guided tour with Fun Holidays — ` +
        "expert guides, all-inclusive packages, personalised service."
      : "Browse Sri Lanka tour packages with Fun Holidays.",
    keywords: data
      ? `${data.title}, Sri Lanka tour packages, ${data.keyword || ""}, Fun Holidays Sri Lanka`
      : "Sri Lanka tour packages",
    canonical: `https://www.funholidays.lk/tours/${slug}`,
    schema: tourSchema,
  });

  const overviewRef   = useRef(null);
  const highlightsRef = useRef(null);
  const itineraryRef  = useRef(null);
  const sidebarRef    = useRef(null);

  useScrollReveal(overviewRef, 100);
  useScrollReveal(highlightsRef, 150);
  useScrollReveal(itineraryRef, 200);
  useScrollReveal(sidebarRef, 250);

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
        <p className="text-gray-500 text-lg">Tour not found.</p>
        <Link to="/tours" className="text-orange-500 underline text-sm">
          Back to Tour Packages
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageHero
        title={data.title}
        image={thumbnail}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tour Packages", href: "/tours" },
          { label: data.title },
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Title + tagline */}
        <div className="mb-8 text-center">
          <p className="text-orange-500 text-sm font-semibold mb-1">
            {subtitle}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900">
            {data.tagline}
          </h1>
        </div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* ── Left: Main Content ───────────────────────────── */}
          <div className="flex-1 flex flex-col gap-10">

            {/* Overview */}
            <div
              ref={overviewRef}
              style={{ opacity: 0, transform: "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
            >
              <h2 className="text-gray-900 font-bold text-2xl mb-4 pb-2 border-b border-gray-100">
                Overview
              </h2>
              <div className="flex flex-col gap-3">
                {(data.overview || []).map((para, i) => (
                  <p key={i} className="text-gray-500 text-sm leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div
              ref={highlightsRef}
              style={{ opacity: 0, transform: "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
            >
              <h2 className="text-gray-900 font-bold text-2xl mb-4 pb-2 border-b border-gray-100">
                Tour Highlights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(data.highlights || []).map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <FaCheck className="text-orange-500 text-xs mt-1 shrink-0" />
                    <span className="text-gray-600 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Includes / Excludes */}
            <div
              style={{ opacity: 0, transform: "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <div>
                <h2 className="text-gray-900 font-bold text-2xl mb-4 pb-2 border-b border-gray-100">
                  Includes
                </h2>
                <div className="flex flex-col gap-2">
                  {(data.includes || []).map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <FaCheck className="text-green-500 text-xs mt-1 shrink-0" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-gray-900 font-bold text-2xl mb-4 pb-2 border-b border-gray-100">
                  Excludes
                </h2>
                <div className="flex flex-col gap-2">
                  {(data.excludes || []).map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <FaTimes className="text-red-400 text-xs mt-1 shrink-0" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Itinerary */}
            <div
              ref={itineraryRef}
              style={{ opacity: 0, transform: "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
            >
              <h2 className="text-gray-900 font-bold text-2xl mb-6 pb-2 border-b border-gray-100">
                Day-by-Day Itinerary
              </h2>
              <div className="flex flex-col gap-0">
                {(data.itinerary || []).map((day, i) => (
                  <div key={i} className="flex gap-4">
                    {/* Timeline */}
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                        <FaCalendarAlt className="text-white text-xs" />
                      </div>
                      {i < (data.itinerary || []).length - 1 && (
                        <div className="w-px flex-1 bg-gray-200 my-1" />
                      )}
                    </div>
                    {/* Content */}
                    <div className="pb-8 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-orange-500 font-bold text-sm">
                          {day.day}
                        </span>
                        <span className="text-gray-900 font-semibold text-sm">
                          — {day.title}
                        </span>
                      </div>
                      <ul className="flex flex-col gap-1">
                        {(day.activities || []).map((act, j) => (
                          <li
                            key={j}
                            className="text-gray-500 text-xs leading-relaxed flex items-start gap-1.5"
                          >
                            <span className="text-gray-300 mt-1">·</span>
                            {act}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-xs italic mt-2">
                * Itinerary flow may vary according to your flight schedule.
              </p>
            </div>
          </div>

          {/* ── Right: Sidebar ───────────────────────────────── */}
          <div
            ref={sidebarRef}
            style={{ opacity: 0, transform: "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
            className="w-full lg:w-72 shrink-0"
          >
            <div className="sticky top-24 flex flex-col gap-4">
              {/* Price card */}
              <div className="border border-gray-200 rounded-2xl p-6 flex flex-col gap-5">
                <h3 className="text-gray-900 font-bold text-base">
                  Book This Tour
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {subtitle} · Expert guided · All inclusive
                </p>

                <Link
                  to="/contact"
                  className="w-full bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold text-sm py-3 rounded-xl text-center"
                >
                  Contact Us For a Quote
                </Link>
                <Link
                  to="/tailor-made"
                  className="w-full border border-gray-200 hover:border-orange-400 transition-colors text-gray-700 font-semibold text-sm py-3 rounded-xl text-center"
                >
                  Tailor Make This Package
                </Link>
              </div>

              {/* Quick info card */}
              <div className="bg-gray-50 rounded-2xl p-5 flex flex-col gap-3">
                <h4 className="text-gray-700 font-semibold text-sm">
                  Quick Info
                </h4>
                {[
                  { label: "Duration", value: subtitle },
                  { label: "Type",     value: "Guided Group / Private" },
                  { label: "Difficulty", value: "Easy to Moderate" },
                  { label: "Language", value: "Multilingual" },
                ].map((info, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-xs border-b border-gray-200 pb-2 last:border-0 last:pb-0"
                  >
                    <span className="text-gray-400">{info.label}</span>
                    <span className="text-gray-700 font-medium">{info.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TourDetailPage;
