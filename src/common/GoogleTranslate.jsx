import { useEffect, useRef, useState } from "react";
import { FaGlobe, FaSearch } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";

// Full set of languages supported by the Google Translate widget.
const LANGUAGES = [
  { code: "af", label: "Afrikaans" },
  { code: "sq", label: "Albanian" },
  { code: "am", label: "Amharic" },
  { code: "ar", label: "Arabic", flag: "sa" },
  { code: "hy", label: "Armenian" },
  { code: "as", label: "Assamese" },
  { code: "ay", label: "Aymara" },
  { code: "az", label: "Azerbaijani" },
  { code: "bm", label: "Bambara" },
  { code: "eu", label: "Basque" },
  { code: "be", label: "Belarusian" },
  { code: "bn", label: "Bengali" },
  { code: "bho", label: "Bhojpuri" },
  { code: "bs", label: "Bosnian" },
  { code: "bg", label: "Bulgarian" },
  { code: "ca", label: "Catalan" },
  { code: "ceb", label: "Cebuano" },
  { code: "ny", label: "Chichewa" },
  { code: "zh-CN", label: "Chinese (Simplified)", flag: "cn" },
  { code: "zh-TW", label: "Chinese (Traditional)", flag: "cn" },
  { code: "co", label: "Corsican" },
  { code: "hr", label: "Croatian" },
  { code: "cs", label: "Czech" },
  { code: "da", label: "Danish" },
  { code: "dv", label: "Dhivehi" },
  { code: "doi", label: "Dogri" },
  { code: "nl", label: "Dutch", flag: "nl" },
  { code: "en", label: "English", flag: "gb" },
  { code: "eo", label: "Esperanto" },
  { code: "et", label: "Estonian" },
  { code: "ee", label: "Ewe" },
  { code: "fil", label: "Filipino" },
  { code: "fi", label: "Finnish" },
  { code: "fr", label: "French", flag: "fr" },
  { code: "fy", label: "Frisian" },
  { code: "gl", label: "Galician" },
  { code: "ka", label: "Georgian" },
  { code: "de", label: "German", flag: "de" },
  { code: "el", label: "Greek" },
  { code: "gn", label: "Guarani" },
  { code: "gu", label: "Gujarati" },
  { code: "ht", label: "Haitian Creole" },
  { code: "ha", label: "Hausa" },
  { code: "haw", label: "Hawaiian" },
  { code: "iw", label: "Hebrew" },
  { code: "hi", label: "Hindi", flag: "in" },
  { code: "hmn", label: "Hmong" },
  { code: "hu", label: "Hungarian" },
  { code: "is", label: "Icelandic" },
  { code: "ig", label: "Igbo" },
  { code: "ilo", label: "Ilocano" },
  { code: "id", label: "Indonesian" },
  { code: "ga", label: "Irish" },
  { code: "it", label: "Italian", flag: "it" },
  { code: "ja", label: "Japanese", flag: "jp" },
  { code: "jw", label: "Javanese" },
  { code: "kn", label: "Kannada" },
  { code: "kk", label: "Kazakh" },
  { code: "km", label: "Khmer" },
  { code: "rw", label: "Kinyarwanda" },
  { code: "gom", label: "Konkani" },
  { code: "ko", label: "Korean", flag: "kr" },
  { code: "kri", label: "Krio" },
  { code: "ku", label: "Kurdish (Kurmanji)" },
  { code: "ckb", label: "Kurdish (Sorani)" },
  { code: "ky", label: "Kyrgyz" },
  { code: "lo", label: "Lao" },
  { code: "la", label: "Latin" },
  { code: "lv", label: "Latvian" },
  { code: "ln", label: "Lingala" },
  { code: "lt", label: "Lithuanian" },
  { code: "lg", label: "Luganda" },
  { code: "lb", label: "Luxembourgish" },
  { code: "mk", label: "Macedonian" },
  { code: "mai", label: "Maithili" },
  { code: "mg", label: "Malagasy" },
  { code: "ms", label: "Malay" },
  { code: "ml", label: "Malayalam" },
  { code: "mt", label: "Maltese" },
  { code: "mi", label: "Maori" },
  { code: "mr", label: "Marathi" },
  { code: "mni-Mtei", label: "Meiteilon (Manipuri)" },
  { code: "lus", label: "Mizo" },
  { code: "mn", label: "Mongolian" },
  { code: "my", label: "Myanmar (Burmese)" },
  { code: "ne", label: "Nepali" },
  { code: "no", label: "Norwegian" },
  { code: "or", label: "Odia (Oriya)" },
  { code: "om", label: "Oromo" },
  { code: "ps", label: "Pashto" },
  { code: "fa", label: "Persian" },
  { code: "pl", label: "Polish" },
  { code: "pt", label: "Portuguese", flag: "pt" },
  { code: "pa", label: "Punjabi" },
  { code: "qu", label: "Quechua" },
  { code: "ro", label: "Romanian" },
  { code: "ru", label: "Russian", flag: "ru" },
  { code: "sm", label: "Samoan" },
  { code: "sa", label: "Sanskrit" },
  { code: "gd", label: "Scots Gaelic" },
  { code: "nso", label: "Sepedi" },
  { code: "sr", label: "Serbian" },
  { code: "st", label: "Sesotho" },
  { code: "sn", label: "Shona" },
  { code: "sd", label: "Sindhi" },
  { code: "si", label: "Sinhala", flag: "lk" },
  { code: "sk", label: "Slovak" },
  { code: "sl", label: "Slovenian" },
  { code: "so", label: "Somali" },
  { code: "es", label: "Spanish", flag: "es" },
  { code: "su", label: "Sundanese" },
  { code: "sw", label: "Swahili" },
  { code: "sv", label: "Swedish" },
  { code: "tg", label: "Tajik" },
  { code: "ta", label: "Tamil", flag: "lk" },
  { code: "tt", label: "Tatar" },
  { code: "te", label: "Telugu" },
  { code: "th", label: "Thai" },
  { code: "ti", label: "Tigrinya" },
  { code: "ts", label: "Tsonga" },
  { code: "tr", label: "Turkish" },
  { code: "tk", label: "Turkmen" },
  { code: "ak", label: "Twi (Akan)" },
  { code: "uk", label: "Ukrainian" },
  { code: "ur", label: "Urdu" },
  { code: "ug", label: "Uyghur" },
  { code: "uz", label: "Uzbek" },
  { code: "vi", label: "Vietnamese" },
  { code: "cy", label: "Welsh" },
  { code: "xh", label: "Xhosa" },
  { code: "yi", label: "Yiddish" },
  { code: "yo", label: "Yoruba" },
  { code: "zu", label: "Zulu" },
];

