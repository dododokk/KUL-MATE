import axiosInstance from "../axiosInstance";
import type { ChatRoom, GetMessagesResponse, GetChatRoomsResponse } from "./type";

// 내 채팅방 목록 조회 (GET /api/chats/rooms)
export async function getChatRooms(): Promise<GetChatRoomsResponse> {
  const { data } = await axiosInstance.get<GetChatRoomsResponse>("/api/chats/rooms");
  return data;
}

// 채팅방 생성 또는 조회 (POST /api/chats/rooms/posts/{postId})
export async function getOrCreateChatRoom(postId: number): Promise<ChatRoom> {
  const { data } = await axiosInstance.post<ChatRoom>(`/api/chats/rooms/posts/${postId}`);
  return data;
}

// 채팅 메시지 목록 조회 (GET /api/chats/rooms/{roomId}/messages)
export async function getChatMessages(roomId: number): Promise<GetMessagesResponse> {
  const { data } = await axiosInstance.get<GetMessagesResponse>(
    `/api/chats/rooms/${roomId}/messages`,
  );
  return data;
}

// 채팅방 읽음 처리 (PATCH /api/chats/rooms/{roomId}/read)
export async function markChatAsRead(roomId: number): Promise<void> {
  await axiosInstance.patch(`/api/chats/rooms/${roomId}/read`);
}
