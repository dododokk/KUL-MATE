import { describe, it, expect } from "vitest";
import { apiPostToCard, getMatchScoreTone } from "../utils/recommendation";
import type { MiniPostSummary } from "../utils/recommendation";

// ── getMatchScoreTone ────────────────────────────────────────────────────────

describe("getMatchScoreTone", () => {
  it("점수 80 이상 — 'primary' 반환", () => {
    // Arrange
    const score = 80;
    // Act
    const result = getMatchScoreTone(score);
    // Assert
    expect(result).toBe("primary");
  });

  it("점수 79 — 'mint' 반환", () => {
    // Arrange
    const score = 79;
    // Act
    const result = getMatchScoreTone(score);
    // Assert
    expect(result).toBe("mint");
  });

  it("점수 100 — 'primary' 반환", () => {
    // Arrange
    const score = 100;
    // Act
    const result = getMatchScoreTone(score);
    // Assert
    expect(result).toBe("primary");
  });

  it("점수 0 — 'mint' 반환", () => {
    // Arrange
    const score = 0;
    // Act
    const result = getMatchScoreTone(score);
    // Assert
    expect(result).toBe("mint");
  });
});

// ── apiPostToCard ────────────────────────────────────────────────────────────

const basePost: MiniPostSummary = {
  postId: 42,
  authorNickname: "도현",
  major: "컴퓨터공학과",
  studentNumberLabel: "20학번",
  birthYear: 2001,
  dormitoryType: "LAKE",
  title: "조용한 룸메 구합니다",
  sleepStartTime: "23:00:00",
  sleepEndTime: "23:30:00",
  wakeUpStartTime: "07:00:00",
  wakeUpEndTime: "07:30:00",
  tags: ["비흡연", "정돈"],
  bookmarked: false,
  matchScore: 85,
  createdAt: "2025-05-01T10:00:00",
};

describe("apiPostToCard", () => {
  it("기본 필드 매핑 — id, nickname, title, date", () => {
    // Arrange
    const post = { ...basePost };
    // Act
    const card = apiPostToCard(post);
    // Assert
    expect(card.id).toBe("42");
    expect(card.nickname).toBe("도현");
    expect(card.title).toBe("조용한 룸메 구합니다");
    expect(card.date).toBe("2025-05-01");
  });

  it("dormitoryType LAKE → '레이크홀'", () => {
    // Arrange
    const post = { ...basePost, dormitoryType: "LAKE" };
    // Act
    const card = apiPostToCard(post);
    // Assert
    expect(card.dormLabel).toBe("레이크홀");
  });

  it("sleepTime / wakeTime — HH:MM 슬라이스 포맷", () => {
    // Arrange
    const post = { ...basePost };
    // Act
    const card = apiPostToCard(post);
    // Assert
    expect(card.sleepTime).toBe("23:00 - 23:30");
    expect(card.wakeTime).toBe("07:00 - 07:30");
  });

  it("matchScore 85 — score '85점', scoreTone 'primary'", () => {
    // Arrange
    const post = { ...basePost, matchScore: 85 };
    // Act
    const card = apiPostToCard(post);
    // Assert
    expect(card.score).toBe("85점");
    expect(card.scoreTone).toBe("primary");
  });

  it("matchScore 60 — score '60점', scoreTone 'mint'", () => {
    // Arrange
    const post = { ...basePost, matchScore: 60 };
    // Act
    const card = apiPostToCard(post);
    // Assert
    expect(card.score).toBe("60점");
    expect(card.scoreTone).toBe("mint");
  });

  it("matchScore 0 — score undefined", () => {
    // Arrange
    const post = { ...basePost, matchScore: 0 };
    // Act
    const card = apiPostToCard(post);
    // Assert
    expect(card.score).toBeUndefined();
    expect(card.scoreTone).toBe("mint");
  });

  it("majorYear — major + studentNumberLabel + birthYear 조합", () => {
    // Arrange
    const post = { ...basePost };
    // Act
    const card = apiPostToCard(post);
    // Assert
    expect(card.majorYear).toBe("컴퓨터공학과 20학번 01년생");
  });
});
