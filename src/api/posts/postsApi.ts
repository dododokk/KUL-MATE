import axiosInstance from "../axiosInstance";
import type { GetPostsResponse, PostDetail } from "./type";

export async function getPosts(): Promise<GetPostsResponse> {
  const { data } = await axiosInstance.get<GetPostsResponse>("/api/posts");
  return data;
}

export async function getPost(postId: number): Promise<PostDetail> {
  const { data } = await axiosInstance.get<PostDetail>(`/api/posts/${postId}`);
  return data;
}
