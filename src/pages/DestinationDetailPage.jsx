import { useRef, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PageHero from "../common/PageHero";
import RelatedDestinations from "../destination/RelatedDestination";
import useScrollReveal from "../hooks/useScrollReveal";
import { FaCheck } from "react-icons/fa";
import useSEO from "../hooks/useSEO";
import { db } from "../firebase/config";
import { doc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";

// Convert activity title to URL slug
export const toSlug = (title) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const DestinationDetailPage = () => {
  const { slug } = useParams();

  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);

  // Pricing enquiry dialog
  const [enquiryOpen,   setEnquiryOpen]   = useState(false);
  const [enquiryForm,   setEnquiryForm]   = useState({ name: "", email: "", phone: "", message: "" });
  const [enquiryStatus, setEnquiryStatus] = useState(""); // "" | "sending" | "sent" | "error"

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

  async function submitEnquiry(e) {
    e.preventDefault();
    setEnquiryStatus("sending");
    try {
      // 1 — Save to Firestore so it appears in the admin Enquiries panel
      await addDoc(collection(db, "enquiries"), {
        type:        "destination-enquiry",
        name:        enquiryForm.name,
        email:       enquiryForm.email,
        phone:       enquiryForm.phone  || "",
        message:     enquiryForm.message || "",
        destination: destName,
        subject:     `Pricing Enquiry — ${destName}`,
        status:      "new",
        createdAt:   serverTimestamp(),
      });

      // 2 — Also fire web3forms so an email notification is sent
      const payload = new FormData();
      payload.append("access_key",  "8c99ad2a-3d0f-415b-bf4b-4d011d8b0fa7");
      payload.append("subject",     `Pricing Enquiry — ${destName}`);
      payload.append("destination", destName);
      payload.append("name",        enquiryForm.name);
      payload.append("email",       enquiryForm.email);
      payload.append("phone",       enquiryForm.phone  || "Not provided");
      payload.append("message",     enquiryForm.message || "No additional message.");
      payload.append("botcheck",    "");
      await fetch("https://api.web3forms.com/submit", { method: "POST", body: payload });

      setEnquiryStatus("sent");
    } catch {
      setEnquiryStatus("error");
    }
  }

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
          <h1
            className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight"
            style={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 800 }}
          >
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

            {/* Article sections */}
            {(data.article || []).length > 0 && (
              <div className="mt-10 flex flex-col gap-7">
                {(data.article || []).map((section, i) => (
                  <div key={i}>
                    {section.heading && (
                      <h3 className="text-gray-900 font-bold text-xl mb-2">
                        {section.heading}
                      </h3>
                    )}
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {section.body}
                    </p>
                  </div>
                ))}
              </div>
            )}
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

              {/* Pricing (optional) or enquiry CTA */}
              {data.showPrice !== false ? (
                <>
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
                  <Link
                    to="/contact"
                    className="w-full bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold text-sm py-3 rounded-xl text-center block"
                  >
                    Learn More About Us
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Pricing for this experience is tailored to your group size
                    and travel dates. Get in touch and we&rsquo;ll send you a
                    personalised quote within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setEnquiryForm({ name: "", email: "", phone: "", message: "" });
                      setEnquiryStatus("");
                      setEnquiryOpen(true);
                    }}
                    className="w-full bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold text-sm py-3 rounded-xl"
                  >
                    Enquire About Pricing
                  </button>
                </>
              )}

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

      {/* ── Pricing Enquiry Dialog ─────────────────────────────────────── */}
      {enquiryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setEnquiryOpen(false)}
          />

          {/* Panel */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10 overflow-hidden">

            {/* Header */}
            <div className="bg-orange-500 px-6 py-5">
              <button
                onClick={() => setEnquiryOpen(false)}
                className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl leading-none"
              >
                ×
              </button>
              <p className="text-white/80 text-xs font-medium mb-0.5">Fun Holidays Sri Lanka</p>
              <h3 className="text-white font-bold text-lg leading-snug">
                Enquire About Pricing
              </h3>
              <p className="text-white/70 text-xs mt-1">{destName}</p>
            </div>

            <div className="px-6 py-6">
              {enquiryStatus === "sent" ? (
                /* Success state */
                <div className="py-4 text-center flex flex-col items-center gap-4">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                    ✓
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold text-base">Enquiry Sent!</p>
                    <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                      We&rsquo;ve received your message and will send you a
                      personalised price quote within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setEnquiryOpen(false)}
                    className="mt-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-8 py-2.5 rounded-xl transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                /* Form */
                <form onSubmit={submitEnquiry} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={enquiryForm.name}
                      onChange={(e) => setEnquiryForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Your name"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={enquiryForm.email}
                      onChange={(e) => setEnquiryForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="your@email.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Phone <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={enquiryForm.phone}
                      onChange={(e) => setEnquiryForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="+1 234 567 8900"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Message <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <textarea
                      rows={3}
                      value={enquiryForm.message}
                      onChange={(e) => setEnquiryForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Group size, travel dates, any special requests…"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors resize-none"
                    />
                  </div>

                  {enquiryStatus === "error" && (
                    <p className="text-red-500 text-xs">
                      Something went wrong. Please try again or{" "}
                      <Link to="/contact" className="underline">contact us directly</Link>.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={enquiryStatus === "sending"}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 transition-colors text-white font-semibold text-sm py-3 rounded-xl"
                  >
                    {enquiryStatus === "sending" ? "Sending…" : "Send Enquiry"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DestinationDetailPage;
