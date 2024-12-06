import axiosInstance from '../../../../api/axiosInstance';
// import { mockCommunityPosts } from '../../../../mocks/communityPosts';
import { Post } from '../../community/api/postApi';

export const fetchAdminPosts = async (
  selectedCategory: string
): Promise<Post[]> => {
  try {
    // `selectedCategory`를 API 요청의 query parameter로 전달
    const response = await axiosInstance.get('/admin/post', {
      params: { category: selectedCategory },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch admin posts:', error);
    throw error;
  }
};
