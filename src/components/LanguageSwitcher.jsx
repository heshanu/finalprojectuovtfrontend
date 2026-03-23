import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const currentLang = i18n.language;

  const languages = [
    { code: "en", label: "EN" },
    { code: "si", label: "සි" },
    { code: "ta", label: "த" }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50 flex space-x-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className={`px-3 py-1 rounded-lg border ${
            currentLang === lang.code
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}