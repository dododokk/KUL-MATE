import { Client } from "@stomp/stompjs";
import type { StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import type { StompChatMessage } from "./type";

let client: Client | null = null;
const subscriptions = new Map<number, StompSubscription>();

export function connectStomp(onConnected?: () => void): Client {
  if (client?.connected) {
    onConnected?.();
    return client;
  }

  if (client) {
    client.deactivate();
    client = null;
  }

  const token = localStorage.getItem("kul_accessToken");

  client = new Client({
    webSocketFactory: () =>
      new SockJS(import.meta.env.VITE_WS_URL as string),

    connectHeaders: {
      Authorization: `Bearer ${token ?? ""}`,
    },

    reconnectDelay: 5000,

    onConnect: () => {
      console.log("STOMP connected");
      onConnected?.();
    },

    onStompError: (frame: any) => {
      console.error("STOMP error", frame);
    },

    onDisconnect: () => {
      console.log("STOMP disconnected");
    },

    onWebSocketError: (error: any) => {
      console.error("WebSocket error", error);
    },

    onWebSocketClose: (event: any) => {
      console.log("WebSocket closed", event);
    },
  });

  client.activate();
  return client;
}

export function disconnectStomp(): void {
  subscriptions.forEach((sub) => sub.unsubscribe());
  subscriptions.clear();

  if (client?.active) {
    client.deactivate();
    client = null;
  }
}

export function subscribeChatRoom(
  roomId: number,
  onMessage: (msg: StompChatMessage) => void,
): void {
  if (!client?.connected) return;
  if (subscriptions.has(roomId)) return;

  const sub = client.subscribe(`/topic/chats/rooms/${roomId}`, (frame: any) => {
    try {
      const msg: StompChatMessage = JSON.parse(frame.body);
      onMessage(msg);
    } catch (error) {
      console.error("Message parse error", error);
    }
  });

  subscriptions.set(roomId, sub);
}

export function unsubscribeChatRoom(roomId: number): void {
  subscriptions.get(roomId)?.unsubscribe();
  subscriptions.delete(roomId);
}

export function sendChatMessage(roomId: number, content: string): void {
  if (!client?.connected) return;

  client.publish({
    destination: `/app/chats/rooms/${roomId}/messages`,
    body: JSON.stringify({ content }),
  });
}