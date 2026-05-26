import { describe, it, expect } from "vitest";
import {
  filterEventsForUser,
  toDateStr,
  getCalendarCells,
  getEventsForDate,
} from "../utils/calendar";
import type { CalendarEvent } from "../api/calendar/type";

// ── filterEventsForUser ──────────────────────────────────────────────────────

describe("filterEventsForUser", () => {
  const base: Omit<CalendarEvent, "eventId" | "ownerId" | "roommateId" | "ownerType" | "type"> = {
    ownerNickname: "닉네임A",
    roommateNickname: "닉네임B",
    title: "일정",
    description: "",
    startAt: "2025-05-01T00:00:00",
    endAt: "2025-05-01T23:59:59",
    createdAt: "2025-04-30T00:00:00",
  };

  it("MY_SCHEDULE — ownerId가 현재 유저인 경우 포함", () => {
    // Arrange
    const events: CalendarEvent[] = [
      { ...base, eventId: 1, ownerId: 10, roommateId: 20, ownerType: "ME", type: "MY_SCHEDULE" },
    ];
    // Act
    const result = filterEventsForUser(events, 10);
    // Assert
    expect(result).toHaveLength(1);
    expect(result[0].eventId).toBe(1);
  });

  it("MY_SCHEDULE — roommateId가 현재 유저인 경우 포함", () => {
    // Arrange
    const events: CalendarEvent[] = [
      { ...base, eventId: 2, ownerId: 10, roommateId: 20, ownerType: "ROOMMATE", type: "MY_SCHEDULE" },
    ];
    // Act
    const result = filterEventsForUser(events, 20);
    // Assert
    expect(result).toHaveLength(1);
  });

  it("MOVE_IN — ownerId가 아닌 경우 필터링됨", () => {
    // Arrange
    const events: CalendarEvent[] = [
      { ...base, eventId: 3, ownerId: 10, roommateId: 20, ownerType: "ME", type: "MOVE_IN" },
    ];
    // Act
    const result = filterEventsForUser(events, 20);
    // Assert
    expect(result).toHaveLength(0);
  });

  it("INSPECTION — ownerId만 볼 수 있음", () => {
    // Arrange
    const events: CalendarEvent[] = [
      { ...base, eventId: 4, ownerId: 10, roommateId: 20, ownerType: "ME", type: "INSPECTION" },
    ];
    // Act
    const forOwner = filterEventsForUser(events, 10);
    const forRoommate = filterEventsForUser(events, 20);
    // Assert
    expect(forOwner).toHaveLength(1);
    expect(forRoommate).toHaveLength(0);
  });

  it("ROOMMATE_SCHEDULE — ownerId 또는 roommateId 모두 볼 수 있음", () => {
    // Arrange
    const events: CalendarEvent[] = [
      { ...base, eventId: 5, ownerId: 10, roommateId: 20, ownerType: "ME", type: "ROOMMATE_SCHEDULE" },
    ];
    // Act
    const forOwner = filterEventsForUser(events, 10);
    const forRoommate = filterEventsForUser(events, 20);
    // Assert
    expect(forOwner).toHaveLength(1);
    expect(forRoommate).toHaveLength(1);
  });

  it("빈 배열 입력 시 빈 배열 반환", () => {
    // Arrange
    const events: CalendarEvent[] = [];
    // Act
    const result = filterEventsForUser(events, 10);
    // Assert
    expect(result).toHaveLength(0);
  });
});

// ── toDateStr ────────────────────────────────────────────────────────────────

describe("toDateStr", () => {
  it("ISO T 구분자 포맷에서 날짜만 반환", () => {
    // Arrange
    const iso = "2025-05-01T12:34:56";
    // Act
    const result = toDateStr(iso);
    // Assert
    expect(result).toBe("2025-05-01");
  });

  it("공백 구분자 포맷도 처리", () => {
    // Arrange
    const iso = "2025-05-01 12:34:56";
    // Act
    const result = toDateStr(iso);
    // Assert
    expect(result).toBe("2025-05-01");
  });

  it("날짜만 있는 문자열도 처리", () => {
    // Arrange
    const iso = "2025-12-31";
    // Act
    const result = toDateStr(iso);
    // Assert
    expect(result).toBe("2025-12-31");
  });
});

// ── getCalendarCells ─────────────────────────────────────────────────────────

describe("getCalendarCells", () => {
  it("2025년 1월 — 수요일(3) 시작, 총 31일", () => {
    // Arrange — 2025-01-01은 수요일 (dayOfWeek = 3)
    // Act
    const cells = getCalendarCells(2025, 1);
    // Assert
    expect(cells.slice(0, 3)).toEqual([null, null, null]);
    expect(cells[3]).toBe(1);
    expect(cells[cells.length - 1]).toBe(31);
    expect(cells.filter((c) => c !== null)).toHaveLength(31);
  });

  it("2025년 2월 — 28일 (윤년 아님)", () => {
    // Arrange
    // Act
    const cells = getCalendarCells(2025, 2);
    const nonNull = cells.filter((c) => c !== null);
    // Assert
    expect(nonNull).toHaveLength(28);
    expect(nonNull[nonNull.length - 1]).toBe(28);
  });

  it("2024년 2월 — 29일 (윤년)", () => {
    // Arrange
    // Act
    const cells = getCalendarCells(2024, 2);
    const nonNull = cells.filter((c) => c !== null);
    // Assert
    expect(nonNull).toHaveLength(29);
  });

  it("일요일 시작하는 달은 앞 패딩 없음", () => {
    // Arrange — 2025년 6월 1일은 일요일 (dayOfWeek = 0)
    // Act
    const cells = getCalendarCells(2025, 6);
    // Assert
    expect(cells[0]).toBe(1);
  });
});

// ── getEventsForDate ─────────────────────────────────────────────────────────

describe("getEventsForDate", () => {
  const events = [
    { id: "1", date: "2025-05-01", title: "입사", category: "입사일" },
    { id: "2", date: "2025-05-02", title: "점검", category: "점검/행사" },
    { id: "3", date: "2025-05-01", title: "내 일정", category: "내 일정" },
  ];

  it("해당 날짜 이벤트만 반환", () => {
    // Arrange
    const dateStr = "2025-05-01";
    // Act
    const result = getEventsForDate(events, dateStr);
    // Assert
    expect(result).toHaveLength(2);
    expect(result.map((e) => e.id)).toEqual(["1", "3"]);
  });

  it("해당 날짜 이벤트 없으면 빈 배열", () => {
    // Arrange
    const dateStr = "2025-05-10";
    // Act
    const result = getEventsForDate(events, dateStr);
    // Assert
    expect(result).toHaveLength(0);
  });

  it("빈 이벤트 배열 입력 시 빈 배열 반환", () => {
    // Arrange
    // Act
    const result = getEventsForDate([], "2025-05-01");
    // Assert
    expect(result).toHaveLength(0);
  });
});
