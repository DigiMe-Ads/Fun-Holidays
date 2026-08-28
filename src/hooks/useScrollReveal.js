import { useEffect } from "react";

/**
 * Animates an element from opacity:0 / translateY(24px) to visible when it
 * enters the viewport.
 *
 * Runs without a dependency array so it picks up elements that mount
 * asynchronously (e.g. after a Firestore fetch). The two early-exit guards
 * keep it fast on subsequent renders:
 *  1. ref.current null  → element not yet in DOM, skip.
 *  2. el.style.opacity already "1" → already animated, skip.
 */
const useScrollReveal = (ref, delay = 0) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;                       // element not mounted yet
    if (el.style.opacity === "1") return;  // already animated — don't re-observe

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }); // intentionally no dep array — re-runs each render until element is visible
};

export default useScrollReveal;