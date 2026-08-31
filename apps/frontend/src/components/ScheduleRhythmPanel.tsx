import { format, isToday } from "date-fns";
import {
  Activity,
  CalendarClock,
  Clock3,
  TimerReset,
} from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { ScheduleEvent } from "../types/schedule";

interface ScheduleRhythmPanelProps {
  date: Date;
  events: ScheduleEvent[];
}

const formatTime = (date: Date, locale: string) => {
  try {
    return new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch {
    return format(date, "HH:mm");
  }
};

const formatDuration = (minutes: number, t: (key: string, options?: Record<string, unknown>) => string) => {
  const safeMinutes = Math.max(0, Math.round(minutes));
  const hours = Math.floor(safeMinutes / 60);
  const mins = safeMinutes % 60;

  if (hours > 0 && mins > 0) {
    return t("rhythm.duration.hoursMinutes", { hours, minutes: mins });
  }

  if (hours > 0) {
    return t("rhythm.duration.hours", { hours });
  }

  return t("rhythm.duration.minutes", { minutes: mins });
};

export function ScheduleRhythmPanel({ date, events }: ScheduleRhythmPanelProps) {
  const { t, i18n } = useTranslation("schedule");

  const insight = useMemo(() => {
    const sortedEvents = [...events].sort(
      (a, b) => a.startTime.getTime() - b.startTime.getTime(),
    );
    const now = new Date();
    const firstEvent = sortedEvents[0] ?? null;
    const lastEvent = sortedEvents.at(-1) ?? null;
    const activeEvent = sortedEvents.find(
      (event) => event.startTime <= now && event.endTime > now,
    ) ?? null;
    const nextEvent = sortedEvents.find((event) => event.startTime > now) ?? null;
    const totalMinutes = sortedEvents.reduce((sum, event) => {
      return sum + Math.max(0, event.endTime.getTime() - event.startTime.getTime()) / 60000;
    }, 0);

    let freeWindowLabel: string | null = null;

    if (activeEvent) {
      const upcomingAfterActive = sortedEvents.find(
        (event) => event.startTime >= activeEvent.endTime && event.id !== activeEvent.id,
      );
      if (upcomingAfterActive) {
        const gapMinutes = (upcomingAfterActive.startTime.getTime() - activeEvent.endTime.getTime()) / 60000;
        freeWindowLabel = t("rhythm.freeAfter", {
          duration: formatDuration(gapMinutes, t),
          time: formatTime(upcomingAfterActive.startTime, i18n.language),
        });
      } else {
        freeWindowLabel = t("rhythm.noMoreAfterCurrent");
      }
    } else if (nextEvent) {
      const minutesUntilNext = (nextEvent.startTime.getTime() - now.getTime()) / 60000;
      freeWindowLabel = t("rhythm.startsIn", {
        duration: formatDuration(minutesUntilNext, t),
      });
    } else if (sortedEvents.length > 0) {
      freeWindowLabel = t("rhythm.dayDone");
    }

    return {
      isCurrentDay: isToday(date),
      firstEvent,
      lastEvent,
      activeEvent,
      nextEvent,
      totalMinutes,
      eventCount: sortedEvents.length,
      freeWindowLabel,
    };
  }, [date, events, i18n.language, t]);

  const headline = insight.isCurrentDay
    ? t("rhythm.today")
    : format(date, i18n.language === "fi" ? "d.M.yyyy" : "MMM d, yyyy");

  const rhythmCardClass =
    "style-surface rounded-xl border border-[var(--color-border-alpha-30)] bg-[var(--color-surface-alpha-40)] p-4";

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-4 md:py-5" aria-label={t("rhythm.sectionLabel")}>
      <div className="grid gap-3 lg:grid-cols-[1.3fr_repeat(3,1fr)]">
        <div className={`${rhythmCardClass} tahti-hero-card`}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                {headline}
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-[var(--color-text)]">
                {insight.activeEvent
                  ? t("rhythm.now")
                  : insight.nextEvent
                    ? t("rhythm.next")
                    : t("rhythm.emptyHeadline")}
              </h2>
            </div>
            <span className="tahti-pulse inline-flex h-3 w-3 rounded-full bg-[var(--color-accent)]" />
          </div>

          {insight.activeEvent || insight.nextEvent ? (
            <div className="mt-4 rounded-lg border border-[var(--color-border-alpha-30)] bg-[var(--color-background-alpha-60)] p-4">
              <p className="text-lg font-bold text-[var(--color-text)]">
                {(insight.activeEvent ?? insight.nextEvent)?.title}
              </p>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                {formatTime((insight.activeEvent ?? insight.nextEvent)!.startTime, i18n.language)}–
                {formatTime((insight.activeEvent ?? insight.nextEvent)!.endTime, i18n.language)}
              </p>
              {!!(insight.activeEvent ?? insight.nextEvent)?.location && (
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  {(insight.activeEvent ?? insight.nextEvent)?.location}
                </p>
              )}
              {insight.freeWindowLabel && (
                <p className="mt-3 text-sm font-semibold text-[var(--color-accent)]">
                  {insight.freeWindowLabel}
                </p>
              )}
            </div>
          ) : (
            <p className="mt-4 text-sm leading-6 text-[var(--color-text-secondary)]">
              {insight.eventCount > 0 ? t("rhythm.dayDone") : t("rhythm.noEvents")}
            </p>
          )}
        </div>

        <div className={rhythmCardClass}>
          <div className="flex items-center gap-2 text-[var(--color-accent)]">
            <Clock3 className="h-4 w-4" />
            <p className="text-xs font-bold uppercase tracking-[0.15em]">{t("rhythm.firstClass")}</p>
          </div>
          <p className="mt-3 text-xl font-bold text-[var(--color-text)]">
            {insight.firstEvent ? formatTime(insight.firstEvent.startTime, i18n.language) : "—"}
          </p>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)] line-clamp-2">
            {insight.firstEvent?.title ?? t("rhythm.noEvents")}
          </p>
        </div>

        <div className={rhythmCardClass}>
          <div className="flex items-center gap-2 text-[var(--color-accent)]">
            <CalendarClock className="h-4 w-4" />
            <p className="text-xs font-bold uppercase tracking-[0.15em]">{t("rhythm.summary")}</p>
          </div>
          <p className="mt-3 text-xl font-bold text-[var(--color-text)]">
            {t("rhythm.eventCount", { count: insight.eventCount })}
          </p>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            {t("rhythm.totalTime", {
              duration: formatDuration(insight.totalMinutes, t),
            })}
          </p>
        </div>

        <div className={rhythmCardClass}>
          <div className="flex items-center gap-2 text-[var(--color-accent)]">
            {insight.lastEvent ? <TimerReset className="h-4 w-4" /> : <Activity className="h-4 w-4" />}
            <p className="text-xs font-bold uppercase tracking-[0.15em]">{t("rhythm.dayEnds")}</p>
          </div>
          <p className="mt-3 text-xl font-bold text-[var(--color-text)]">
            {insight.lastEvent ? formatTime(insight.lastEvent.endTime, i18n.language) : "—"}
          </p>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)] line-clamp-2">
            {insight.lastEvent?.title ?? t("rhythm.restDay")}
          </p>
        </div>
      </div>
    </section>
  );
}
