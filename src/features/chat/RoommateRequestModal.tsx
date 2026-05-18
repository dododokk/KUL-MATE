import heartIcon from "../../assets/chat/heart.svg";

type Props = {
  userName: string;
  mode: "confirm" | "success";
  onConfirm: () => void;
  onClose: () => void;
};

export default function RoommateRequestModal({
  userName,
  mode,
  onConfirm,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center px-[20px] z-20">
      <div className="bg-white flex flex-col p-[24px] rounded-[24px] w-[335px] max-w-[360px]">
        {mode === "confirm" ? (
          <>
            <h3 className="font-bold text-[#111827] text-[16px] leading-[24px] pb-[8px]">
              룸메이트 신청
            </h3>
            <p className="text-[14px] leading-[20px] pb-[20px]">
              <span className="font-bold text-[#1f2937]">{userName}</span>
              <span className="font-normal text-[#6b7280]">
                님에게 룸메이트를 신청할까요?
              </span>
            </p>
            <div className="flex gap-[12px]">
              <button
                className="border border-[#e5e7eb] flex-1 h-[46px] flex items-center justify-center rounded-[12px]"
                onClick={onClose}
              >
                <span className="font-semibold text-[#6b7280] text-[14px] leading-[20px]">
                  취소
                </span>
              </button>
              <button
                className="bg-[#7a9e82] flex-1 h-[46px] flex items-center justify-center rounded-[12px]"
                onClick={onConfirm}
              >
                <span className="font-bold text-white text-[14px] leading-[20px]">
                  신청하기
                </span>
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center py-[8px]">
            <div className="bg-[rgba(122,158,130,0.1)] flex items-center justify-center rounded-full size-[56px] mb-[12px]">
              <img src={heartIcon} alt="" className="w-[24px] h-[24px]" />
            </div>
            <p className="font-bold text-[#111827] text-[14px] leading-[21px] text-center">
              룸메이트 신청 완료!
            </p>
            <p className="font-normal text-[#6b7280] text-[14px] leading-[20px] text-center pt-[4px]">
              {userName}님에게 신청을 보냈어요
            </p>
            <button
              className="bg-[#7a9e82] flex items-center justify-center h-[40px] px-[24px] py-[10px] rounded-[12px] mt-[16px]"
              onClick={onClose}
            >
              <span className="font-bold text-white text-[14px] leading-[20px]">
                확인
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
