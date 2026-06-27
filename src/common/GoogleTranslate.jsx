import { useEffect, useRef, useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";

const LANGUAGES = [
  { code: "en", label: "English", flag: "gb" },
  { code: "fr", label: "French", flag: "fr" },
  { code: "de", label: "German", flag: "de" },
  { code: "es", label: "Spanish", flag: "es" },
  { code: "it", label: "Italian", flag: "it" },
  { code: "ru", label: "Russian", flag: "ru" },
  { code: "zh-CN", label: "Chinese", flag: "cn" },
  { code: "ja", label: "Japanese", flag: "jp" },
  { code: "ar", label: "Arabic", flag: "sa" },
  { code: "hi", label: "Hindi", flag: "in" },
  { code: "si", label: "Sinhala", flag: "lk" },
  { code: "ta", label: "Tamil", flag: "lk" },
];

const getCookieLang = () => {
  const match = document.cookie.match(/googtrans=\/en\/([a-zA-Z-]+)/);
  return match ? match[1] : "en";
};

const GoogleTranslate = () => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(getCookieLang);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!document.getElementById("google-translate-script")) {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: LANGUAGES.map((l) => l.code).join(","),
            autoDisplay: false,
          },
          "google_translate_element"
        );
      };

      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    const handleClickOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (code) => {
    setCurrent(code);
    setOpen(false);

    document.cookie = `googtrans=/en/${code};path=/`;
    document.cookie = `googtrans=/en/${code};path=/;domain=${window.location.hostname}`;

    const select = document.querySelector(".goog-te-combo");
    if (select) {
      select.value = code;
      select.dispatchEvent(new Event("change"));
    } else {
      window.location.reload();
    }
  };

  const activeLang = LANGUAGES.find((l) => l.code === current) || LANGUAGES[0];

  return (
    <div className="relative" ref={wrapRef}>
      <div id="google_translate_element" className="hidden" />

      <button
        onClick={() => setOpen((o) => !o)}
        className="hidden sm:flex items-center gap-1 text-gray-300 hover:text-white transition"
      >
        <FaGlobe className="text-orange-500" />
        <span className="text-xs">{activeLang.label}</span>
        <IoChevronDown className="text-xs" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-40 bg-[#1a1a1a] border border-white/10 rounded-md shadow-lg py-1 z-[60] max-h-64 overflow-y-auto">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left hover:bg-white/10 transition ${
                lang.code === current ? "text-orange-500" : "text-gray-300"
              }`}
            >
              <span className={`fi fi-${lang.flag} rounded`}></span>
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GoogleTranslate;
