import { useState } from "react";
import { submitReport } from "../../api/report/reportApi"; // 경로에 맞게 수정해주세요

// 부모 컴포넌트(게시글 상세 등)에서 전달받아야 할 Props 정의
type ReportPageProps = {
  targetType?: "POST" | "USER"; // 기본값 POST
  targetId: number;             // 신고할 게시글(또는 유저)의 ID
  onClose: () => void;          // 닫기 버튼 또는 배경 클릭 시 모달을 닫는 함수
};

const REASONS = ["부적절한 내용", "허위 정보", "도배/스팸", "욕설/비방", "기타"];

export default function ReportPage({ targetType = "POST", targetId, onClose }: ReportPageProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 신고 접수 실행 함수
  const handleReportSubmit = async () => {
    if (!selected || isLoading) return;

    try {
      setIsLoading(true);
      await submitReport({
        targetType,
        targetId,
        reason: selected,
      });
      alert("신고가 정상적으로 접수되었습니다. 깨끗한 커뮤니티를 위한 노력에 감사드립니다!");
      onClose(); // 성공 시 모달 닫기
    } catch (error: any) {
      console.error("신고 접수 실패:", error);
      alert(error.response?.data?.message || "신고 접수 중 문제가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // 배경을 클릭하면 onClose가 실행되어 모달이 닫힙니다. (z-index 추가하여 최상단 배치)
    <div 
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40"
      onClick={onClose} 
    >
      {/* 내부 하얀 영역을 클릭했을 때는 모달이 닫히지 않도록 이벤트 전파(stopPropagation)를 막아줍니다. */}
      <div 
        className="w-full max-w-md rounded-t-[24px] bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 pb-4">
          <span className="text-[#ef4444]">⚑</span>
          <h2 className="text-[16px] font-bold text-[#111827]">신고하기</h2>
        </div>

        <div className="space-y-2 pb-4">
          {REASONS.map((reason) => {
            const isSelected = selected === reason;
            return (
              <button
                key={reason}
                type="button"
                onClick={() => setSelected(reason)}
                className={
                  isSelected
                    ? "h-[46px] w-full rounded-[12px] border border-[#fecaca] bg-[#fef2f2] px-4 text-left text-[14px] font-medium text-[#dc2626]"
                    : "h-[44px] w-full rounded-[12px] bg-[#f9fafb] px-4 text-left text-[14px] font-medium text-[#374151]"
                }
              >
                {reason}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleReportSubmit}
          disabled={!selected || isLoading} // 사유를 선택하지 않았거나 로딩 중이면 비활성화
          className={
            selected && !isLoading
              ? "h-12 w-full rounded-[12px] bg-[#f87171] text-[14px] font-bold text-white transition-colors"
              : "h-12 w-full rounded-[12px] bg-[#f87171] opacity-40 text-[14px] font-bold text-white cursor-not-allowed"
          }
        >
          {isLoading ? "접수 중..." : "신고 접수하기"}
        </button>
      </div>
    </div>
  );
}