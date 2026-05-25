import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../../api/admin/adminApi"; // 경로 확인 필요

// 타입 및 하위 컴포넌트 import
import type { AdminTab } from "../../features/admin/AdminHeader";
import type { ApprovalItem, ReportItem } from "../../features/admin/adminDummyData";
import type { ToastMsg } from "../../features/admin/AdminToast";

import AdminHeader from "../../features/admin/AdminHeader";
import AdminApprovalSection from "../../features/admin/AdminApprovalSection";
import AdminReportSection from "../../features/admin/AdminReportSection";
//import AdminStatsSection from "../../features/admin/AdminStatsSection";
import AdminToast from "../../features/admin/AdminToast";
//import { ADMIN_STATS } from "../../features/admin/adminDummyData";

export default function AdminPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>("approval");
  const [approvals, setApprovals] = useState<ApprovalItem[]>([]);
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [toast, setToast] = useState<{ messages: ToastMsg[]; visible: boolean }>({
    messages: [],
    visible: false,
  });

  const showToast = (messages: ToastMsg[]) => {
    setToast({ messages, visible: true });
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 2500);
  };

  // 데이터 로딩 Effect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, reportsRes] = await Promise.all([
          adminApi.getPendingUsers(),
          adminApi.getReports()
        ]);

        // 승인 대기 사용자 데이터 매핑
        const mappedApprovals = usersRes.data.data.map((u: any) => ({
          id: String(u.userId),
          nickname: u.nickname,
          studentId: u.studentNumber,
          department: "조회 불가", // API 응답에 학과 정보가 없어 임시 처리
          fileName: "합격증 조회", 
          submittedAt: new Date(u.createdAt).toLocaleDateString(),
          status: u.verificationStatus.toLowerCase(),
        }));
        setApprovals(mappedApprovals);

        // 신고 목록 데이터 매핑
        const mappedReports = reportsRes.data.map((r: any) => ({
          id: String(r.reportId),
          type: r.targetType === "POST" ? "게시글 신고" : "사용자 신고",
          date: new Date(r.createdAt).toLocaleDateString(),
          targetNickname: `Target ID: ${r.targetId}`, // API 응답에 닉네임이 없어 ID로 표기
          targetDetail: "",
          reporterNickname: r.reporterNickname,
          reason: r.reason,
          status: r.status.toLowerCase(),
          targetId: r.targetId, // 원본 targetId 저장 (삭제/정지에 필요)
        }));
        setReports(mappedReports);
      } catch (error) {
        showToast([{ text: "데이터를 불러오는 데 실패했어요.", variant: "dark" }]);
      }
    };
    
    fetchData();
  }, []);

  const handleApprove = async (id: string, nickname: string) => {
    try {
      await adminApi.approveUser(Number(id));
      setApprovals((prev) => prev.filter((a) => a.id !== id));
      showToast([{ text: `${nickname}님 승인 완료! 파일이 삭제되었어요.`, variant: "success" }]);
    } catch (error) {
      showToast([{ text: "승인 처리 중 오류가 발생했어요.", variant: "dark" }]);
    }
  };

  const handleReject = async (id: string, nickname: string) => {
    const reason = window.prompt(`${nickname}님 반려 사유를 입력해주세요.`);
    if (!reason) return;

    try {
      await adminApi.rejectUser(Number(id), reason);
      setApprovals((prev) => prev.filter((a) => a.id !== id));
      showToast([{ text: `${nickname}님 반려 처리되었어요.`, variant: "dark", showIcon: true }]);
    } catch (error) {
      showToast([{ text: "반려 처리 중 오류가 발생했어요.", variant: "dark" }]);
    }
  };

  const handleDismiss = async (id: string) => {
    try {
      await adminApi.rejectReport(Number(id));
      setReports((prev) => prev.map((r) => r.id === id ? { ...r, status: "resolved" as const } : r));
      showToast([{ text: "무혐의 처리 완료", variant: "success" }]);
    } catch (error) {
      showToast([{ text: "처리 중 오류가 발생했어요.", variant: "dark" }]);
    }
  };

  const handleDeletePost = async (id: string, targetId: number) => {
    try {
      await adminApi.deletePost(targetId);
      setReports((prev) => prev.map((r) => r.id === id ? { ...r, status: "resolved" as const } : r));
      showToast([
        { text: "신고 처리 완료", variant: "success" },
        { text: "게시글이 삭제되었어요", variant: "dark", showIcon: true },
      ]);
    } catch (error) {
      showToast([{ text: "게시글 삭제 중 오류가 발생했어요.", variant: "dark" }]);
    }
  };

  const handleSuspend = async (id: string, targetId: number) => {
    try {
      await adminApi.suspendUser(targetId);
      setReports((prev) => prev.map((r) => r.id === id ? { ...r, status: "resolved" as const } : r));
      showToast([
        { text: "신고 처리 완료", variant: "success" },
        { text: "계정이 정지되었어요", variant: "dark", showIcon: true },
      ]);
    } catch (error) {
      showToast([{ text: "계정 정지 중 오류가 발생했어요.", variant: "dark" }]);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f7f4] pb-20">
      <AdminHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onBack={() => navigate(-1)}
      />
      
      {activeTab === "approval" ? (
        <>
          <AdminApprovalSection
            approvals={approvals}
            onApprove={handleApprove}
            onReject={handleReject}
          />
          {/* <AdminStatsSection stats={ADMIN_STATS} /> */}
        </>
      ) : (
        <AdminReportSection
          reports={reports}
          onDismiss={handleDismiss}
          onDeletePost={handleDeletePost}
          onSuspend={handleSuspend}
        />
      )}

      <AdminToast messages={toast.messages} visible={toast.visible} />
    </div>
  );
}