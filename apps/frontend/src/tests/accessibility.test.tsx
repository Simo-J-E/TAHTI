import axe from "axe-core";
import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Landing from "../pages/Landing";
import i18n from "../i18n";

describe("landing accessibility", () => {
  it("has no automated axe violations in the primary landing view", async () => {
    await i18n.changeLanguage("en");

    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter>
          <Landing />
        </MemoryRouter>
      </I18nextProvider>,
    );

    expect(screen.getByRole("heading", { level: 1, name: "TAHTI" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /open timetable/i })).toBeInTheDocument();

    const result = await axe.run(document.body, {
      rules: {
        "color-contrast": { enabled: false },
      },
    });

    expect(result.violations).toEqual([]);
  });
});
