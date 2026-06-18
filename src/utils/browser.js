// Safari (desktop & iOS) can't decode either of the logo video's codecs (webm/VP9
// and mov/qtrle), which leaves the <video> showing a black box. Used to fall back
// to a static logo image on Safari instead.
export const isSafari = (() => {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /^((?!chrome|android|crios|fxios|edgios).)*safari/i.test(ua);
})();
