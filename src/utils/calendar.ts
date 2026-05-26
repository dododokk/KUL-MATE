export { filterEventsForUser } from "../api/calendar/type";

export function toDateStr(isoString: string): string {
  return isoString.replace(" ", "T").slice(0, 10);
}

export function getCalendarCells(year: number, month: number): (number | null)[] {
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  return [
    ...Array<null>(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
}

export function getEventsForDate<T extends { date: string }>(
  events: T[],
  dateStr: string,
): T[] {
  return events.filter((e) => e.date === dateStr);
}