const POPULAR_CODES = [
  "en", "fr", "de", "es", "it", "ru", "zh-CN", "ja", "ar", "hi", "si", "ta",
];
const POPULAR_LANGUAGES = POPULAR_CODES.map((code) =>
  LANGUAGES.find((l) => l.code === code)
);

const getCookieLang = () => {
  const match = document.cookie.match(/googtrans=\/en\/([a-zA-Z-]+)/);
  return match ? match[1] : "en";
};

const GoogleTranslate = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [current, setCurrent] = useState(getCookieLang);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!document.getElementById("google-translate-script")) {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
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
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const changeLanguage = (code) => {
    setCurrent(code);
    setOpen(false);
    setQuery("");

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

  const filteredLanguages = query.trim()
    ? LANGUAGES.filter((l) =>
        l.label.toLowerCase().includes(query.trim().toLowerCase())
      ).slice(0, 8)
    : POPULAR_LANGUAGES;

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
        <div className="absolute right-0 top-full mt-2 w-52 bg-[#1a1a1a] border border-white/10 rounded-md shadow-lg z-[60] overflow-hidden">
          <div className="flex items-center gap-2 px-2.5 py-2 border-b border-white/10">
            <FaSearch className="text-gray-500 text-xs shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search language..."
              className="bg-transparent outline-none text-xs text-white placeholder-gray-500 w-full"
            />
          </div>

          <div className="py-1 max-h-64 overflow-y-auto">
            {filteredLanguages.length === 0 && (
              <p className="px-3 py-2 text-xs text-gray-500">No language found</p>
            )}
            {filteredLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left hover:bg-white/10 transition ${
                  lang.code === current ? "text-orange-500" : "text-gray-300"
                }`}
              >
                {lang.flag ? (
                  <span className={`fi fi-${lang.flag} rounded shrink-0`}></span>
                ) : (
                  <FaGlobe className="text-gray-500 shrink-0" />
                )}
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleTranslate;
