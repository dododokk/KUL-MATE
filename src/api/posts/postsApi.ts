import axiosInstance from "../axiosInstance";
import type { PostSummary, GetPostsResponse, PostDetail } from "./type";

// 게시글 목록 조회 (GET /api/posts)
export async function getPosts(): Promise<GetPostsResponse> {
  const { data } = await axiosInstance.get<GetPostsResponse>("/api/posts");
  return data;
}

// 게시글 상세 조회 (GET /api/posts/{postId})
export async function getPost(postId: number): Promise<PostDetail> {
  const { data } = await axiosInstance.get<PostDetail>(`/api/posts/${postId}`);
  return data;
}

// 추천 구인글 목록 조회 (GET /api/recommendations)
export async function getRecommendations(): Promise<PostSummary[]> {
  const { data } = await axiosInstance.get<PostSummary[]>("/api/recommendations");
  return data;
}