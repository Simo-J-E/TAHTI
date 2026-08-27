import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router-dom";
import Landing from "../pages/Landing";

const supportedLocales = ["en", "fi"] as const;
type SupportedLocale = (typeof supportedLocales)[number];

export default function LocaleLanding() {
  const { locale } = useParams<{ locale?: string }>();
  const { i18n } = useTranslation();
  const normalized = locale?.toLowerCase();
  const isSupported = Boolean(
    normalized && supportedLocales.includes(normalized as SupportedLocale),
  );

  useEffect(() => {
    if (isSupported && i18n.language !== normalized) {
      void i18n.changeLanguage(normalized);
    }
  }, [i18n, isSupported, normalized]);

  if (!isSupported) {
    return <Navigate to="/en" replace />;
  }

  return <Landing />;
}
