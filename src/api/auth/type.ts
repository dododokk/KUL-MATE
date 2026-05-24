export interface EmailSendRequest {
  email: string;
}

export interface EmailSendResponse {
  success: boolean;
  message: string;
  data: string;
}

export interface EmailVerifyRequest {
  email: string;
  code: string;
}

export interface EmailVerifyResponse {
  success: boolean;
  message: string;
  data: string;
}

export interface RegisterRequest {
  gender: "MALE" | "FEMALE";
  username: string;
  nickname: string;
  studentNumber: string;
  phoneNumber: string;
  password: string;
  passwordConfirm: string;
  email: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    userId: number;
    username: string;
    status: "PENDING";
  };
}

export interface ReissueRequest {
  refreshToken: string;
}

export type ReissueResponse = LoginResponse;

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    userId: number;
    username: string;
    role: "USER" | "ADMIN";
    status: "PENDING" | "APPROVED" | "REJECTED";
    isOnboardingCompleted: boolean;
  };
}
