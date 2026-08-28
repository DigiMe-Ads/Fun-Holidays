import { db } from "../firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

/**
 * Records visitor clicks to Firestore for the admin heatmap.
 * - Skips admin pages (/admin/*)
 * - Skips when running inside an iframe (e.g. the heatmap preview)
 * - Only tracks clicks on interactive elements: buttons, links, [data-track]
 * - Never throws — visitor experience is always preserved
 */
export function initClickTracker() {
  // Don't run inside the heatmap iframe preview
  if (typeof window === "undefined") return;
  if (window.self !== window.top)   return; // inside an iframe

  document.addEventListener("click", async (e) => {
    try {
      // Skip admin pages
      if (window.location.pathname.startsWith("/admin")) return;

      // Find the nearest interactive ancestor
      const el = e.target.closest("button, a, [role='button'], [data-track]");
      if (!el) return;

      const pageW = document.documentElement.scrollWidth  || window.innerWidth;
      const pageH = document.documentElement.scrollHeight || window.innerHeight;

      await addDoc(collection(db, "clicks"), {
        page:        window.location.pathname,
        elementText: (el.innerText || el.getAttribute("aria-label") || el.title || "")
                       .trim()
                       .replace(/\s+/g, " ")
                       .slice(0, 60),
        elementTag:  el.tagName.toLowerCase(),
        // percentage positions (0-100) so they survive different screen sizes
        xPct: Math.round((e.pageX / pageW) * 10000) / 100,
        yPct: Math.round((e.pageY / pageH) * 10000) / 100,
        viewportW:   window.innerWidth,
        timestamp:   serverTimestamp(),
      });
    } catch {
      // Silently swallow all errors — never affect the visitor
    }
  });
}
