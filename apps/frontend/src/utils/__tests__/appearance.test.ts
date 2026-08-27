import { describe, expect, it } from "vitest";
import { resolveAppearance } from "../appearance";

describe("resolveAppearance", () => {
  it("follows a dark operating-system preference in system mode", () => {
    expect(resolveAppearance("system", true)).toBe("dark");
  });

  it("follows a light operating-system preference in system mode", () => {
    expect(resolveAppearance("system", false)).toBe("light");
  });

  it("keeps an explicit light preference", () => {
    expect(resolveAppearance("light", true)).toBe("light");
  });

  it("keeps an explicit dark preference", () => {
    expect(resolveAppearance("dark", false)).toBe("dark");
  });
});
