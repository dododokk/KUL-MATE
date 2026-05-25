// src/pages/alarm/AlarmItem.tsx
import requestIcon from "../../assets/alarm/request.svg";
import acceptIcon from "../../assets/alarm/accept.svg";
import recommendationIcon from "../../assets/alarm/recommendation.svg";
import approvalIcon from "../../assets/alarm/approvalComplete.svg";
import type { NotificationType } from "../../api/notification/notificationApi";

export type AlarmItemProps = {
  id: number;
  type: NotificationType;
  content: string;
  time: string;
  isRead: boolean;
  onRead: (id: number) => void;
  onAccept?: (id: number) => void;
  onDecline?: (id: number) => void;
};

// 백엔드 타입 명세를 기존 UI 아이콘 설정과 매핑
const ICON_CONFIG: Record<NotificationType, { src: string; bg: string; title: string }> = {
  REQUEST_RECEIVED: { src: requestIcon, bg: "bg-[#f3f7f4]", title: "룸메이트 신청이 왔어요!" },
  REQUEST_ACCEPTED: { src: acceptIcon, bg: "bg-[#ecfdf5]", title: "신청이 수락됐어요!" },
  REQUEST_REJECTED: { src: acceptIcon, bg: "bg-[#fef2f2]", title: "신청이 거절되었습니다." },
  RECOMMENDATION: { src: recommendationIcon, bg: "bg-[#fffbeb]", title: "새로운 추천 룸메이트!" },
  APPROVAL_COMPLETE: { src: approvalIcon, bg: "bg-[#f0fdf4]", title: "합격 인증 승인 완료!" },
};

export default function AlarmItem({
  id,
  type,
  content,
  time,
  isRead,
  onRead,
  onAccept,
  onDecline,
}: AlarmItemProps) {
  // 정의되지 않은 타입이 올 경우를 대비한 예외 처리
  const config = ICON_CONFIG[type] || { src: requestIcon, bg: "bg-[#f3f7f4]", title: "알림" };

  return (
    // 알림을 클릭하면 읽음 처리 함수(onRead)가 실행됩니다.
    <div
      onClick={() => onRead(id)}
      className={`backdrop-blur-[2px] border border-[rgba(122,158,130,0.1)] rounded-[16px] p-[17px] relative cursor-pointer transition-colors ${
        isRead ? "bg-white/40 opacity-70" : "bg-white"
      }`}
    >
      {/* 안 읽은 알림은 우측 상단에 작은 초록색 점 표시 */}
      {!isRead && (
        <span className="absolute top-[18px] right-[18px] h-2 w-2 rounded-full bg-[#7a9e82]" />
      )}

      <div className="flex gap-[12px] items-start">
        <div className={`flex items-center justify-center rounded-full shrink-0 size-[40px] ${config.bg}`}>
          <img src={config.src} alt="" className="w-[20px] h-[20px]" />
        </div>

        <div className="flex flex-col flex-1 pr-4">
          <h2 className="font-bold text-[#111827] text-[14px] leading-[20px]">
            {config.title}
          </h2>
          <p className="font-normal text-[#6b7280] text-[12px] leading-[19.5px] pt-[2px]">
            {content}
          </p>
          <p className="font-normal text-[#d1d5db] text-[12px] leading-[16px] pt-[6px]">
            {time}
          </p>
        </div>
      </div>

      {/* 룸메이트 신청 알림일 때만 수락/거절 버튼 노출 */}
      {type === "REQUEST_RECEIVED" && (
        <div className="flex gap-[8px] pt-[12px]" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="flex-1 h-[34px] flex items-center justify-center border border-[rgba(122,158,130,0.2)] bg-[rgba(122,158,130,0.05)] rounded-[12px]"
            onClick={() => onAccept?.(id)}
          >
            <span className="font-bold text-[#7a9e82] text-[12px] leading-[16px]">수락</span>
          </button>
          <button
            type="button"
            className="flex-1 h-[34px] flex items-center justify-center border border-[#e5e7eb] bg-[#f9fafb] rounded-[12px]"
            onClick={() => onDecline?.(id)}
          >
            <span className="font-bold text-[#6b7280] text-[12px] leading-[16px]">거절</span>
          </button>
        </div>
      )}
    </div>
  );
}