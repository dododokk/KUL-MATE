import type { ApprovalItem } from "./adminDummyData";
import ApprovalCard from "./ApprovalCard";

interface AdminApprovalSectionProps {
  approvals: ApprovalItem[];
  onApprove: (id: string, nickname: string) => void;
  onReject: (id: string, nickname: string) => void;
}

export default function AdminApprovalSection({
  approvals,
  onApprove,
  onReject,
}: AdminApprovalSectionProps) {
  const pending = approvals.filter((a) => a.status === "pending");

  return (
    <div className="flex flex-col gap-3 px-5 py-4">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] shrink-0" />
        <span className="text-xs font-semibold text-[#4b5563]">
          승인 대기 {pending.length}건
        </span>
      </div>

      {pending.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-sm text-[#9ca3af]">대기 중인 승인 요청이 없어요</p>
        </div>
      ) : (
        pending.map((item) => (
          <ApprovalCard
            key={item.id}
            item={item}
            onApprove={onApprove}
            onReject={onReject}
          />
        ))
      )}
    </div>
  );
}
