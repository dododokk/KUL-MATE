import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getChatMessages, markChatAsRead } from "../../api/chat/chatApi";
import { connectStomp, sendChatMessage } from "../../api/chat/stompClient";
import type { ChatMessage, StompChatMessage } from "../../api/chat/type";
import RoommateRequestModal from "../../features/chat/RoommateRequestModal";
import sendIcon from "../../assets/chat/send.svg";
import profileIcon from "../../assets/chat/profile.svg";

type RoomState = {
  opponentNickname?: string;
  matchScore?: number;
  dormitoryType?: string;
};

function formatMessageTime(isoString: string | undefined): string {
  if (!isoString) return "";
  const normalized = isoString.replace(" ", "T");
  const date = new Date(normalized);
  const target = isNaN(date.getTime()) ? new Date() : date;
  const h = target.getHours();
  const m = target.getMinutes().toString().padStart(2, "0");
  return `${h < 12 ? "오전" : "오후"} ${h % 12 || 12}:${m}`;
}

function OtherAvatar({ size = 28 }: { size?: number }) {
  return (
    <div
      className="bg-[#e2eee4] flex items-center justify-center rounded-full shrink-0"
      style={{ width: size, height: size }}
    >
      <img
        src={profileIcon}
        alt="프로필"
        style={{ width: size * 0.6, height: size * 0.6 }}
      />
    </div>
  );
}

