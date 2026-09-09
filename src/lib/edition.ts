// The second edition has its own publication date. Until then it stays sealed.
export const SECOND_EDITION_DATE = new Date("2026-11-28T00:00:00+05:30");

export const SECOND_EDITION_DATE_LABEL = "28 November 2026";

export function secondEditionOpen(now: Date = new Date()) {
  return now.getTime() >= SECOND_EDITION_DATE.getTime();
}

export function daysUntilSecondEdition(now: Date = new Date()) {
  const ms = SECOND_EDITION_DATE.getTime() - now.getTime();
  return Math.max(0, Math.ceil(ms / 86_400_000));
}
