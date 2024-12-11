import axiosInstance from '../../../../api/axiosInstance';
import { Post } from '../../../../types/postTypes';

// 관리자용 승인 대기 중인 포스트 목록 조회
export const fetchPendingPosts = async (): Promise<Post[]> => {
  const response = await axiosInstance.get('/api/admin/post', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  });
  if (response.status !== 200) {
    throw new Error('Failed to fetch pending posts');
  }
  return response.data;
};

// 관리자용 포스트 승인 처리
export const approvePost = async (
  communityPostId: number,
  title: string
): Promise<Post> => {
  try {
    const response = await axiosInstance.patch(
      `/api/admin/post/approve/${communityPostId}`,
      { title },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      }
    );
    if (response.status !== 200) {
      throw new Error('Failed to approve post');
    }
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error(`Error approving post with ID ${communityPostId}`);
  }
};

// 관리자용 포스트 거절 처리
export const rejectPost = async (
  communityPostId: number,
  title: string
): Promise<Post> => {
  try {
    const response = await axiosInstance.patch(
      `/api/admin/post/reject/${communityPostId}`,
      { title },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      }
    );
    if (response.status !== 200) {
      throw new Error('Failed to reject post');
    }
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error(`Error rejecting post with ID ${communityPostId}`);
  }
};
