// src/api/report/type.ts

export interface ReportRequest {
  targetType: "POST" | "USER"; // 기획에 따라 게시글(POST) 또는 사용자(USER) 신고
  targetId: number;            // 신고할 대상의 고유 ID (postId 또는 userId)
  reason: string;              // 신고 사유
}

export interface ReportResponse {
  reportId: number;
  reporterId: number;
  targetType: string;
  targetId: number;
  reason: string;
  status: "PENDING" | "REVIEWED" | "RESOLVED";
  createdAt: string;
}