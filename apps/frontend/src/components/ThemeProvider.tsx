import { useEffect } from "react";
import useConfigStore from "../state/state-management";
import {
  APPEARANCE_STORAGE_KEY,
  resolveAppearance,
  type AppearancePreference,
} from "../utils/appearance";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const currentThemeId = useConfigStore((state) => state.config.theme);
  const currentFontId = useConfigStore((state) => state.config.font);
  const currentStyleMode = useConfigStore((state) => state.config.styleMode);
  const appearance = useConfigStore((state) => state.config.appearance) as AppearancePreference;

  useEffect(() => {
    document.documentElement.dataset.theme = currentThemeId;
    document.documentElement.dataset.font = currentFontId;
    document.documentElement.dataset.styleMode = currentStyleMode;
  }, [currentThemeId, currentFontId, currentStyleMode]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const applyAppearance = () => {
      const resolved = resolveAppearance(appearance, media.matches);
      document.documentElement.dataset.appearance = resolved;
      document.documentElement.style.colorScheme = resolved;
      localStorage.setItem(APPEARANCE_STORAGE_KEY, appearance);
    };

    applyAppearance();

    if (appearance !== "system") {
      return undefined;
    }

    media.addEventListener("change", applyAppearance);
    return () => media.removeEventListener("change", applyAppearance);
  }, [appearance]);

  return <>{children}</>;
}
