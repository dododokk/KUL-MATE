import axiosInstance from "../axiosInstance";
import type { CalendarEvent, CreateCalendarEventRequest, GetCalendarEventsResponse } from "./type";

// 캘린더 일정 전체 조회 (GET /api/calendar-events)
export async function getCalendarEvents(): Promise<GetCalendarEventsResponse> {
  const { data } = await axiosInstance.get<GetCalendarEventsResponse>(
    "/api/calendar-events",
  );
  return data;
}

// 캘린더 일정 등록 (POST /api/calendar-events)
export async function createCalendarEvent(
  request: CreateCalendarEventRequest,
): Promise<CalendarEvent> {
  const { data } = await axiosInstance.post<CalendarEvent>(
    "/api/calendar-events",
    request,
  );
  return data;
}

// 캘린더 일정 삭제 (DELETE /api/calendar-events/{eventId})
export async function deleteCalendarEvent(eventId: number): Promise<void> {
  await axiosInstance.delete(`/api/calendar-events/${eventId}`);
}
