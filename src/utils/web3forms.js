const WEB3FORMS_ACCESS_KEY = "d2267688-69b3-4316-957e-5d33cd944cc7";

export async function submitToWeb3Forms(data) {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ access_key: WEB3FORMS_ACCESS_KEY, ...data }),
  });

  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.message || "Submission failed. Please try again.");
  }
  return result;
}
