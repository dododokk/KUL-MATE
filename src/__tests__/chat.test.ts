import { describe, it, expect } from "vitest";
import { formatMessageTime, formatChatListTime } from "../utils/chat";

// ── formatMessageTime ────────────────────────────────────────────────────────

describe("formatMessageTime", () => {
  it("undefined 입력 시 빈 문자열 반환", () => {
    // Arrange
    const input = undefined;
    // Act
    const result = formatMessageTime(input);
    // Assert
    expect(result).toBe("");
  });

  it("빈 문자열 입력 시 빈 문자열 반환", () => {
    // Arrange
    const input = "";
    // Act
    const result = formatMessageTime(input);
    // Assert
    expect(result).toBe("");
  });

  it("오후 시간 — 14:30 → '오후 2:30'", () => {
    // Arrange
    const input = "2025-01-01T14:30:00";
    // Act
    const result = formatMessageTime(input);
    // Assert
    expect(result).toBe("오후 2:30");
  });

  it("오전 시간 — 09:05 → '오전 9:05'", () => {
    // Arrange
    const input = "2025-01-01T09:05:00";
    // Act
    const result = formatMessageTime(input);
    // Assert
    expect(result).toBe("오전 9:05");
  });

  it("자정 — 00:30 → '오전 12:30'", () => {
    // Arrange
    const input = "2025-01-01T00:30:00";
    // Act
    const result = formatMessageTime(input);
    // Assert
    expect(result).toBe("오전 12:30");
  });

  it("공백 구분자 ISO 문자열도 처리", () => {
    // Arrange
    const input = "2025-01-01 14:30:00";
    // Act
    const result = formatMessageTime(input);
    // Assert
    expect(result).toBe("오후 2:30");
  });

  it("잘못된 날짜 문자열은 문자열 반환 (오류 없음)", () => {
    // Arrange
    const input = "invalid-date";
    // Act & Assert — 오류 없이 현재 시간 기반 문자열 반환
    expect(() => formatMessageTime(input)).not.toThrow();
    expect(formatMessageTime(input)).toMatch(/^(오전|오후) \d{1,2}:\d{2}$/);
  });
});

// ── formatChatListTime ───────────────────────────────────────────────────────

describe("formatChatListTime", () => {
  const now = new Date("2025-05-26T12:00:00");

  it("오늘 메시지 — '오전/오후 H:MM' 포맷 반환", () => {
    // Arrange
    const todayMorning = "2025-05-26T09:05:00";
    // Act
    const result = formatChatListTime(todayMorning, now);
    // Assert
    expect(result).toBe("오전 9:05");
  });

  it("어제 메시지 — '어제' 반환", () => {
    // Arrange
    const yesterday = "2025-05-25T06:00:00"; // 30시간 전
    // Act
    const result = formatChatListTime(yesterday, now);
    // Assert
    expect(result).toBe("어제");
  });

  it("3일 전 메시지 — '3일 전' 반환", () => {
    // Arrange
    const threeDaysAgo = "2025-05-23T06:00:00";
    // Act
    const result = formatChatListTime(threeDaysAgo, now);
    // Assert
    expect(result).toBe("3일 전");
  });

  it("7일 이상 지난 메시지 — 'M/D' 포맷 반환", () => {
    // Arrange
    const twoWeeksAgo = "2025-05-01T12:00:00";
    // Act
    const result = formatChatListTime(twoWeeksAgo, now);
    // Assert
    expect(result).toBe("5/1");
  });
});
