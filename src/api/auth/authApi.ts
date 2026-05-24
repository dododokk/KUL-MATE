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
} from "./type";

// 이메일 인증 코드 전송
export async function sendEmailCode(body: EmailSendRequest): Promise<EmailSendResponse> {
  const { data } = await axiosInstance.post<EmailSendResponse>("/api/auth/email/send", body);
  return data;
}

// 이메일 인증 코드 검증
export async function verifyEmailCode(body: EmailVerifyRequest): Promise<EmailVerifyResponse> {
  const { data } = await axiosInstance.post<EmailVerifyResponse>("/api/auth/email/verify", body);
  return data;
}

// 회원가입
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

export async function login(body: LoginRequest): Promise<LoginResponse> {
  const { data } = await axiosInstance.post<LoginResponse>("/api/auth/login", body);
  return data;
}
