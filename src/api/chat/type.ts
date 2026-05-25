export interface ChatMessage {
  messageId: number;
  roomId: number;
  senderId: number;
  senderNickname: string;
  matchScore: number;
  dormitoryType: string;
  content: string;
  sentAt: string;
}

export type GetMessagesResponse = ChatMessage[];

export interface StompChatMessage {
  messageId: number;
  roomId: number;
  senderId: number;
  senderNickname: string;
  matchScore: number;
  dormitoryType: string;
  content: string;
  createdAt: string;
  mine: boolean;
}

export interface ChatRoom {
  roomId: number;
  postId: number;
  postTitle: string;
  opponentId: number;
  opponentNickname: string;
  matchScore: number;
  dormitoryType: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export interface GetChatRoomsResponse {
  totalUnreadCount: number;
  rooms: ChatRoom[];
}
