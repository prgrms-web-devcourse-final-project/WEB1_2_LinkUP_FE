// import axiosInstance from '../../../../api/axiosInstance';
// import { mockAdminPosts } from '../../../../mocks/adminData';
import { mockCommunityPosts } from '../../../../mocks/communityPosts';
import { Post } from '../../community/api/postApi';

export const fetchAdminPosts = async (
  selectedCategory: string
): Promise<Post[]> => {
  // 실제 API 호출을 사용해야 할 경우 주석 해제
  // const response = await axiosInstance.get(`/admin/posts?category=${categoryId}`);
  // return response.data;

  const posts = await mockCommunityPosts; // 예시: 실제 API 또는 Mock 데이터 사용
  if (selectedCategory === 'NOT_APPROVED') {
    const filteredPosts = posts.filter(
      (post) => post.status === 'NOT_APPROVED'
    );
    return filteredPosts;
  }
  // 다른 카테고리 로직
  return posts.filter((post) => post.category === selectedCategory);
};
