import axiosInstance from "../axiosInstance"; // 실제 경로에 맞게 수정해주세요
import type {
  MyPageSummaryResponse,
  AccountSettingsResponse,
  MyPostResponse,
  SavedPostResponse,
  UpdateSettingsRequest,
  ChangePasswordRequest
} from "./type";

// 1. 내 마이페이지 요약 조회
export async function getMyPageSummary(): Promise<MyPageSummaryResponse> {
  const { data } = await axiosInstance.get<MyPageSummaryResponse>("/api/users/me");
  return data;
}

// 2. 내 계정 설정 조회
export async function getAccountSettings(): Promise<AccountSettingsResponse> {
  const { data } = await axiosInstance.get<AccountSettingsResponse>("/api/users/me/settings");
  return data;
}

// 3. 내 글 목록 조회
export async function getMyPosts(): Promise<MyPostResponse[]> {
  const { data } = await axiosInstance.get<MyPostResponse[]>("/api/users/me/posts");
  return data;
}

// 4. 저장한 글 목록 조회
export async function getSavedPosts(): Promise<SavedPostResponse[]> {
  const { data } = await axiosInstance.get<SavedPostResponse[]>("/api/users/me/bookmarks");
  return data;
}

// 5. 내 계정 설정 수정
export async function updateAccountSettings(body: UpdateSettingsRequest): Promise<void> {
  await axiosInstance.patch("/api/users/me/settings", body);
}

// 6. 비밀번호 변경
export async function changePassword(body: ChangePasswordRequest): Promise<void> {
  await axiosInstance.patch("/api/users/me/password", body);
}

// 7. 회원 탈퇴 (요청 바디에 password 포함)
export async function withdrawAccount(password: string): Promise<void> {
  await axiosInstance.delete("/api/users/me", {
    data: { password } // axios delete에서 body를 보낼 때는 data 속성을 사용합니다.
  });
}