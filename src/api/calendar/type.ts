export type CalendarEventType =
  | "MOVE_IN"
  | "MOVE_OUT"
  | "INSPECTION"
  | "EVENT"
  | "MY_SCHEDULE"
  | "ROOMMATE_SCHEDULE";

export type OwnerType = "ME" | "ROOMMATE";

export interface CalendarEvent {
  eventId: number;
  ownerId: number;
  ownerNickname: string;
  roommateId: number;
  roommateNickname: string;
  ownerType: OwnerType;
  type: CalendarEventType;
  title: string;
  description: string;
  startAt: string;
  endAt: string;
  createdAt: string;
}

export type GetCalendarEventsResponse = CalendarEvent[];

export interface CreateCalendarEventRequest {
  title: string;
  description: string;
  startAt: string;
  endAt: string;
  type: CalendarEventType;
}

// MY_SCHEDULE·ROOMMATE_SCHEDULE은 ownerId 또는 roommateId가 나인 경우만 표시
// 나머지 type은 모두에게 표시
export function filterEventsForUser(
  events: CalendarEvent[],
  currentUserId: number,
): CalendarEvent[] {
  return events.filter((e) => {
    if (e.type === "MY_SCHEDULE" || e.type === "ROOMMATE_SCHEDULE") {
      return e.ownerId === currentUserId || e.roommateId === currentUserId;
    }
    return e.ownerId === currentUserId;
  });
}

// 캘린더 색상 구분
export const EVENT_TYPE_COLOR: Record<CalendarEventType, string> = {
  MOVE_IN: "#7a9e82",
  MOVE_OUT: "#e07b7b",
  INSPECTION: "#f0a04b",
  EVENT: "#f0a04b",        // INSPECTION과 동일
  MY_SCHEDULE: "#60a5fa",
  ROOMMATE_SCHEDULE: "#a78bfa",
};
