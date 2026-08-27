export type AppearancePreference = "system" | "light" | "dark";
export type ResolvedAppearance = "light" | "dark";

export const APPEARANCE_STORAGE_KEY = "tahti-appearance";

export function isAppearancePreference(value: unknown): value is AppearancePreference {
  return value === "system" || value === "light" || value === "dark";
}

export function resolveAppearance(
  preference: AppearancePreference,
  systemPrefersDark: boolean,
): ResolvedAppearance {
  if (preference === "system") {
    return systemPrefersDark ? "dark" : "light";
  }

  return preference;
}
