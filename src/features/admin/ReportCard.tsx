import type { ReportItem } from "./adminDummyData";

interface ReportCardProps {
  item: ReportItem;
  onDismiss: (id: string) => void;
  onDeletePost: (id: string) => void;
  onSuspend: (id: string) => void;
}

export default function ReportCard({
  item,
  onDismiss,
  onDeletePost,
  onSuspend,
}: ReportCardProps) {
  const isPostReport = item.type === "게시글 신고";

  return (
    <div className="backdrop-blur-sm bg-white/70 border border-[rgba(254,226,226,0.6)] rounded-2xl p-[17px] w-full">
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            isPostReport
              ? "bg-[#fffbeb] text-[#d97706]"
              : "bg-[#fef2f2] text-[#ef4444]"
          }`}
        >
          {item.type}
        </span>
        <span className="text-xs text-[#9ca3af]">{item.date}</span>
      </div>

      <p className="text-sm font-bold text-[#111827] mb-0.5">
        {item.targetNickname}
      </p>
      {item.targetDetail && (
        <p className="text-xs text-[#6b7280] mb-1 truncate">
          {item.targetDetail}
        </p>
      )}
      <p className="text-xs text-[#9ca3af] mb-3">
        {item.reporterNickname && `신고자: ${item.reporterNickname} · `}사유:{" "}
        {item.reason}
      </p>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onDismiss(item.id)}
          className="flex-1 h-[34px] border border-[#e5e7eb] rounded-xl text-xs font-semibold text-[#4b5563]"
        >
          무혐의
        </button>
        <button
          type="button"
          onClick={() => onDeletePost(item.id)}
          className="flex-1 h-[34px] bg-[#fffbeb] border border-[#fde68a] rounded-xl text-xs font-semibold text-[#b45309]"
        >
          게시글 삭제
        </button>
        <button
          type="button"
          onClick={() => onSuspend(item.id)}
          className="flex-1 h-[34px] bg-[#f87171] rounded-xl text-xs font-bold text-white"
        >
          계정 정지
        </button>
      </div>
    </div>
  );
}
