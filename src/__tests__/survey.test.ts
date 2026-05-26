import { describe, it, expect } from "vitest";
import { isValidMbti, isValidScore } from "../utils/survey";

// ── isValidMbti ──────────────────────────────────────────────────────────────

describe("isValidMbti", () => {
  it("유효한 MBTI — INTJ 통과", () => {
    // Arrange
    const value = "INTJ";
    // Act
    const result = isValidMbti(value);
    // Assert
    expect(result).toBe(true);
  });

  it("유효한 MBTI — ENFP 통과", () => {
    // Arrange
    const value = "ENFP";
    // Act
    const result = isValidMbti(value);
    // Assert
    expect(result).toBe(true);
  });

  it("소문자도 유효 처리 — enfp 통과", () => {
    // Arrange
    const value = "enfp";
    // Act
    const result = isValidMbti(value);
    // Assert
    expect(result).toBe(true);
  });

  it("3자리 문자열 — 유효하지 않음", () => {
    // Arrange
    const value = "INT";
    // Act
    const result = isValidMbti(value);
    // Assert
    expect(result).toBe(false);
  });

  it("5자리 문자열 — 유효하지 않음", () => {
    // Arrange
    const value = "INTJX";
    // Act
    const result = isValidMbti(value);
    // Assert
    expect(result).toBe(false);
  });

  it("잘못된 첫 글자 — ANTJ 유효하지 않음", () => {
    // Arrange
    const value = "ANTJ";
    // Act
    const result = isValidMbti(value);
    // Assert
    expect(result).toBe(false);
  });

  it("빈 문자열 — 유효하지 않음", () => {
    // Arrange
    const value = "";
    // Act
    const result = isValidMbti(value);
    // Assert
    expect(result).toBe(false);
  });

  it("숫자 포함 — 유효하지 않음", () => {
    // Arrange
    const value = "INT1";
    // Act
    const result = isValidMbti(value);
    // Assert
    expect(result).toBe(false);
  });
});

// ── isValidScore ─────────────────────────────────────────────────────────────

describe("isValidScore", () => {
  it("점수 1 — 유효", () => {
    // Arrange / Act / Assert
    expect(isValidScore(1)).toBe(true);
  });

  it("점수 3 — 유효", () => {
    expect(isValidScore(3)).toBe(true);
  });

  it("점수 5 — 유효", () => {
    expect(isValidScore(5)).toBe(true);
  });

  it("점수 0 — 유효하지 않음", () => {
    // Arrange
    const score = 0;
    // Act
    const result = isValidScore(score);
    // Assert
    expect(result).toBe(false);
  });

  it("점수 6 — 유효하지 않음", () => {
    // Arrange
    const score = 6;
    // Act
    const result = isValidScore(score);
    // Assert
    expect(result).toBe(false);
  });

  it("소수점 — 유효하지 않음", () => {
    // Arrange
    const score = 3.5;
    // Act
    const result = isValidScore(score);
    // Assert
    expect(result).toBe(false);
  });

  it("음수 — 유효하지 않음", () => {
    // Arrange
    const score = -1;
    // Act
    const result = isValidScore(score);
    // Assert
    expect(result).toBe(false);
  });
});
