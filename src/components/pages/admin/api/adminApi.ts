import axiosInstance from '../../../../api/axiosInstance';
import { AdminPost, Post } from '../../../../types/postTypes';
export interface Title {
  title: string;
}
export const fetchPendingPosts = async (): Promise<[AdminPost]> => {
  try {
    const URL = `/api/admin/post`;
    const response = await axiosInstance.get(URL);
    return response.data;
  } catch {
    throw new Error('승인 대기 중인 포스트 목록을 가져오는 데 실패했습니다.');
  }
};

export const approvePost = async (
  postId: number,
  payload: Title
): Promise<Post> => {
  try {
    const URL = `/api/admin/post/approve/${postId}`;
    const response = await axiosInstance.patch(URL, payload);
    return response.data;
  } catch {
    throw new Error(`ID ${postId}의 포스트 승인을 처리하는 데 실패했습니다.`);
  }
};

export const rejectPost = async (
  postId: number,
  payload: Title
): Promise<Post> => {
  try {
    const URL = `/api/admin/post/reject/${postId}`;
    const response = await axiosInstance.patch(URL, payload);
    return response.data;
  } catch {
    throw new Error(`ID ${postId}의 포스트 거절을 처리하는 데 실패했습니다.`);
  }
};
