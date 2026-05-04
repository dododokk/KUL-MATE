import type { ReportItem } from "./adminDummyData";
import ReportCard from "./ReportCard";

interface AdminReportSectionProps {
  reports: ReportItem[];
  onDismiss: (id: string) => void;
  onDeletePost: (id: string) => void;
  onSuspend: (id: string) => void;
}

export default function AdminReportSection({
  reports,
  onDismiss,
  onDeletePost,
  onSuspend,
}: AdminReportSectionProps) {
  const pending = reports.filter((r) => r.status === "pending");
  const resolved = reports.filter((r) => r.status === "resolved");

  return (
    <div className="flex flex-col gap-3 px-5 py-4">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#f87171] shrink-0" />
        <span className="text-xs font-semibold text-[#4b5563]">
          처리 대기 {pending.length}건
        </span>
      </div>

      {pending.length === 0 ? (
        <div className="flex items-center justify-center py-6">
          <p className="text-sm text-[#9ca3af]">처리 대기 중인 신고가 없어요</p>
        </div>
      ) : (
        pending.map((item) => (
          <ReportCard
            key={item.id}
            item={item}
            onDismiss={onDismiss}
            onDeletePost={onDeletePost}
            onSuspend={onSuspend}
          />
        ))
      )}

      {resolved.length > 0 && (
        <>
          <div className="flex items-center gap-2 mt-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#d1d5db] shrink-0" />
            <span className="text-xs font-semibold text-[#9ca3af]">
              처리 완료 {resolved.length}건
            </span>
          </div>

          {resolved.map((item) => (
            <div
              key={item.id}
              className="bg-white/40 border border-[#f3f4f6] rounded-2xl p-[17px] opacity-70"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#f9fafb] text-[#9ca3af] text-xs font-bold px-2 py-0.5 rounded-full">
                  처리완료
                </span>
                <span className="text-xs text-[#9ca3af]">{item.date}</span>
              </div>
              <p className="text-sm font-semibold text-[#4b5563] mb-0.5">
                {item.targetNickname}
              </p>
              <p className="text-xs text-[#9ca3af]">사유: {item.reason}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