export default function ChatDetailPage() {
  const { id } = useParams<{ id: string }>();
  const roomId = Number(id);
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? {}) as RoomState;

  const currentUserId = Number(localStorage.getItem("kul_userId"));

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [modal, setModal] = useState<"none" | "confirm" | "success">("none");
  const [isRequested, setIsRequested] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const opponentNickname =
    state.opponentNickname ??
    messages.find((m) => m.senderId !== currentUserId)?.senderNickname ??
    "상대방";
  const matchScore =
    state.matchScore ??
    messages.find((m) => m.senderId !== currentUserId)?.matchScore ??
    0;
  const dormitoryType =
    state.dormitoryType ??
    messages.find((m) => m.senderId !== currentUserId)?.dormitoryType ??
    "";

  useEffect(() => {
    if (!roomId) return;
    setIsLoading(true);
    markChatAsRead(roomId).catch(() => {});
    getChatMessages(roomId)
      .then((data) => setMessages(data))
      .catch(() => setMessages([]))
      .finally(() => setIsLoading(false));

    const client = connectStomp(() => {
      client.subscribe(`/topic/chats/rooms/${roomId}`, (frame) => {
        try {
          const incoming: StompChatMessage = JSON.parse(frame.body);
          setMessages((prev) => [
            ...prev,
            {
              messageId: incoming.messageId,
              roomId: incoming.roomId,
              senderId: incoming.senderId,
              senderNickname: incoming.senderNickname,
              matchScore: incoming.matchScore,
              dormitoryType: incoming.dormitoryType,
              content: incoming.content,
              sentAt: incoming.createdAt ?? incoming.sentAt ?? "",
            },
          ]);
        } catch {}
      });
    });

    return () => {
      client.deactivate();
    };
  }, [roomId]);

  useEffect(() => {
    if (!isLoading) {
      bottomRef.current?.scrollIntoView({ behavior: "instant" });
    }
  }, [isLoading, messages]);

  function handleSend() {
    const text = inputText.trim();
    if (!text) return;
    setInputText("");
    sendChatMessage(roomId, text);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleRequestConfirm() {
    setModal("success");
  }

  function handleModalClose() {
    if (modal === "success") setIsRequested(true);
    setModal("none");
  }

  return (
    <div
      className="h-screen flex flex-col overflow-hidden relative"
      style={{
        backgroundImage:
          "linear-gradient(160deg, rgb(240, 250, 244) 0%, rgb(255, 255, 255) 80%)",
      }}
    >
      {/* 헤더 */}
      <div className="flex-none backdrop-blur-[6px] bg-[rgba(255,255,255,0.92)] border-b border-[rgba(122,158,130,0.1)] flex gap-[12px] items-center h-[109px] pb-[13px] pt-[56px] px-[16px]">
        <button
          className="flex items-center justify-center shrink-0 size-[36px]"
          onClick={() => navigate("/chat")}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M12.5 15L7.5 10L12.5 5"
              stroke="#111827"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <OtherAvatar size={40} />

        <div className="flex flex-col flex-1 min-w-0">
          <p className="font-bold text-[#111827] text-[14px] leading-[20px] truncate">
            {opponentNickname}
          </p>
          {matchScore > 0 && (
            <p className="font-semibold text-[#7a9e82] text-[12px] leading-[16px]">
              매칭점수 {matchScore}점
            </p>
          )}
        </div>

        <button className="flex items-center justify-center shrink-0 size-[36px]">
          <svg width="4" height="18" viewBox="0 0 4 18" fill="none">
            <circle cx="2" cy="2" r="1.5" fill="#111827" />
            <circle cx="2" cy="9" r="1.5" fill="#111827" />
            <circle cx="2" cy="16" r="1.5" fill="#111827" />
          </svg>
        </button>
      </div>

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto">
        {/* 프로필 카드 */}
        <div className="px-[16px] pt-[12px]">
          <div className="backdrop-blur-[2px] bg-[rgba(255,255,255,0.7)] border border-[rgba(122,158,130,0.1)] flex gap-[12px] items-center p-[13px] rounded-[16px] h-[66px]">
            <div className="bg-[rgba(122,158,130,0.1)] flex items-center justify-center rounded-full shrink-0 size-[40px]">
              <img
                src={profileIcon}
                alt="프로필"
                className="w-[22px] h-[22px]"
              />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <p className="font-bold text-[#1f2937] text-[12px] leading-[16px] truncate">
                {opponentNickname}
              </p>
              <p className="font-normal text-[#9ca3af] text-[12px] leading-[16px] truncate">
                {dormitoryType}
              </p>
            </div>
            <button className="bg-[rgba(122,158,130,0.1)] flex items-center justify-center h-[28px] px-[10px] py-[6px] rounded-[12px] shrink-0">
              <span className="font-bold text-[#7a9e82] text-[12px] leading-[16px]">
                프로필 보기
              </span>
            </button>
            {isRequested ? (
              <button className="bg-[#f3f4f6] flex items-center justify-center h-[28px] px-[10px] py-[6px] rounded-[12px] shrink-0">
                <span className="font-bold text-[#9ca3af] text-[12px] leading-[16px]">
                  신청됨
                </span>
              </button>
            ) : (
              <button
                className="bg-[#7a9e82] flex items-center justify-center h-[28px] px-[10px] py-[6px] rounded-[12px] shrink-0"
                onClick={() => setModal("confirm")}
              >
                <span className="font-bold text-white text-[12px] leading-[16px]">
                  룸메이트 신청
                </span>
              </button>
            )}
          </div>
        </div>

        {/* 메시지 목록 */}
        <div className="flex flex-col px-[16px] py-[12px]">
          {isLoading ? (
            <div className="flex justify-center py-[48px]">
              <div className="h-[24px] w-[24px] animate-spin rounded-full border-2 border-[#7a9e82] border-t-transparent" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center py-[48px] gap-[8px]">
              <p className="text-[14px] font-semibold text-[#374151]">
                아직 대화가 없어요
              </p>
              <p className="text-[12px] text-[#9ca3af]">
                먼저 인사를 건네보세요!
              </p>
            </div>
          ) : (
            messages.map((msg, idx) => {
              const isOwn = msg.senderId === currentUserId;
              return (
                <div
                  key={msg.messageId}
                  className={`flex ${isOwn ? "justify-end" : "gap-[8px] items-end"} ${
                    idx > 0 ? "pt-[12px]" : ""
                  }`}
                >
                  {!isOwn && (
                    <div className="flex items-end pb-[2px] shrink-0">
                      <OtherAvatar size={28} />
                    </div>
                  )}
                  <div
                    className={`flex flex-col gap-[2px] max-w-[257px] ${
                      isOwn ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={
                        isOwn
                          ? "px-[16px] py-[10px] rounded-tl-[16px] rounded-tr-[6px] rounded-bl-[16px] rounded-br-[16px]"
                          : "bg-[rgba(255,255,255,0.8)] border border-[rgba(122,158,130,0.1)] px-[17px] py-[11px] rounded-tl-[16px] rounded-tr-[16px] rounded-br-[16px] rounded-bl-[6px]"
                      }
                      style={
                        isOwn
                          ? {
                              backgroundImage:
                                "linear-gradient(166deg, rgb(122,158,130) 0%, rgb(96,126,104) 100%)",
                            }
                          : undefined
                      }
                    >
                      <p
                        className={`text-[14px] leading-[22.75px] ${
                          isOwn ? "text-white" : "text-[#1f2937]"
                        }`}
                      >
                        {msg.content}
                      </p>
                    </div>
                    <span className="text-[#9ca3af] text-[12px] leading-[16px] px-[4px]">
                      {formatMessageTime(msg.sentAt)}
                    </span>
                  </div>
                </div>
              );
            })
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* 입력창 */}
      <div className="flex-none backdrop-blur-[6px] bg-[rgba(255,255,255,0.92)] border-t border-[rgba(122,158,130,0.1)] flex gap-[8px] items-end h-[69px] pb-[12px] pt-[13px] px-[16px]">
        <textarea
          className="bg-white border border-[#e5e7eb] flex-1 h-[44px] max-h-[96px] overflow-hidden px-[17px] py-[11px] rounded-[16px] text-[14px] leading-[20px] placeholder:text-[#9ca3af] resize-none focus:outline-none"
          placeholder="메시지를 입력하세요..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button
          onClick={handleSend}
          disabled={!inputText.trim()}
          className={`flex items-center justify-center rounded-[16px] shrink-0 size-[44px] transition-colors ${
            inputText.trim() ? "bg-[#7a9e82]" : "bg-[#f3f4f6]"
          }`}
        >
          <img src={sendIcon} alt="전송" className="w-[18px] h-[18px]" />
        </button>
      </div>

      {modal !== "none" && (
        <RoommateRequestModal
          userName={opponentNickname}
          mode={modal}
          onConfirm={handleRequestConfirm}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
