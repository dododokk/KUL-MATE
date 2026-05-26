// src/api/notification/notificationApi.ts
import axiosInstance from "../axiosInstance"; // 프로젝트 경로에 맞게 수정하세요

export type NotificationType = 
  | "REQUEST_RECEIVED"  // 룸메이트 신청 옴
  | "REQUEST_ACCEPTED"  // 신청 수락됨
  | "RECOMMENDATION"    // 새로운 추천
  | "APPROVAL_COMPLETE" // 승인 완료 (SRS 문서 참고)
  | "REQUEST_REJECTED";  // 신청 거절됨

export interface NotificationResponse {
  notificationId: number;
  type: NotificationType;
  content: string;
  isRead: boolean;
  createdAt: string;
  requestId: number;
}

// 1. 알림 목록 조회 (GET /api/notifications)
export async function getNotifications(): Promise<NotificationResponse[]> {
  const { data } = await axiosInstance.get<NotificationResponse[]>("/api/notifications");
  return data;
}

// 2. 알림 단건 읽음 처리 (PATCH /api/notifications/{notificationId}/read)
export async function readNotification(notificationId: number): Promise<void> {
  await axiosInstance.patch(`/api/notifications/${notificationId}/read`);
}