// src/api/request/type.ts
export interface RoommateRequestResponse {
  requestId: number;
  postId: number;
  postTitle: string;
  senderId: number;
  senderNickname: string;
  receiverId: number;
  receiverNickname: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELED";
  createdAt: string;
}