import roommateCancelIcon from "../../assets/mypage/roommate-cancel.svg";

type Props = {
  open: boolean;
  roommateName: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function RoommateCancelModal({ open, roommateName, onClose, onConfirm }: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-[24px]"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[24px] p-[24px] w-full max-w-[360px] flex flex-col items-start"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="flex justify-center w-full pb-[16px]">
          <div className="bg-[#fef2f2] flex items-center justify-center rounded-[16px] size-[48px]">
            <img src={roommateCancelIcon} alt="" className="w-[24px] h-[24px]" />
          </div>
        </div>

        {/* Title */}
        <div className="flex justify-center w-full pb-[8px]">
          <h3 className="font-bold text-[#111827] text-[16px] leading-[24px] text-center">
            룸메이트 해지
          </h3>
        </div>

        {/* Body */}
        <div className="flex justify-center w-full pb-[24px]">
          <p className="text-[14px] leading-[22.75px] text-center">
            <span className="font-bold text-[#1f2937]">{roommateName}</span>
            <span className="font-normal text-[#6b7280]">님과의 룸메이트 관계를 해지할까요?{"\n"}해지 후에는 공유 캘린더를 이용할 수 없어요.</span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-[12px] w-full">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-[46px] flex items-center justify-center border border-[#e5e7eb] rounded-[12px]"
          >
            <span className="font-semibold text-[#6b7280] text-[14px] leading-[20px]">취소</span>
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 h-[46px] flex items-center justify-center bg-[#f87171] rounded-[12px]"
          >
            <span className="font-bold text-white text-[14px] leading-[20px]">해지하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}
