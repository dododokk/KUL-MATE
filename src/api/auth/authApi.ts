import axiosInstance from "../axiosInstance";
import type {
  EmailSendRequest,
  EmailSendResponse,
  EmailVerifyRequest,
  EmailVerifyResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ReissueRequest,
  ReissueResponse,
} from "./type";

// 이메일 인증 코드 전송 (POST /api/auth/email/send)
export async function sendEmailCode(body: EmailSendRequest): Promise<EmailSendResponse> {
  const { data } = await axiosInstance.post<EmailSendResponse>("/api/auth/email/send", body);
  return data;
}

// 이메일 인증 코드 검증 (POST /api/auth/email/verify)
export async function verifyEmailCode(body: EmailVerifyRequest): Promise<EmailVerifyResponse> {
  const { data } = await axiosInstance.post<EmailVerifyResponse>("/api/auth/email/verify", body);
  return data;
}

// 회원가입 (POST /api/auth/register)
export async function register(body: RegisterRequest, certificateImage?: File): Promise<RegisterResponse> {
  const formData = new FormData();
  formData.append(
    "request",
    new Blob([JSON.stringify(body)], { type: "application/json" })
  );
  if (certificateImage) {
    formData.append("certificateImage", certificateImage);
  }
  const { data } = await axiosInstance.post<RegisterResponse>("/api/auth/register", formData);
  return data;
}

// 온보딩 완료 상태 업데이트 (PATCH /api/auth/me/onboarding)
export async function updateOnboarding(): Promise<void> {
  await axiosInstance.patch("/api/auth/me/onboarding");
}

// 토큰 재발급 (POST /api/auth/reissue)
export async function reissue(body: ReissueRequest): Promise<ReissueResponse> {
  const { data } = await axiosInstance.post<ReissueResponse>("/api/auth/reissue", body);
  return data;
}

// 로그인 (POST /api/auth/login)
export async function login(body: LoginRequest): Promise<LoginResponse> {
  const { data } = await axiosInstance.post<LoginResponse>("/api/auth/login", body);
  return data;
}

// 로그아웃 (POST /api/auth/logout)
export async function logout(): Promise<void> {
  await axiosInstance.post("/api/auth/logout");
}
