import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setLanguage, type Language } from "@/store/i18nSlice";
import { twMerge } from "tailwind-merge";

interface LanguageSwitchProps {
  compact?: boolean;
  flagsOnly?: boolean;
  bgClassName?: string;
  selectedLanguage?: Language;
  onLanguageChange?: (lang: Language) => void;
}

const UKFlag = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 60 30"
    xmlns="http://www.w3.org/2000/svg"
  >
    <clipPath id="uk">
      <path d="M0,0 v30 h60 v-30 z" />
    </clipPath>
    <clipPath id="uk-diag">
      <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
    </clipPath>
    <g clipPath="url(#uk)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path
        d="M0,0 L60,30 M60,0 L0,30"
        clipPath="url(#uk-diag)"
        stroke="#C8102E"
        strokeWidth="4"
      />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
);

const BGFlag = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 5 3"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="5" height="3" fill="#fff" />
    <rect width="5" height="2" y="1" fill="#00966E" />
    <rect width="5" height="1" y="2" fill="#D62612" />
  </svg>
);

const languages: { code: Language; label: string; Flag: typeof UKFlag }[] = [
  { code: "en", label: "EN", Flag: UKFlag },
  { code: "bg", label: "BG", Flag: BGFlag },
];

export function LanguageSwitch({
  compact = false,
  flagsOnly = false,
  bgClassName,
  selectedLanguage,
  onLanguageChange,
}: LanguageSwitchProps) {
  const dispatch = useAppDispatch();
  const reduxLanguage = useAppSelector((state) => state.i18n.language);
  const { i18n } = useTranslation();

  const isControlled =
    selectedLanguage !== undefined && onLanguageChange !== undefined;
  const currentLanguage = isControlled ? selectedLanguage : reduxLanguage;

  const handleLanguageChange = (lang: Language) => {
    if (isControlled) {
      onLanguageChange(lang);
    } else {
      dispatch(setLanguage(lang));
      i18n.changeLanguage(lang);
    }
  };

  if (compact) {
    // Compact toggle for sidebar (collapsed state) - just flag icon
    const currentLangData = languages.find((l) => l.code === currentLanguage);
    const nextLang = currentLanguage === "en" ? "bg" : "en";
    const CurrentFlag = currentLangData?.Flag || UKFlag;

    return (
      <button
        onClick={() => handleLanguageChange(nextLang)}
        className="
          group relative flex items-center justify-center w-10 h-10 
          rounded-xl bg-gradient-to-br from-slate-50 to-slate-100
          border border-slate-200/80 
          shadow-sm hover:shadow-md
          hover:border-green-300 hover:from-green-50 hover:to-emerald-50
          transition-all duration-300 ease-out
          overflow-hidden
        "
        title={`Switch to ${nextLang === "en" ? "English" : "Bulgarian"}`}
      >
        <div className="relative z-10 rounded-md overflow-hidden shadow-sm ring-1 ring-black/10">
          <CurrentFlag className="w-6 h-4" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 to-emerald-500/0 group-hover:from-green-400/10 group-hover:to-emerald-500/10 transition-all duration-300" />
      </button>
    );
  }

  // Full toggle for sidebar (expanded state) and settings - pill toggle style
  return (
    <div
      className={twMerge(
        `relative isolate inline-flex items-center p-1
        rounded-xl bg-slate-100/80 
        border border-slate-200/50 shadow-inner`,
        bgClassName
      )}
    >
      {/* Sliding Background Pill */}
      <div
        className={`
          absolute inset-y-1 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.0)]
          bg-white rounded-lg shadow-sm border border-slate-200/50 z-0
          ${
            currentLanguage === "en"
              ? "left-1 right-[50%]"
              : "left-[50%] right-1"
          }
        `}
      />

      {languages.map((lang) => {
        const isActive = currentLanguage === lang.code;
        const Flag = lang.Flag;

        return (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`
              relative z-10 flex-1 flex items-center justify-center gap-2 
              ${flagsOnly ? "px-3" : "px-5"} py-2 rounded-lg
              font-medium text-sm transition-colors duration-200
              ${
                isActive
                  ? "text-slate-900"
                  : "text-slate-500 hover:text-slate-700"
              }
            `}
          >
            {/* Flag */}
            <div
              className={`
              rounded overflow-hidden shadow-sm ring-1 ring-black/5 transition-opacity duration-200
              ${isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"}
            `}
            >
              <Flag className="w-5 h-3.5" />
            </div>

            {/* Label */}
            {!flagsOnly && (
              <span className="font-semibold tracking-wide text-xs sm:text-sm">
                {lang.label}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default LanguageSwitch;
