// --- 마이페이지 (GET /api/users/me) ---
export interface MyPageSummaryResponse {
  userId: number;
  nickname: string;
  gender: "MALE" | "FEMALE";
  department: string;
  grade: number;
  dormitoryType: string;
  profileImageUrl: string | null;
  approvalStatus: "PENDING" | "APPROVED" | "REJECTED";
  approvalStatusLabel: string;
  approvalDescription: string;
  counts: {
    myPostCount: number;
    bookmarkCount: number;
  };
  roommate: {
    userId: number;
    nickname: string;
    gender: "MALE" | "FEMALE";
    department: string;
    grade: number;
    dormitoryType: string;
    matchScore: number;
    statusLabel: string;
  } | null;
  surveyStatus: {
    myLifestyleCompleted: boolean;
    preferredRoommateCompleted: boolean;
  };
}

// --- 계정 설정 조회 (GET /api/users/me/settings) ---
export interface AccountSettingsResponse {
  userId: number;
  nickname: string;
  phoneNumber: string;
  profileImageUrl: string | null;
  username: string;
  studentId: string;
  email: string;
}

// --- 내 글 조회 (GET /api/users/me/posts) ---
export interface MyPostResponse {
  postId: number;
  title: string;
  contentPreview: string;
  dormitoryType: string;
  createdAt: string;
  visible: boolean;
  visibilityLabel: string;
  matched: boolean;
}

// --- 저장한 글 목록 조회 (GET /api/users/me/bookmarks) ---
export interface SavedPostResponse {
  postId: number;
  authorId: number;
  authorNickname: string;
  gender: string;
  major: string;
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
  createdAt: string;
}

// --- 내 계정 설정 수정 (PATCH /api/users/me/settings) ---
export interface UpdateSettingsRequest {
  nickname: string;
  phoneNumber: string;
}

// --- 비밀번호 변경 (PATCH /api/users/me/password) ---
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}