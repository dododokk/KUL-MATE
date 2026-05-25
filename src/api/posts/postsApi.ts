import axiosInstance from "../axiosInstance";
import type { GetPostsResponse, PostDetail, CreatePostRequest, CreatePostResponse } from "./type";

export interface SearchPostsParams {
  keyword?: string;
  dormitoryType?: string;
  smokingStatus?: string;
  showerTime?: string;
  sleepTimeType?: string;
  sleepHabit?: string;
}

// 게시글 검색 (GET /api/posts/search)
export async function searchPosts(params: SearchPostsParams): Promise<GetPostsResponse> {
  const query = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== ""),
  );
  const { data } = await axiosInstance.get<GetPostsResponse>("/api/posts/search", { params: query });
  return data;
}

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

// 게시글 작성 (POST /api/posts)
export async function createPost(body: CreatePostRequest): Promise<CreatePostResponse> {
  const { data } = await axiosInstance.post<CreatePostResponse>("/api/posts", body);
  return data;
}

// 게시글 삭제 (DELETE /api/posts/{postId})
export async function deletePost(postId: number): Promise<void> {
  await axiosInstance.delete(`/api/posts/${postId}`);
}

// 게시글 수정 (PATCH /api/posts/{postId})
export async function updatePost(postId: number, body: CreatePostRequest): Promise<void> {
  await axiosInstance.patch(`/api/posts/${postId}`, body);
}

// 게시글 공개/비공개 전환 (PATCH /api/posts/{postId}/visibility)
export async function togglePostVisibility(postId: number): Promise<void> {
  await axiosInstance.patch(`/api/posts/${postId}/visibility`);
}

// 북마크 목록 조회 (GET /api/posts/bookmarks)
export async function getBookmarkedPosts(): Promise<GetPostsResponse> {
  const { data } = await axiosInstance.get<GetPostsResponse>("/api/posts/bookmarks");
  return data;
}

// 북마크 추가 (POST /api/posts/{postId}/bookmark)
export async function addBookmark(postId: number): Promise<void> {
  await axiosInstance.post(`/api/posts/${postId}/bookmark`);
}

// 북마크 해제 (DELETE /api/posts/{postId}/bookmark)
export async function removeBookmark(postId: number): Promise<void> {
  await axiosInstance.delete(`/api/posts/${postId}/bookmark`);
}
