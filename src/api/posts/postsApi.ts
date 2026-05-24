import axiosInstance from "../axiosInstance";
import type { GetPostsResponse, PostDetail } from "./type";

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
