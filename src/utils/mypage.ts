export type ApprovalStatus = "PENDING" | "APPROVED" | "REJECTED";

const APPROVAL_LABELS: Record<ApprovalStatus, string> = {
  PENDING: "검토중",
  APPROVED: "승인 완료",
  REJECTED: "반려됨",
};

export function getApprovalStatusLabel(status: ApprovalStatus): string {
  return APPROVAL_LABELS[status] ?? status;
}
