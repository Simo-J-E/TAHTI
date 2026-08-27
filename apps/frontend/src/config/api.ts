/**
 * Existing calendar/realization API contract. GitHub Pages hosts only the
 * static frontend; privileged/server-side work remains behind this API.
 */
const defaultApiBaseUrl = import.meta.env.DEV
  ? "http://localhost:3001/api"
  : "https://lukkari-api.juh.fi/api";

const defaultRealizationBaseUrl = import.meta.env.DEV
  ? "http://localhost:3001"
  : "https://lukkari-api.juh.fi";

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || defaultApiBaseUrl,
  REALIZATION_BASE_URL:
    import.meta.env.VITE_REALIZATION_API_BASE_URL || defaultRealizationBaseUrl,
};
