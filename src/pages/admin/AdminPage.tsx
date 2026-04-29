import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader, { type AdminTab } from "../../features/admin/AdminHeader";
import AdminApprovalSection from "../../features/admin/AdminApprovalSection";
import AdminReportSection from "../../features/admin/AdminReportSection";
import AdminStatsSection from "../../features/admin/AdminStatsSection";
import AdminToast, { type ToastMsg } from "../../features/admin/AdminToast";
import {
  initialApprovals,
  initialReports,
  ADMIN_STATS,
  type ApprovalItem,
  type ReportItem,
} from "../../features/admin/adminDummyData";

export default function AdminPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>("approval");
  const [approvals, setApprovals] = useState<ApprovalItem[]>(initialApprovals);
  const [reports, setReports] = useState<ReportItem[]>(initialReports);
  const [toast, setToast] = useState<{
    messages: ToastMsg[];
    visible: boolean;
  }>({
    messages: [],
    visible: false,
  });

  const showToast = (messages: ToastMsg[]) => {
    setToast({ messages, visible: true });
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 2500);
  };

  const handleApprove = (id: string, nickname: string) => {
    setApprovals((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "approved" as const } : a,
      ),
    );
    showToast([
      {
        text: `${nickname}님 승인 완료! 파일이 삭제되었어요.`,
        variant: "success",
      },
    ]);
  };

  const handleReject = (id: string, nickname: string) => {
    setApprovals((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "rejected" as const } : a,
      ),
    );
    showToast([
      {
        text: `${nickname}님 반려 처리되었어요.`,
        variant: "dark",
        showIcon: true,
      },
    ]);
  };

  const handleDismiss = (id: string) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "resolved" as const } : r,
      ),
    );
  };

  const handleDeletePost = (id: string) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "resolved" as const } : r,
      ),
    );
    showToast([
      { text: "신고 처리 완료", variant: "success" },
      { text: "게시글이 삭제되었어요", variant: "dark", showIcon: true },
    ]);
  };

  const handleSuspend = (id: string) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "resolved" as const } : r,
      ),
    );
    showToast([
      { text: "신고 처리 완료", variant: "success" },
      { text: "계정이 정지되었어요", variant: "dark", showIcon: true },
    ]);
  };

  const pendingApprovals = approvals.filter(
    (a) => a.status === "pending",
  ).length;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(160deg, rgb(240,250,244) 0%, rgb(255,255,255) 60%)",
      }}
    >
      <AdminToast messages={toast.messages} visible={toast.visible} />

      <AdminHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        totalMembers={ADMIN_STATS.totalMembers}
        pendingApprovals={pendingApprovals}
        weeklyMatches={ADMIN_STATS.weeklyMatches}
        onBack={() => navigate(-1)}
      />

      <div className="flex-1 pb-10 overflow-y-auto">
        {activeTab === "approval" && (
          <AdminApprovalSection
            approvals={approvals}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        )}
        {activeTab === "report" && (
          <AdminReportSection
            reports={reports}
            onDismiss={handleDismiss}
            onDeletePost={handleDeletePost}
            onSuspend={handleSuspend}
          />
        )}
        {activeTab === "stats" && <AdminStatsSection stats={ADMIN_STATS} />}
      </div>
    </div>
  );
}
