import { useState } from "react";
import { submitReport } from "../../api/report/reportApi"; // ✨ api 경로 확인 필요

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetId: number;
  targetType: "USER" | "POST";
  targetNickname: string;
}

export default function ReportModal({
  isOpen,
  onClose,
  targetId,
  targetType,
  targetNickname,
}: ReportModalProps) {
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!reason.trim()) {
      alert("신고 사유를 입력해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      await submitReport({
        targetType,
        targetId,
        reason,
      });
      alert("신고가 정상적으로 접수되었습니다.");
      setReason("");
      onClose();
    } catch (error) {
      alert("신고 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
      <div className="bg-white rounded-2xl w-full max-w-[340px] p-5">
        <h3 className="text-lg font-bold text-[#111827] mb-2">
          {targetType === "USER" ? "사용자 신고" : "게시글 신고"}
        </h3>
        <p className="text-sm text-[#4b5563] mb-4">
          <span className="font-bold text-[#f87171]">{targetNickname}</span>님을 신고하시겠습니까?
        </p>

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="신고 사유를 상세히 적어주세요 (허위 신고 시 제재를 받을 수 있습니다)"
          className="w-full h-24 p-3 border border-[#e5e7eb] rounded-xl text-sm resize-none focus:outline-none focus:border-[#7a9e82] mb-4"
        />

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 bg-[#f3f4f6] text-[#4b5563] text-sm font-semibold rounded-xl"
            disabled={isSubmitting}
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 py-3 bg-[#ef4444] text-white text-sm font-bold rounded-xl disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "처리 중..." : "신고하기"}
          </button>
        </div>
      </div>
    </div>
  );
}