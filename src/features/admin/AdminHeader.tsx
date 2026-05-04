import adminLogoIcon from "../../assets/admin/adminLogo.svg";
import usersIcon from "../../assets/admin/users.svg";
import approvalIcon from "../../assets/admin/approval.svg";
import matchingIcon from "../../assets/admin/matching.svg";
import approvalManageOnIcon from "../../assets/admin/approvalManage-on.svg";
import approvalManageOffIcon from "../../assets/admin/approvalManage-off.svg";
import flagOnIcon from "../../assets/admin/flag-on.svg";
import flagOffIcon from "../../assets/admin/flag-off.svg";
import statsOnIcon from "../../assets/admin/stats-on.svg";
import statsOffIcon from "../../assets/admin/stats-off.svg";

export type AdminTab = "approval" | "report" | "stats";

interface AdminHeaderProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  totalMembers: number;
  pendingApprovals: number;
  weeklyMatches: number;
  onBack: () => void;
}

const TABS: {
  key: AdminTab;
  label: string;
  onIcon: string;
  offIcon: string;
}[] = [
  {
    key: "approval",
    label: "승인 관리",
    onIcon: approvalManageOnIcon,
    offIcon: approvalManageOffIcon,
  },
  {
    key: "report",
    label: "신고 관리",
    onIcon: flagOnIcon,
    offIcon: flagOffIcon,
  },
  { key: "stats", label: "통계", onIcon: statsOnIcon, offIcon: statsOffIcon },
];

export default function AdminHeader({
  activeTab,
  onTabChange,
  totalMembers,
  pendingApprovals,
  weeklyMatches,
  onBack,
}: AdminHeaderProps) {
  return (
    <div
      className="flex flex-col px-5 pb-[21px] pt-14 border-b border-[rgba(122,158,130,0.1)]"
      style={{
        background:
          "linear-gradient(160deg, rgb(232,245,238) 0%, rgb(255,255,255) 100%)",
      }}
    >
      {/* 타이틀 행 */}
      <div className="flex items-center gap-3 h-10 mb-4">
        <button
          type="button"
          onClick={onBack}
          className="w-8 h-8 flex items-center justify-center"
          aria-label="뒤로가기"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M12 5L7 10L12 15"
              stroke="#111827"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #7a9e82 0%, #059669 100%)",
            }}
          >
            <img src={adminLogoIcon} alt="" className="w-4 h-4" />
          </div>
          <div>
            <p className="text-base font-black text-[#111827] leading-6">
              관리자 페이지
            </p>
            <p className="text-xs text-[#9ca3af] leading-4">KUL:MATE Admin</p>
          </div>
        </div>
      </div>

      {/* 미니 통계 카드 */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 bg-[#f3f7f4] border border-white/60 rounded-xl p-3 flex flex-col items-center">
          <img src={usersIcon} alt="" className="w-6 h-6 mb-1" />
          <p className="text-lg font-black text-[#7a9e82] leading-7">
            {totalMembers}
          </p>
          <p className="text-xs text-[#6b7280]">전체 회원</p>
        </div>
        <div className="flex-1 bg-[#fffbeb] border border-white/60 rounded-xl p-3 flex flex-col items-center">
          <img src={approvalIcon} alt="" className="w-6 h-6 mb-1" />
          <p className="text-lg font-black text-[#d97706] leading-7">
            {pendingApprovals}
          </p>
          <p className="text-xs text-[#6b7280]">승인 대기</p>
        </div>
        <div className="flex-1 bg-[#fff1f2] border border-white/60 rounded-xl p-3 flex flex-col items-center">
          <img src={matchingIcon} alt="" className="w-6 h-6 mb-1" />
          <p className="text-lg font-black text-[#f43f5e] leading-7">
            {weeklyMatches}
          </p>
          <p className="text-xs text-[#6b7280]">이번 주 매칭</p>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="flex gap-1 bg-white/60 border border-[rgba(122,158,130,0.1)] rounded-xl p-1">
        {TABS.map(({ key, label, onIcon, offIcon }) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onTabChange(key)}
              className={`flex-1 flex items-center justify-center gap-1 h-9 rounded-lg text-xs font-bold transition-all ${
                isActive ? "text-white" : "text-[#9ca3af]"
              }`}
              style={
                isActive
                  ? {
                      background:
                        "linear-gradient(180deg, #7a9e82 0%, #607e68 100%)",
                    }
                  : undefined
              }
            >
              <img
                src={isActive ? onIcon : offIcon}
                alt=""
                className="w-[14px] h-[14px]"
              />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
