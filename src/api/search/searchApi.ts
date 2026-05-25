import axiosInstance from "../axiosInstance";
import type { GetSearchHistoriesResponse } from "./type";

// 검색 기록 목록 조회 (GET /api/search-histories)
export async function getSearchHistories(): Promise<GetSearchHistoriesResponse> {
  const { data } = await axiosInstance.get<GetSearchHistoriesResponse>("/api/search-histories");
  return data;
}

// 검색 기록 단건 삭제 (DELETE /api/search-histories/{searchHistoryKey})
export async function deleteSearchHistory(searchHistoryKey: number): Promise<void> {
  await axiosInstance.delete(`/api/search-histories/${searchHistoryKey}`);
}

// 검색 기록 전체 삭제 (DELETE /api/search-histories)
export async function deleteAllSearchHistories(): Promise<void> {
  await axiosInstance.delete("/api/search-histories");
}
