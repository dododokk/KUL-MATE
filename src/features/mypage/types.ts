// UI 상태 관리용 타입은 그대로 유지합니다.
export type MyPageTab = "info" | "posts" | "saved";

// 1. 마이페이지 헤더 및 요약 정보 (GET /api/users/me)
export interface UserProfile {
  userId: number;
  nickname: string;
  gender: "MALE" | "FEMALE";
  department: string;
  grade: number; // string("2학년") -> number(2)로 변경
  dormitoryType: string;
  profileImageUrl: string | null;
  approvalStatus: "PENDING" | "APPROVED" | "REJECTED"; // 대문자로 변경
  approvalStatusLabel: string;
  approvalDescription: string;
  counts: {
    myPostCount: number;
    bookmarkCount: number;
  };
  surveyStatus: {
    myLifestyleCompleted: boolean;
    preferredRoommateCompleted: boolean;
  };
}

// 2. 룸메이트 정보 (마이페이지 요약 응답 내부에 포함)
export interface RoommateInfo {
  userId: number;
  nickname: string;
  gender: "MALE" | "FEMALE";
  department: string;
  grade: number;
  dormitoryType: string;
  matchScore: number;
  statusLabel: string; // matchDate 대신 상태 라벨 사용
  requestId?: number;
}

// 3. 계정 설정 정보 (GET /api/users/me/settings)
export interface AccountInfo {
  userId: number;
  nickname: string;
  phoneNumber: string; // phone -> phoneNumber
  profileImageUrl: string | null;
  username: string;    // 로그인 아이디 (기존 userId 역할)
  studentId: string;
  email: string;
}

// 4. 내 글 목록 (GET /api/users/me/posts)
export interface MyPost {
  postId: number; // id -> postId
  title: string;
  contentPreview: string;
  dormitoryType: string;
  createdAt: string; // date -> createdAt
  visible: boolean;  // isPublic -> visible
  visibilityLabel: string;
  matched: boolean;
}

// 5. 저장한 글 목록 (GET /api/users/me/bookmarks)
export interface SavedPost {
  postId: number;
  authorId: number;
  authorNickname: string;
  gender: string;
  major: string; // authorDepartment -> major
  studentNumberLabel: string;
  birthYear: number;
  dormitoryType: string;
  title: string;
  sleepStartTime: string;
  sleepEndTime: string;
  wakeUpStartTime: string;
  wakeUpEndTime: string;
  tags: string[];
  bookmarked: boolean;
  matchScore: number;
  status: "OPEN" | "CLOSED";
  matched: boolean;
  createdAt: string; // date -> createdAt
}

// --- Request DTOs (API 호출 시 사용) ---
export interface UpdateSettingsRequest {
  nickname: string;
  phoneNumber: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}