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

export const initialApprovals: ApprovalItem[] = [
  {
    id: '1',
    nickname: '초록고양이',
    studentId: '202300001',
    department: '컴퓨터공학과',
    fileName: '기숙사합격증_홍길동.pdf',
    submittedAt: '2026-03-22',
    status: 'pending',
  },
  {
    id: '2',
    nickname: '밤새우기달인',
    studentId: '202200045',
    department: '경영학과',
    fileName: '합격증_김서연.jpg',
    submittedAt: '2026-03-21',
    status: 'pending',
  },
  {
    id: '3',
    nickname: '전자공돌이',
    studentId: '202400023',
    department: '전기전자공학과',
    fileName: 'dormitory_cert.png',
    submittedAt: '2026-03-23',
    status: 'pending',
  },
];

export const initialReports: ReportItem[] = [
  {
    id: '1',
    type: '게시글 신고',
    date: '2026-03-22',
    targetNickname: '건축하는도현',
    targetDetail: '건축과 2학년 - 작업 많지만 배려할게요!',
    reporterNickname: '초록고양이',
    reason: '부적절한 언어 사용',
    status: 'pending',
  },
  {
    id: '2',
    type: '사용자 신고',
    date: '2026-03-21',
    targetNickname: '밤새우기달인',
    targetDetail: '사용자 신고',
    reporterNickname: '새내기전전지호',
    reason: '허위 정보 작성',
    status: 'pending',
  },
  {
    id: '3',
    type: '사용자 신고',
    date: '2026-03-20',
    targetNickname: '화학유나4학년',
    targetDetail: '',
    reporterNickname: '',
    reason: '스팸/광고성 게시물',
    status: 'resolved',
  },
];

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
