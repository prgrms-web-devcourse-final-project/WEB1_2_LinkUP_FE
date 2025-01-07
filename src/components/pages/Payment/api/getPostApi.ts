import axiosInstance from '../../../../api/axiosInstance';
import { Post } from '../../../../types/postTypes';

export const getPostById = async (postId: number): Promise<Post> => {
  try {
    const URL = `/community/post/${postId}`;
    const response = await axiosInstance.get(URL);
    return response.data;
  } catch {
    throw new Error('게시글 정보를 가져오는 데 실패했습니다.');
  }
};
