import adminLogoIcon from "../../assets/admin/adminLogo.svg";
import approvalManageOnIcon from "../../assets/admin/approvalManage-on.svg";
import approvalManageOffIcon from "../../assets/admin/approvalManage-off.svg";
import flagOnIcon from "../../assets/admin/flag-on.svg";
import flagOffIcon from "../../assets/admin/flag-off.svg";

export type AdminTab = "approval" | "report";

interface AdminHeaderProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
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
];

export default function AdminHeader({
  activeTab,
  onTabChange,
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