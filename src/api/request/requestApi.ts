// src/api/request/requestApi.ts
import axiosInstance from "../axiosInstance";
import type { RoommateRequestResponse } from "./type";

// 1. 보낸/받은 신청 목록 조회
export async function getSentRequests(): Promise<RoommateRequestResponse[]> {
  const { data } = await axiosInstance.get<RoommateRequestResponse[]>("/api/requests/sent");
  return data;
}

export async function getReceivedRequests(): Promise<RoommateRequestResponse[]> {
  const { data } = await axiosInstance.get<RoommateRequestResponse[]>("/api/requests/received");
  return data;
}

// 2. 룸메이트 신청 (POST /api/matches/apply/{postId})
export async function applyRoommate(postId: number): Promise<void> {
  await axiosInstance.post(`/api/matches/apply/${postId}`);
}

// 3. 신청 수락 및 거절
export async function acceptRequest(requestId: number): Promise<void> {
  await axiosInstance.post(`/api/matches/${requestId}/accept`);
}

export async function rejectRequest(requestId: number): Promise<void> {
  await axiosInstance.post(`/api/matches/${requestId}/reject`);
}

// 4. 신청 취소 및 매칭 해제
export async function cancelRequest(requestId: number): Promise<void> {
  await axiosInstance.patch(`/api/requests/${requestId}/cancel`);
}

export async function cancelMatching(requestId: number): Promise<void> {
  await axiosInstance.patch(`/api/requests/${requestId}/cancel-matching`);
}