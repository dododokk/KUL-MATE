export type ApprovalStatus = 'pending' | 'approved' | 'rejected';
export type ReportStatus = 'pending' | 'resolved';
export type ReportType = '게시글 신고' | '사용자 신고';

export interface ApprovalItem {
  id: string;
  nickname: string;
  studentId: string;
  department: string;
  fileName: string;
  submittedAt: string;
  status: ApprovalStatus;
}

export interface ReportItem {
  id: string;
  type: ReportType;
  date: string;
  targetNickname: string;
  targetDetail: string;
  reporterNickname: string;
  reason: string;
  status: ReportStatus;
  targetId: number;
}

export interface AdminStats {
  totalMembers: number;
  approvedMembers: number;
  weeklyMatches: number;
  totalMatches: number;
  avgMatchScore: number;
  activePostings: number;
  topDepartments: Array<{ name: string; count: number }>;
}

export const ADMIN_STATS: AdminStats = {
  totalMembers: 142,
  approvedMembers: 108,
  weeklyMatches: 5,
  totalMatches: 23,
  avgMatchScore: 81.4,
  activePostings: 67,
  topDepartments: [
    { name: '컴퓨터공학과', count: 28 },
    { name: '경영학과', count: 21 },
    { name: '전기전자공학과', count: 18 },
    { name: '건축학과', count: 14 },
    { name: '화학과', count: 11 },
  ],
};
