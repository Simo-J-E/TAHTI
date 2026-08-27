import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import colorCustomizationEn from "../locales/en/colorCustomization.json";
// Import translation resources statically for now
import commonEn from "../locales/en/common.json";
import dialogsEn from "../locales/en/dialogs.json";
import landingEn from "../locales/en/landing.json";
import scheduleEn from "../locales/en/schedule.json";
import settingsEn from "../locales/en/settings.json";
import colorCustomizationFi from "../locales/fi/colorCustomization.json";
import commonFi from "../locales/fi/common.json";
import dialogsFi from "../locales/fi/dialogs.json";
import landingFi from "../locales/fi/landing.json";
import scheduleFi from "../locales/fi/schedule.json";
import settingsFi from "../locales/fi/settings.json";

const getPathLocale = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const hashMatch = window.location.hash.match(/^#\/(en|fi)(?:\/|$)/i);
  if (hashMatch) {
    return hashMatch[1].toLowerCase();
  }

  const pathSegments = window.location.pathname.split("/").filter(Boolean);
  const lastSegment = pathSegments.at(-1)?.toLowerCase();
  return lastSegment && ["en", "fi"].includes(lastSegment) ? lastSegment : null;
};

// Language detection order: URL -> localStorage -> navigator -> fallback
const getInitialLanguage = (): string => {
  const pathLocale = getPathLocale();
  if (pathLocale && ["en", "fi"].includes(pathLocale)) {
    return pathLocale;
  }

  // Check TAHTI preference first, then migrate the legacy key when present.
  const stored =
    localStorage.getItem("tahti-language") ?? localStorage.getItem("lukkari-language");
  if (stored && ["en", "fi"].includes(stored)) {
    return stored;
  }

  // Respect the browser's ordered language preferences.
  const browserLanguages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];
  const preferred = browserLanguages
    .map((language) => language.split("-")[0].toLowerCase())
    .find((language) => ["en", "fi"].includes(language));

  return preferred ?? "en";
};

i18n.use(initReactI18next).init({
  lng: getInitialLanguage(),
  fallbackLng: "en",

  // Supported languages
  supportedLngs: ["en", "fi"],

  // Namespace configuration
  defaultNS: "common",
  ns: [
    "common",
    "schedule",
    "settings",
    "dialogs",
    "colorCustomization",
    "landing",
  ],

  interpolation: {
    escapeValue: false, // React already escapes
  },

  // Static resources
  resources: {
    en: {
      common: commonEn,
      schedule: scheduleEn,
      settings: settingsEn,
      dialogs: dialogsEn,
      colorCustomization: colorCustomizationEn,
      landing: landingEn,
    },
    fi: {
      common: commonFi,
      schedule: scheduleFi,
      settings: settingsFi,
      dialogs: dialogsFi,
      colorCustomization: colorCustomizationFi,
      landing: landingFi,
    },
  },

  // Development settings
  debug: import.meta.env.DEV,

  react: {
    useSuspense: false, // Avoid suspense for now
  },
});

// Language change handler
i18n.on("languageChanged", (lng: string) => {
  // Persist to localStorage
  localStorage.setItem("tahti-language", lng);

  // Update html lang attribute for a11y
  document.documentElement.lang = lng;
});

// Utility to load namespace dynamically (for future use)
export const loadNamespace = async (ns: string, lng?: string) => {
  const language = lng || i18n.language;

  if (!i18n.hasResourceBundle(language, ns)) {
    try {
      const resource = await import(`../locales/${language}/${ns}.json`);
      i18n.addResources(language, ns, resource.default || resource);

      // Also ensure we have fallback language resources
      if (language !== "en") {
        const fallbackResource = await import(`../locales/en/${ns}.json`);
        i18n.addResources(
          "en",
          ns,
          fallbackResource.default || fallbackResource,
        );
      }
    } catch (error) {
      console.warn(
        `Failed to load namespace ${ns} for language ${language}:`,
        error,
      );
    }
  }

  return i18n.loadNamespaces(ns);
};

export default i18n;
