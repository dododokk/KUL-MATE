import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoommateRequestModal from "../../features/chat/RoommateRequestModal";
import sendIcon from "../../assets/chat/send.svg";
import profileIcon from "../../assets/chat/profile.svg";

type Message = {
  id: string;
  text: string;
  time: string;
  isOwn: boolean;
};

const MESSAGES: Message[] = [
  {
    id: "1",
    text: "안녕하세요! 구인글 보고 연락드려요 😊",
    time: "오후 2:10",
    isOwn: false,
  },
  { id: "2", text: "안녕하세요! 반갑습니다 :)", time: "오후 2:11", isOwn: true },
  {
    id: "3",
    text: "혹시 취침 시간이 몇 시쯤 되시나요?",
    time: "오후 2:12",
    isOwn: false,
  },
  {
    id: "4",
    text: "보통 밤 11시~12시 사이에 자요. 굉장히 규칙적인 편이에요!",
    time: "오후 2:13",
    isOwn: true,
  },
  {
    id: "5",
    text: "오, 저랑 비슷하네요! 저도 보통 11:30쯤 자거든요 ㅎㅎ",
    time: "오후 2:14",
    isOwn: false,
  },
  { id: "6", text: "흡연하시나요?", time: "오후 2:15", isOwn: false },
  { id: "7", text: "아니요, 비흡연자예요!", time: "오후 2:15", isOwn: true },
  {
    id: "8",
    text: "저도 비흡연이에요 😊 좋네요!",
    time: "오후 2:16",
    isOwn: false,
  },
  {
    id: "9",
    text: "청소는 얼마나 자주 하시나요?",
    time: "오후 2:18",
    isOwn: true,
  },
  {
    id: "10",
    text: "주 1-2회 정도 하는 편이에요. 청결에 꽤 신경 쓰는 편!",
    time: "오후 2:19",
    isOwn: false,
  },
  {
    id: "11",
    text: "안녕하세요! 혹시 흡연하시나요?",
    time: "오후 3:24",
    isOwn: false,
  },
];

const USER_NAME = "코딩고수민준";
const MATCH_SCORE = 92;
const LOCATION = "비레이크";

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
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [modal, setModal] = useState<"none" | "confirm" | "success">("none");
  const [isRequested, setIsRequested] = useState(false);

  function handleRequestConfirm() {
    setModal("success");
  }

  function handleModalClose() {
    if (modal === "success") {
      setIsRequested(true);
    }
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
      {/* Header */}
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
          <p className="font-bold text-[#111827] text-[14px] leading-[20px]">
            {USER_NAME}
          </p>
          <p className="font-semibold text-[#7a9e82] text-[12px] leading-[16px]">
            매칭점수 {MATCH_SCORE}점
          </p>
        </div>

        <button className="flex items-center justify-center shrink-0 size-[36px]">
          <svg width="4" height="18" viewBox="0 0 4 18" fill="none">
            <circle cx="2" cy="2" r="1.5" fill="#111827" />
            <circle cx="2" cy="9" r="1.5" fill="#111827" />
            <circle cx="2" cy="16" r="1.5" fill="#111827" />
          </svg>
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Profile card */}
        <div className="px-[16px] pt-[12px]">
          <div className="backdrop-blur-[2px] bg-[rgba(255,255,255,0.7)] border border-[rgba(122,158,130,0.1)] flex gap-[12px] items-center p-[13px] rounded-[16px] h-[66px]">
            <div className="bg-[rgba(122,158,130,0.1)] flex items-center justify-center rounded-full shrink-0 size-[40px]">
              <img src={profileIcon} alt="프로필" className="w-[22px] h-[22px]" />
            </div>

            <div className="flex flex-col min-w-0 flex-1">
              <p className="font-bold text-[#1f2937] text-[12px] leading-[16px] truncate">
                {USER_NAME}
              </p>
              <p className="font-normal text-[#9ca3af] text-[12px] leading-[16px] truncate">
                {LOCATION}
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

        {/* Messages */}
        <div className="flex flex-col px-[16px] py-[12px]">
          {MESSAGES.map((msg, idx) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.isOwn ? "justify-end" : "gap-[8px] items-end"
              } ${idx > 0 ? "pt-[12px]" : ""}`}
            >
              {!msg.isOwn && (
                <div className="flex items-end pb-[2px] shrink-0">
                  <OtherAvatar size={28} />
                </div>
              )}

              <div
                className={`flex flex-col gap-[2px] max-w-[257px] ${
                  msg.isOwn ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={
                    msg.isOwn
                      ? "px-[16px] py-[10px] rounded-tl-[16px] rounded-tr-[6px] rounded-bl-[16px] rounded-br-[16px]"
                      : "bg-[rgba(255,255,255,0.8)] border border-[rgba(122,158,130,0.1)] px-[17px] py-[11px] rounded-tl-[16px] rounded-tr-[16px] rounded-br-[16px] rounded-bl-[6px]"
                  }
                  style={
                    msg.isOwn
                      ? {
                          backgroundImage:
                            "linear-gradient(166deg, rgb(122,158,130) 0%, rgb(96,126,104) 100%)",
                        }
                      : undefined
                  }
                >
                  <p
                    className={`text-[14px] leading-[22.75px] ${
                      msg.isOwn ? "text-white" : "text-[#1f2937]"
                    }`}
                  >
                    {msg.text}
                  </p>
                </div>
                <span className="text-[#9ca3af] text-[12px] leading-[16px] px-[4px]">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message input bar */}
      <div className="flex-none backdrop-blur-[6px] bg-[rgba(255,255,255,0.92)] border-t border-[rgba(122,158,130,0.1)] flex gap-[8px] items-end h-[69px] pb-[12px] pt-[13px] px-[16px]">
        <textarea
          className="bg-white border border-[#e5e7eb] flex-1 h-[44px] max-h-[96px] overflow-hidden px-[17px] py-[11px] rounded-[16px] text-[14px] leading-[20px] placeholder:text-[#9ca3af] resize-none focus:outline-none"
          placeholder="메시지를 입력하세요..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={1}
        />
        <button
          className={`flex items-center justify-center rounded-[16px] shrink-0 size-[44px] transition-colors ${
            inputText.trim() ? "bg-[#7a9e82]" : "bg-[#f3f4f6]"
          }`}
        >
          <img src={sendIcon} alt="전송" className="w-[18px] h-[18px]" />
        </button>
      </div>

      {/* Modals */}
      {modal !== "none" && (
        <RoommateRequestModal
          userName={USER_NAME}
          mode={modal}
          onConfirm={handleRequestConfirm}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
