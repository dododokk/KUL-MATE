// src/api/report/reportApi.ts

import axiosInstance from "../axiosInstance";
import type { ReportRequest, ReportResponse } from "./type";

// 신고 접수하기 (POST /api/reports)
export async function submitReport(body: ReportRequest): Promise<ReportResponse> {
  const { data } = await axiosInstance.post<ReportResponse>("/api/reports", body);
  return data;
}