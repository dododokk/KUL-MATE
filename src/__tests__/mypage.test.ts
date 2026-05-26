import { describe, it, expect } from "vitest";
import { getApprovalStatusLabel } from "../utils/mypage";
import type { ApprovalStatus } from "../utils/mypage";

// ── getApprovalStatusLabel ───────────────────────────────────────────────────

describe("getApprovalStatusLabel", () => {
  it("PENDING → '검토중'", () => {
    // Arrange
    const status: ApprovalStatus = "PENDING";
    // Act
    const result = getApprovalStatusLabel(status);
    // Assert
    expect(result).toBe("검토중");
  });

  it("APPROVED → '승인 완료'", () => {
    // Arrange
    const status: ApprovalStatus = "APPROVED";
    // Act
    const result = getApprovalStatusLabel(status);
    // Assert
    expect(result).toBe("승인 완료");
  });

  it("REJECTED → '반려됨'", () => {
    // Arrange
    const status: ApprovalStatus = "REJECTED";
    // Act
    const result = getApprovalStatusLabel(status);
    // Assert
    expect(result).toBe("반려됨");
  });

  it("세 상태 모두 서로 다른 라벨 반환", () => {
    // Arrange
    const statuses: ApprovalStatus[] = ["PENDING", "APPROVED", "REJECTED"];
    // Act
    const labels = statuses.map(getApprovalStatusLabel);
    // Assert
    const unique = new Set(labels);
    expect(unique.size).toBe(3);
  });
});
