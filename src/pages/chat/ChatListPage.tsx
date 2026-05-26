import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getChatRooms } from "../../api/chat/chatApi";
import type { ChatRoom } from "../../api/chat/type";
import AppBottomNav from "../../components/AppBottomNav";
import ChatListItem from "../../features/chat/ChatListItem";
import searchIcon from "../../assets/chat/searchIcon.svg";
import approvalIcon from "../../assets/chat/approval.svg";

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) {
    const h = date.getHours();
    const m = date.getMinutes().toString().padStart(2, "0");
    return `${h < 12 ? "오전" : "오후"} ${h % 12 || 12}:${m}`;
  }
  if (diffDays === 1) return "어제";
  if (diffDays < 7) return `${diffDays}일 전`;
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

export default function ChatListPage() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [totalUnread, setTotalUnread] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getChatRooms()
      .then((data) => {
        setRooms(data.rooms);
        setTotalUnread(data.totalUnreadCount);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div
      className="flex flex-col min-h-screen w-full relative"
      style={{
        backgroundImage:
          "linear-gradient(160deg, rgb(240, 250, 244) 0%, rgb(255, 255, 255) 50%)",
      }}
    >
      {/* Header spacer */}
      <div className="h-[115px] shrink-0" />

      {/* Fixed header */}
      <div className="fixed top-0 left-0 w-full backdrop-blur-[6px] bg-[rgba(255,255,255,0.92)] border-b border-[rgba(0,0,0,0.05)] flex flex-col h-[115px] pb-[13px] pt-[56px] px-[20px] z-10">
        <div className="flex items-center justify-between h-[46px]">
          <div className="flex flex-col">
            <h1 className="font-black text-[#111827] text-[20px] leading-[28px] tracking-[-0.5px]">
              채팅
            </h1>
            <p className="font-semibold text-[#7a9e82] text-[12px] leading-[16px] pt-[2px]">
              {totalUnread}개의 읽지 않은 메시지
            </p>
          </div>
          <button className="flex items-center justify-center rounded-[12px] size-[36px]">
            <img src={searchIcon} alt="검색" className="w-[20px] h-[20px]" />
          </button>
        </div>
      </div>

      {/* Chat list */}
      <div className="flex flex-col w-full pt-[8px]">
        {isLoading ? (
          <div className="flex justify-center py-[48px]">
            <div className="h-[24px] w-[24px] animate-spin rounded-full border-2 border-[#7a9e82] border-t-transparent" />
          </div>
        ) : rooms.length === 0 ? (
          <div className="flex flex-col items-center py-[64px] gap-[8px]">
            <p className="text-[14px] font-semibold text-[#374151]">채팅방이 없어요</p>
            <p className="text-[12px] text-[#9ca3af]">룸메이트에게 채팅을 먼저 보내보세요</p>
          </div>
        ) : (
          rooms.map((room, idx) => (
            <ChatListItem
              key={room.roomId}
              name={room.opponentNickname}
              lastMessage={room.lastMessage}
              time={formatTime(room.lastMessageAt)}
              unreadCount={room.unreadCount}
              showReadIcon={room.unreadCount === 0}
              hasUnread={room.unreadCount > 0}
              isLast={idx === rooms.length - 1}
              onClick={() =>
                navigate(`/chat/${room.roomId}`, {
                  state: {
                    opponentNickname: room.opponentNickname,
                    matchScore: room.matchScore,
                    dormitoryType: room.dormitoryType,
                    opponentId: room.opponentId,
                  },
                })
              }
            />
          ))
        )}
      </div>

      {/* Info banner */}
      <div className="px-[20px] pt-[16px] pb-[8px] w-full">
        <div className="bg-[rgba(255,255,255,0.6)] border border-[rgba(122,158,130,0.1)] flex gap-[12px] items-center px-[17px] py-[13px] rounded-[16px] min-h-[65px]">
          <div className="flex items-center justify-center shrink-0 size-[32px]">
            <img src={approvalIcon} alt="" className="w-[18px] h-[18px]" />
          </div>
          <p className="text-[12px] leading-[19.5px]">
            <span className="font-normal text-[#9ca3af]">채팅은 </span>
            <span className="font-semibold text-[#4b5563]">
              승인된 회원끼리만
            </span>
            <span className="font-normal text-[#9ca3af]">
              {" "}
              가능해요. 매칭 전 프로필을 꼭 확인해보세요.
            </span>
          </p>
        </div>
      </div>

      <AppBottomNav active="chat" />
    </div>
  );
}
