import { useNavigate } from "react-router-dom";
import chattingIcon from "../../assets/mypage/chatting.svg";
import calendarIcon from "../../assets/mypage/calendar.svg";
import roommateProfileIcon from "../../assets/mypage/roommate-profile.svg";
import roommateNoIcon from "../../assets/mypage/roommate-no.svg";
import surveyIcon from "../../assets/mypage/survey.svg";
import type { RoommateInfo } from "./types";

function ChevronRight() {
  return (
    <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
      <path d="M1.5 1L6.5 6L1.5 11" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type SurveyItem = {
  id: string;
  label: string;
  completed: boolean;
};

type Props = {
  roommate: RoommateInfo | null;
  surveyItems: SurveyItem[];
  onCancelRoommate: () => void;
  onChatRoommate?: () => void;
  onCalendarRoommate?: () => void;
  onSurveyClick?: (id: string) => void;
};

export default function InfoTab({
  roommate,
  surveyItems,
  onCancelRoommate,
  onChatRoommate,
  onCalendarRoommate,
  onSurveyClick,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-[12px]">
      {/* Roommate section */}
      {roommate ? (
        <div className="backdrop-blur-[2px] bg-[rgba(255,255,255,0.8)] border border-[rgba(122,158,130,0.15)] rounded-[16px] overflow-hidden">
          {/* Section header */}
          <div className="flex items-center justify-between px-[16px] pt-[16px] pb-[8px]">
            <span className="font-bold text-[rgba(122,158,130,0.7)] text-[12px] leading-[16px] tracking-[0.3px]">
              룸메이트
            </span>
            <span className="bg-[rgba(122,158,130,0.1)] px-[8px] py-[2px] rounded-full font-semibold text-[#7a9e82] text-[12px] leading-[16px]">
              매칭 완료
            </span>
          </div>

          {/* Roommate info */}
          <div className="px-[16px] pb-[16px]">
            <div className="flex items-center gap-[12px] pb-[12px]">
              <div
                className="flex items-center justify-center rounded-[12px] shrink-0 size-[48px]"
                style={{ backgroundImage: "linear-gradient(135deg, rgba(122,158,130,0.2) 0%, rgb(209,250,229) 100%)" }}
              >
                <img src={roommateProfileIcon} alt="" className="w-[20px] h-[20px]" />
              </div>
              <div className="flex flex-col gap-[2px]">
                <div className="flex items-center gap-[8px]">
                  <span className="font-black text-[#111827] text-[14px] leading-[20px]">{roommate.nickname}</span>
                  <span className="bg-[rgba(122,158,130,0.1)] px-[8px] py-[2px] rounded-full font-bold text-[#7a9e82] text-[12px] leading-[16px]">
                    {roommate.score}점
                  </span>
                </div>
                <span className="font-normal text-[#6b7280] text-[12px] leading-[16px]">
                  {roommate.department} {roommate.year}
                </span>
                <span className="font-normal text-[#9ca3af] text-[12px] leading-[16px]">
                  {roommate.dorm} · {roommate.matchDate} 매칭
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-[8px]">
              <button
                type="button"
                onClick={onChatRoommate}
                className="flex-1 h-[38px] flex items-center justify-center gap-[6px] border border-[rgba(122,158,130,0.2)] bg-[rgba(122,158,130,0.05)] rounded-[12px]"
              >
                <img src={chattingIcon} alt="" className="w-[14px] h-[14px]" />
                <span className="font-semibold text-[#7a9e82] text-[12px] leading-[16px]">채팅</span>
              </button>
              <button
                type="button"
                onClick={onCalendarRoommate}
                className="flex-1 h-[38px] flex items-center justify-center gap-[6px] border border-[#a7f3d0] bg-[#ecfdf5] rounded-[12px]"
              >
                <img src={calendarIcon} alt="" className="w-[14px] h-[14px]" />
                <span className="font-semibold text-[#059669] text-[12px] leading-[16px]">공유 캘린더</span>
              </button>
              <button
                type="button"
                onClick={onCancelRoommate}
                className="h-[38px] px-[13px] flex items-center justify-center border border-[#fee2e2] rounded-[12px]"
              >
                <span className="font-semibold text-[#f87171] text-[12px] leading-[16px]">해지</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[rgba(255,255,255,0.7)] border border-[#e5e7eb] border-dashed rounded-[16px] p-[17px] flex flex-col items-center">
          <img src={roommateNoIcon} alt="" className="w-[40px] h-[40px] mb-[8px]" />
          <p className="font-normal text-[#9ca3af] text-[14px] leading-[20px] text-center">
            아직 매칭된 룸메이트가 없어요
          </p>
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="mt-[8px]"
          >
            <span className="font-bold text-[#7a9e82] text-[12px] leading-[16px]">룸메이트 찾으러 가기 →</span>
          </button>
        </div>
      )}

      {/* Survey section */}
      <div className="backdrop-blur-[2px] bg-[rgba(255,255,255,0.7)] border border-[rgba(122,158,130,0.1)] rounded-[16px] overflow-hidden">
        <div className="px-[16px] pt-[16px] pb-[8px]">
          <span className="font-bold text-[rgba(122,158,130,0.6)] text-[12px] leading-[16px] tracking-[0.3px]">
            설문 관리
          </span>
        </div>
        {surveyItems.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSurveyClick?.(item.id)}
            className="w-full flex items-center gap-[12px] px-[16px] py-[15px] border-t border-[#f9fafb]"
          >
            <div className="flex items-center justify-center shrink-0 size-[32px]">
              {idx === 0 && <img src={surveyIcon} alt="" className="w-[18px] h-[18px]" />}
            </div>
            <span className="font-medium text-[#1f2937] text-[14px] leading-[20px] flex-1 text-left">
              {item.label}
            </span>
            <span
              className={`px-[8px] py-[2px] rounded-full font-bold text-[12px] leading-[16px] shrink-0 ${
                item.completed
                  ? "bg-[rgba(122,158,130,0.1)] text-[#7a9e82]"
                  : "bg-[#f9fafb] text-[#9ca3af]"
              }`}
            >
              {item.completed ? "완료" : "미완료"}
            </span>
            <div className="flex items-center justify-center shrink-0 size-[20px]">
              <ChevronRight />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
