import requestIcon from "../../assets/alarm/request.svg";
import acceptIcon from "../../assets/alarm/accept.svg";
import recommendationIcon from "../../assets/alarm/recommendation.svg";
import approvalIcon from "../../assets/alarm/approvalComplete.svg";

export type AlarmType = "request" | "accept" | "recommendation" | "approval";

export type AlarmItemProps = {
  type: AlarmType;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  onAccept?: () => void;
  onDecline?: () => void;
  onViewProfile?: () => void;
};

const ICON_CONFIG: Record<AlarmType, { src: string; bg: string }> = {
  request: { src: requestIcon, bg: "bg-[#f3f7f4]" },
  accept: { src: acceptIcon, bg: "bg-[#ecfdf5]" },
  recommendation: { src: recommendationIcon, bg: "bg-[#fffbeb]" },
  approval: { src: approvalIcon, bg: "bg-[#f0fdf4]" },
};

export default function AlarmItem({
  type,
  title,
  description,
  time,
  isRead,
  onAccept,
  onDecline,
  onViewProfile,
}: AlarmItemProps) {
  const { src, bg } = ICON_CONFIG[type];

  return (
    <div
      className={`backdrop-blur-[2px] bg-[rgba(255,255,255,0.8)] border p-[17px] rounded-[16px] ${
        isRead ? "border-[#f3f4f6]" : "border-[rgba(122,158,130,0.2)]"
      }`}
    >
      <div className="flex gap-[12px] items-start">
        <div
          className={`${bg} flex items-center justify-center rounded-[12px] shrink-0 size-[40px]`}
        >
          <img src={src} alt="" className="w-[18px] h-[18px]" />
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <p
              className={`font-semibold text-[14px] leading-[20px] ${
                isRead ? "text-[#374151]" : "text-[#111827]"
              }`}
            >
              {title}
            </p>
            {!isRead && (
              <div className="pt-[4px] shrink-0 ml-[8px]">
                <span className="block bg-[#7a9e82] rounded-full size-[8px]" />
              </div>
            )}
          </div>

          <p className="font-normal text-[#6b7280] text-[12px] leading-[19.5px] pt-[2px]">
            {description}
          </p>

          <p className="font-normal text-[#d1d5db] text-[12px] leading-[16px] pt-[6px]">
            {time}
          </p>
        </div>
      </div>

      {type === "request" && (
        <div className="flex gap-[8px] pt-[12px]">
          <button
            className="flex-1 h-[34px] flex items-center justify-center border border-[rgba(122,158,130,0.2)] bg-[rgba(122,158,130,0.05)] rounded-[12px]"
            onClick={onAccept}
          >
            <span className="font-bold text-[#7a9e82] text-[12px] leading-[16px]">
              수락
            </span>
          </button>
          <button
            className="flex-1 h-[34px] flex items-center justify-center border border-[#e5e7eb] bg-[#f9fafb] rounded-[12px]"
            onClick={onDecline}
          >
            <span className="font-bold text-[#6b7280] text-[12px] leading-[16px]">
              거절
            </span>
          </button>
          <button
            className="flex-1 h-[34px] flex items-center justify-center border border-[#e5e7eb] bg-[#f9fafb] rounded-[12px]"
            onClick={onViewProfile}
          >
            <span className="font-bold text-[#6b7280] text-[12px] leading-[16px]">
              프로필 보기
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
