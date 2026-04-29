import type { ApprovalItem } from "./adminDummyData";
import usersIcon from "../../assets/admin/users.svg";
import documentIcon from "../../assets/admin/document.svg";

interface ApprovalCardProps {
  item: ApprovalItem;
  onApprove: (id: string, nickname: string) => void;
  onReject: (id: string, nickname: string) => void;
}

export default function ApprovalCard({
  item,
  onApprove,
  onReject,
}: ApprovalCardProps) {
  return (
    <div className="backdrop-blur-sm bg-white/70 border border-[rgba(122,158,130,0.1)] rounded-2xl p-[17px] w-full">
      <div className="flex gap-3 items-center mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: "linear-gradient(135deg, #e2eee4 0%, #d1fae5 100%)",
          }}
        >
          <img src={usersIcon} alt="" className="w-[18px] h-[18px]" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-bold text-[#111827]">
              {item.nickname}
            </span>
            <span className="bg-[#fffbeb] text-[#d97706] text-xs font-semibold px-1.5 py-0.5 rounded-full">
              대기중
            </span>
          </div>
          <p className="text-xs text-[#9ca3af]">
            {item.studentId} · {item.department}
          </p>
        </div>
      </div>

      <div className="bg-[#f9fafb] rounded-xl p-3 mb-3">
        <div className="flex items-center gap-2">
          <img
            src={documentIcon}
            alt=""
            className="w-[14px] h-[14px] shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-[#374151] truncate">
              {item.fileName}
            </p>
            <p className="text-xs text-[#9ca3af]">제출일: {item.submittedAt}</p>
          </div>
          <button
            type="button"
            className="text-xs font-semibold text-[#7a9e82] shrink-0"
          >
            보기
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onReject(item.id, item.nickname)}
          className="flex-1 h-[38px] border border-[#fee2e2] rounded-xl text-xs font-semibold text-[#f87171]"
        >
          반려
        </button>
        <button
          type="button"
          onClick={() => onApprove(item.id, item.nickname)}
          className="flex-1 h-[38px] bg-[#7a9e82] rounded-xl text-xs font-bold text-white"
        >
          승인
        </button>
      </div>
    </div>
  );
}
