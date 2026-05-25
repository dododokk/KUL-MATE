// src/api/report/reportApi.ts

import axiosInstance from "../axiosInstance"; // 경로에 맞게 수정해주세요
import type { ReportRequest, ReportResponse } from "./type";

// 신고 접수하기 (POST /api/reports)
export async function submitReport(body: ReportRequest): Promise<ReportResponse> {
  const { data } = await axiosInstance.post<ReportResponse>("/api/reports", body);
  return data;
}