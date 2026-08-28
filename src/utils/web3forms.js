import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const WEB3FORMS_ACCESS_KEY = "8c99ad2a-3d0f-415b-bf4b-4d011d8b0fa7";

export async function submitToWeb3Forms(data) {
  // ── 1. Send via Web3Forms (email notification) ────────────────────────
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ access_key: WEB3FORMS_ACCESS_KEY, ...data }),
  });

  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.message || "Submission failed. Please try again.");
  }

  // ── 2. Also save to Firestore (visible in admin Enquiries panel) ───────
  try {
    // Strip any internal fields before saving
    const { access_key, ...cleanData } = data; // eslint-disable-line no-unused-vars
    await addDoc(collection(db, "enquiries"), {
      ...cleanData,
      status: "new",
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    // Never let a Firestore error break the form submission for the visitor
    console.warn("[Fun Holidays] Firestore save skipped:", err.message);
  }

  return result;
}
