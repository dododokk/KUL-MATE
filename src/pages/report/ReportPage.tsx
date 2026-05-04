import { useState } from "react";

const REASONS = ["부적절한 내용", "허위 정보", "도배/스팸", "욕설/비방", "기타"];

export default function ReportPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black/40">
      <div className="fixed bottom-0 left-0 w-full rounded-t-[24px] bg-white p-6">
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
          className={
            selected
              ? "h-12 w-full rounded-[12px] bg-[#f87171] text-[14px] font-bold text-white"
              : "h-12 w-full rounded-[12px] bg-[#f87171] opacity-40 text-[14px] font-bold text-white"
          }
        >
          신고 접수하기
        </button>
      </div>
    </div>
  );
}

