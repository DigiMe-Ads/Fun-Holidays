import { useRef, useState, useEffect, useCallback } from "react";
import { db } from "../../firebase/config";
import { collection, query, where, getDocs, limit } from "firebase/firestore";

// ─── Config ──────────────────────────────────────────────────────────────────

const PAGES = [
  { label: "Home",         path: "/"            },
  { label: "Tours",        path: "/tours"        },
  { label: "Blog",         path: "/blog"         },
  { label: "Destinations", path: "/destinations" },
  { label: "About",        path: "/about"        },
  { label: "Contact",      path: "/contact"      },
  { label: "Tailor-Made",  path: "/tailor-made"  },
];

const DATE_RANGES = [
  { label: "Last 7 days",  days: 7   },
  { label: "Last 30 days", days: 30  },
  { label: "Last 90 days", days: 90  },
  { label: "All time",     days: null },
];

// ─── Heatmap canvas rendering ─────────────────────────────────────────────────

function heatColor(t) {
  // blue → cyan → green → yellow → orange → red
  const stops = [
    [0,   0,   255],
    [0,   255, 255],
    [0,   255, 0  ],
    [255, 255, 0  ],
    [255, 128, 0  ],
    [255, 0,   0  ],
  ];
  const pos = t * (stops.length - 1);
  const i   = Math.min(Math.floor(pos), stops.length - 2);
  const f   = pos - i;
  return stops[i].map((c, j) => Math.round(c + (stops[i + 1][j] - c) * f));
}

