import { useNavigate } from "react-router-dom";
import AppBottomNav from "../../components/AppBottomNav";
import ChatListItem from "../../features/chat/ChatListItem";
import searchIcon from "../../assets/chat/searchIcon.svg";
import approvalIcon from "../../assets/chat/approval.svg";

type ChatRoom = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  showReadIcon?: boolean;
};

const chatRooms: ChatRoom[] = [
  {
    id: "1",
    name: "코딩고수민준",
    lastMessage: "안녕하세요! 혹시 흡연하시나요?",
    time: "오후 3:24",
    unreadCount: 2,
  },
  {
    id: "2",
    name: "새내기전전지호",
    lastMessage: "네 저도 규칙적인 편이에요 :)",
    time: "오전 11:05",
    showReadIcon: true,
  },
  {
    id: "3",
    name: "건축하는도현",
    lastMessage: "주말에 주로 방에 계세요?",
    time: "어제",
    showReadIcon: true,
  },
];

export default function ChatListPage() {
  const navigate = useNavigate();
  const unreadTotal = chatRooms.reduce(
    (acc, c) => acc + (c.unreadCount ?? 0),
    0
  );

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
              {unreadTotal}개의 읽지 않은 메시지
            </p>
          </div>
          <button className="flex items-center justify-center rounded-[12px] size-[36px]">
            <img src={searchIcon} alt="검색" className="w-[20px] h-[20px]" />
          </button>
        </div>
      </div>

      {/* Chat list */}
      <div className="flex flex-col w-full pt-[8px]">
        {chatRooms.map((room, idx) => (
          <ChatListItem
            key={room.id}
            name={room.name}
            lastMessage={room.lastMessage}
            time={room.time}
            unreadCount={room.unreadCount}
            showReadIcon={room.showReadIcon}
            hasUnread={!!room.unreadCount}
            isLast={idx === chatRooms.length - 1}
            onClick={() => navigate(`/chat/${room.id}`)}
          />
        ))}
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
