import {
  ArrowRight,
  Languages,
  MoonStar,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LanguageSelector from "../components/LanguageSelector";

const demoEvents = [
  { time: "08:00–10:00", titleKey: "preview.software", room: "ICT-City · Lambda" },
  { time: "12:00–14:00", titleKey: "preview.math", room: "EduCity" },
  { time: "15:00–16:30", titleKey: "preview.project", room: "ICT-City" },
] as const;

const previewStyles = [
  { id: "wilma", accentClass: "bg-sky-500", titleKey: "styles.wilma.title", textKey: "styles.wilma.text" },
  { id: "futuristic", accentClass: "bg-cyan-400", titleKey: "styles.futuristic.title", textKey: "styles.futuristic.text" },
  { id: "oldschool", accentClass: "bg-amber-400", titleKey: "styles.oldschool.title", textKey: "styles.oldschool.text" },
  { id: "cartoon", accentClass: "bg-pink-400", titleKey: "styles.cartoon.title", textKey: "styles.cartoon.text" },
  { id: "animated", accentClass: "bg-emerald-400", titleKey: "styles.animated.title", textKey: "styles.animated.text" },
  { id: "focus", accentClass: "bg-violet-400", titleKey: "styles.focus.title", textKey: "styles.focus.text" },
] as const;

export default function Landing() {
  const { t } = useTranslation("landing");
  const symbolSrc = `${import.meta.env.BASE_URL}brand/tahti-symbol.svg`;

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] tahti-grid-pattern">
      <header className="border-b border-[var(--color-border-alpha-30)] bg-[var(--color-background-alpha-80)]">
        <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link to="/" className="inline-flex items-center gap-2" aria-label="TAHTI">
            <img src={symbolSrc} alt="" className="h-9 w-9" />
            <span className="text-lg font-black tracking-[0.08em]">TAHTI</span>
          </Link>
          <LanguageSelector />
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-24">
          <div className="max-w-xl">
            <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--tahti-brand-text)]">
              {t("hero.eyebrow")}
            </p>
            <h1 className="max-w-[11ch] text-5xl font-black uppercase leading-[0.92] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              {t("hero.title")}
            </h1>
            <p className="mt-6 max-w-[42rem] text-base leading-7 text-[var(--color-text-secondary)] sm:text-lg">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/app"
                className="style-cta inline-flex min-h-11 items-center gap-2 rounded-[var(--tahti-radius-sm)] bg-[var(--color-accent)] px-5 py-3 font-bold text-[var(--color-accent-text)] transition-[filter] hover:brightness-95"
              >
                {t("hero.cta")}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <span className="text-sm text-[var(--color-text-secondary)]">{t("hero.note")}</span>
            </div>
          </div>

          <section
            className="style-surface overflow-hidden rounded-[var(--tahti-radius-lg)] border border-[var(--color-border-alpha-50)] bg-[var(--color-surface)] shadow-[0_16px_50px_rgba(0,0,0,0.12)]"
            aria-label={t("preview.label")}
          >
            <div className="flex items-center justify-between border-b border-[var(--color-border-alpha-30)] px-4 py-3 sm:px-5">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                  {t("preview.week")}
                </div>
                <div className="mt-1 font-bold">{t("preview.date")}</div>
              </div>
              <div className="rounded-[var(--tahti-radius-sm)] border border-[var(--color-border-alpha-50)] px-3 py-1.5 text-xs font-semibold">
                {t("preview.today")}
              </div>
            </div>

            <div className="grid grid-cols-[56px_1fr] sm:grid-cols-[72px_1fr]">
              <div className="border-r border-[var(--color-border-alpha-30)] bg-[var(--color-surface-secondary-alpha-10)]">
                {["08", "10", "12", "14", "16"].map((hour) => (
                  <div
                    key={hour}
                    className="h-20 border-b border-[var(--color-border-alpha-20)] px-2 pt-2 text-[11px] font-semibold text-[var(--color-text-secondary)] sm:px-3"
                  >
                    {hour}:00
                  </div>
                ))}
              </div>

              <div className="relative min-h-[400px] bg-[linear-gradient(to_bottom,var(--color-border-alpha-20)_1px,transparent_1px)] bg-[length:100%_80px] p-3 sm:p-4">
                {demoEvents.map((event, index) => (
                  <div
                    key={event.titleKey}
                    className="absolute left-3 right-3 rounded-[var(--tahti-radius-sm)] border-l-4 border-[var(--color-accent)] bg-[var(--color-surface-secondary)] px-3 py-2 shadow-sm sm:left-4 sm:right-4"
                    style={{ top: `${12 + index * 120}px` }}
                  >
                    <div className="text-[11px] font-bold text-[var(--color-text-secondary)]">
                      {event.time}
                    </div>
                    <div className="mt-0.5 truncate text-sm font-bold">{t(event.titleKey)}</div>
                    <div className="mt-1 truncate text-xs text-[var(--color-text-secondary)]">
                      {event.room}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </section>

        <section className="border-y border-[var(--color-border-alpha-30)] bg-[var(--color-surface-alpha-40)]">
          <div className="mx-auto grid max-w-6xl gap-0 px-4 sm:grid-cols-3 sm:px-6">
            {[
              { icon: ShieldCheck, title: t("features.accessible.title"), text: t("features.accessible.text") },
              { icon: MoonStar, title: t("features.appearance.title"), text: t("features.appearance.text") },
              { icon: Languages, title: t("features.languages.title"), text: t("features.languages.text") },
            ].map(({ icon: Icon, title, text }, index) => (
              <div
                key={title}
                className={`py-7 sm:px-7 ${index > 0 ? "border-t border-[var(--color-border-alpha-30)] sm:border-l sm:border-t-0" : ""}`}
              >
                <Icon aria-hidden="true" className="h-5 w-5 text-[var(--color-accent)]" />
                <h2 className="mt-3 text-base font-bold">{title}</h2>
                <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex items-center gap-2 text-[var(--color-accent)]">
            <Sparkles className="h-5 w-5" />
            <h2 className="text-xl font-bold">{t("styles.title")}</h2>
          </div>
          <p className="mt-3 max-w-3xl leading-7 text-[var(--color-text-secondary)]">{t("styles.subtitle")}</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {previewStyles.map((style) => (
              <article key={style.id} className={`style-surface style-preview-card style-preview-${style.id} rounded-2xl border border-[var(--color-border-alpha-30)] p-4`}>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-bold text-[var(--color-text)]">{t(style.titleKey)}</h3>
                  <span className={`h-3 w-3 rounded-full ${style.accentClass}`} />
                </div>
                <div className="mt-4 rounded-xl border border-[var(--color-border-alpha-30)] p-3">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
                    <span>TAHTI</span>
                    <span>09:41</span>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="rounded-lg border border-[var(--color-border-alpha-30)] px-3 py-2">
                      <p className="text-xs text-[var(--color-text-secondary)]">10:15–11:45</p>
                      <p className="font-bold text-[var(--color-text)]">{t("preview.software")}</p>
                    </div>
                    <div className="rounded-lg border border-[var(--color-border-alpha-30)] px-3 py-2 bg-[var(--color-surface-secondary-alpha-20)]">
                      <p className="text-xs text-[var(--color-text-secondary)]">12:15–14:00</p>
                      <p className="font-bold text-[var(--color-text)]">{t("preview.math")}</p>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-[var(--color-text-secondary)]">{t(style.textKey)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
          <h2 className="text-xl font-bold">{t("about.title")}</h2>
          <p className="mt-3 max-w-3xl leading-7 text-[var(--color-text-secondary)]">{t("about.p1")}</p>
          <p className="mt-2 max-w-3xl leading-7 text-[var(--color-text-secondary)]">{t("about.p2")}</p>
        </section>
      </main>
    </div>
  );
}