function renderHeatmap(canvas, clicks, W, H) {
  if (!canvas || W <= 0 || H <= 0 || !clicks.length) return;
  canvas.width  = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, W, H);

  // Step 1 — draw white intensity blobs (lighter blend = additive)
  const off   = document.createElement("canvas");
  off.width   = W;
  off.height  = H;
  const oc    = off.getContext("2d");
  oc.globalCompositeOperation = "lighter";

  const R = Math.min(W * 0.05, 65); // blob radius

  clicks.forEach(({ xPct, yPct }) => {
    const x = (xPct / 100) * W;
    const y = (yPct / 100) * H;
    const g = oc.createRadialGradient(x, y, 0, x, y, R);
    g.addColorStop(0, "rgba(255,255,255,0.24)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    oc.fillStyle = g;
    oc.fillRect(x - R, y - R, R * 2, R * 2);
  });

  // Step 2 — map intensity → color
  const img = oc.getImageData(0, 0, W, H);
  const d   = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const v = d[i]; // red channel = intensity from white blobs
    if (v > 3) {
      const t      = Math.min(v / 170, 1);
      const [r, g, b] = heatColor(t);
      d[i]     = r;
      d[i + 1] = g;
      d[i + 2] = b;
      d[i + 3] = Math.floor(t * 210);
    } else {
      d[i + 3] = 0; // fully transparent for zero-density areas
    }
  }
  ctx.putImageData(img, 0, 0);
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function HeatmapView() {
  const [selectedPage, setSelectedPage] = useState("/");
  const [dateRange,    setDateRange]    = useState(30);
  const [clicks,       setClicks]       = useState([]);
  const [loading,      setLoading]      = useState(false);
  const [iframeReady,  setIframeReady]  = useState(false);
  const [contentH,     setContentH]     = useState(800);

  const iframeRef    = useRef(null);
  const canvasRef    = useRef(null);
  const containerRef = useRef(null);

  // ── Load click data ───────────────────────────────────────────────────────

  const loadClicks = useCallback(async () => {
    setLoading(true);
    try {
      const snap = await getDocs(
        query(
          collection(db, "clicks"),
          where("page", "==", selectedPage),
          limit(5000)
        )
      );
      let data = snap.docs.map((d) => d.data());

      // Filter by date client-side (avoids needing a Firestore composite index)
      if (dateRange) {
        const cutoff = Date.now() - dateRange * 24 * 60 * 60 * 1000;
        data = data.filter((c) => (c.timestamp?.toMillis?.() ?? 0) >= cutoff);
      }

      setClicks(data);
    } catch (err) {
      console.error("Heatmap: failed to load clicks:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedPage, dateRange]);

  useEffect(() => { loadClicks(); }, [loadClicks]);

  // ── Reset iframe when page selection changes ──────────────────────────────

  useEffect(() => {
    setIframeReady(false);
    setContentH(800);
  }, [selectedPage]);

  // ── Draw heatmap once iframe is ready ────────────────────────────────────

  useEffect(() => {
    if (!iframeReady || !canvasRef.current || !containerRef.current) return;
    const W = containerRef.current.offsetWidth;
    renderHeatmap(canvasRef.current, clicks, W, contentH);
  }, [clicks, iframeReady, contentH]);

  // ── Iframe load handler ───────────────────────────────────────────────────

  const handleIframeLoad = () => {
    // Wait for React to mount + Firestore data to render inside the iframe
    setTimeout(() => {
      try {
        const doc = iframeRef.current?.contentDocument;
        if (doc) {
          const h = doc.documentElement.scrollHeight;
          setContentH(Math.max(h, 600));
        }
      } catch {
        setContentH(3000); // cross-origin fallback (shouldn't happen on same domain)
      }
      setIframeReady(true);
    }, 2800);
  };

  // ── Top clicked elements (aggregated from raw click data) ─────────────────

  const topElements = Object.entries(
    clicks.reduce((acc, c) => {
      const k = c.elementText?.trim() || "Unknown";
      if (k) acc[k] = (acc[k] || 0) + 1;
      return acc;
    }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col" style={{ height: "100vh" }}>

      {/* ── Toolbar ──────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shrink-0">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              🔥 User Heatmap
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Where visitors click on your website
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 ml-auto">
            {/* Page selector */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Page</span>
              <select
                value={selectedPage}
                onChange={(e) => setSelectedPage(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-slate-700 bg-white focus:outline-none focus:border-yellow-400 transition-colors"
              >
                {PAGES.map((p) => (
                  <option key={p.path} value={p.path}>{p.label}</option>
                ))}
              </select>
            </div>

            {/* Date range */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Period</span>
              <select
                value={dateRange ?? "all"}
                onChange={(e) => setDateRange(e.target.value === "all" ? null : Number(e.target.value))}
                className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-slate-700 bg-white focus:outline-none focus:border-yellow-400 transition-colors"
              >
                {DATE_RANGES.map((r) => (
                  <option key={r.label} value={r.days ?? "all"}>{r.label}</option>
                ))}
              </select>
            </div>

            {/* Refresh */}
            <button
              onClick={loadClicks}
              disabled={loading}
              className="bg-slate-900 hover:bg-slate-700 disabled:opacity-50 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors"
            >
              {loading ? "Loading…" : "↻ Refresh"}
            </button>
          </div>
        </div>

        {/* Stats strip */}
        <div className="flex flex-wrap items-center gap-6 mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
              {clicks.length.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400">clicks recorded</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
              {topElements.length}
            </span>
            <span className="text-xs text-slate-400">unique elements</span>
          </div>
          {topElements[0] && (
            <div className="flex items-center gap-2 bg-orange-50 rounded-lg px-3 py-1">
              <span className="text-xs font-semibold text-orange-700">
                🔥 Most clicked:
              </span>
              <span className="text-xs font-bold text-orange-900">
                {topElements[0][0]}
              </span>
              <span className="text-xs text-orange-500">
                ({topElements[0][1]}×)
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Main area ────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Viewer pane */}
        <div className="flex-1 overflow-auto bg-slate-100 p-4">
          {clicks.length === 0 && !loading ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center h-80 gap-4 text-center">
              <div className="text-6xl select-none">🖱️</div>
              <div>
                <p className="text-slate-600 font-semibold text-sm">No click data yet for this page</p>
                <p className="text-slate-400 text-xs mt-1 max-w-xs mx-auto">
                  Once visitors start clicking buttons and links on your site,
                  those interactions will show up here as a coloured heat map.
                </p>
              </div>
            </div>
          ) : (
            /* Site preview + heatmap canvas */
            <div
              ref={containerRef}
              className="relative bg-white shadow-xl rounded-xl overflow-hidden"
              style={{ height: contentH }}
            >
              {/* Loading overlay */}
              {!iframeReady && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-20">
                  <div className="text-center">
                    <div className="w-10 h-10 border-[3px] border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-700 font-semibold text-sm">Rendering page…</p>
                    <p className="text-slate-400 text-xs mt-1">
                      Loading your site and click data
                    </p>
                  </div>
                </div>
              )}

              {/* The live site — pointer-events disabled so nothing triggers */}
              <iframe
                ref={iframeRef}
                src={selectedPage}
                title="Site preview"
                onLoad={handleIframeLoad}
                style={{
                  width:          "100%",
                  height:         contentH,
                  border:         "none",
                  display:        "block",
                  pointerEvents:  "none",
                  userSelect:     "none",
                }}
              />

              {/* Heatmap canvas — overlaid on top of the iframe */}
              <canvas
                ref={canvasRef}
                style={{
                  position:      "absolute",
                  top:           0,
                  left:          0,
                  width:         "100%",
                  height:        contentH,
                  pointerEvents: "none",
                  opacity:       iframeReady ? 1 : 0,
                  transition:    "opacity 0.5s ease",
                  mixBlendMode:  "multiply", // blends naturally with the site underneath
                }}
              />
            </div>
          )}
        </div>

        {/* ── Sidebar ──────────────────────────────────────────────────── */}
        <div className="w-64 bg-white border-l border-gray-200 flex flex-col shrink-0 overflow-y-auto">

          {/* Colour legend */}
          <div className="p-4 border-b border-gray-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Heat Legend
            </p>
            <div
              className="h-3 rounded-full"
              style={{
                background:
                  "linear-gradient(to right, #0000FF, #00FFFF, #00FF00, #FFFF00, #FF8000, #FF0000)",
              }}
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>Fewer clicks</span>
              <span>More clicks</span>
            </div>
          </div>

          {/* Top clicked elements */}
          <div className="p-4 flex-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
              Top Clicked Elements
            </p>

            {topElements.length === 0 ? (
              <p className="text-xs text-slate-400 italic">
                No data yet for this page &amp; period.
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {topElements.map(([text, count], i) => {
                  const max = topElements[0][1];
                  const pct = Math.round((count / max) * 100);
                  const barColor =
                    i === 0 ? "#F97316" : i < 3 ? "#FBBF24" : "#94A3B8";
                  return (
                    <div key={i}>
                      <div className="flex items-baseline justify-between gap-1 mb-1">
                        <span className="text-xs font-medium text-slate-700 truncate max-w-[136px]">
                          {text}
                        </span>
                        <span className="text-xs font-bold text-slate-800 shrink-0 tabular-nums">
                          {count}×
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%`, background: barColor }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="p-4 border-t border-gray-100">
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Clicks are recorded when real visitors interact with your live
              site. The heatmap updates immediately — hit Refresh to see the
              latest.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
