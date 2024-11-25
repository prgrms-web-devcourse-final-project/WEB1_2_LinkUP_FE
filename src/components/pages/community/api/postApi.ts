import axiosInstance from '../../../../api/axiosInstance';

// Post 데이터 타입 정의(클라이언트에서 Post 생성)
export type PostData = {
  title: string; // 제목
  content: string; // 내용
  images: string[]; // 이미지 URL 배열
  category: string; // 카테고리명
  createdAt: string; // 생성일 (ISO 형식)
  closeAt: string; // 마감일 (ISO 형식)
  requiredQuantity: number; // 필요 수량
  totalPrice: number; // 총 가격
  unitPrice: number; // 개당 가격
  url: string; // 관련 URL
};

// Post 타입 정의(서버에서 받아온 Post 데이터)
export interface Post extends PostData {
  postId: string; // 글 고유 ID
  authorId: string; // 작성자 ID
  updatedAt: string; // 수정일 (ISO 형식)
  currentQuantity: number; // 현재 참여 현황
}

// Post 생성 API
export const createPost = async (
  postData: PostData
): Promise<{ postId: string }> => {
  try {
    const response = await axiosInstance.post('/api/posts', postData);
    return response.data; // { postId: ... } 형식의 응답 기대
  } catch (error) {
    console.error('게시물 생성 중 오류 발생:', error);
    throw new Error('게시물 생성에 실패했습니다.');
  }
};

// 게시글 목록 가져오기 (카테고리와 검색어 기반)
export const getPosts = async (
  category?: string,
  searchQuery?: string
): Promise<Post[]> => {
  try {
    const params: Record<string, string | undefined> = {};
    if (category) params.category = category;
    if (searchQuery) params.search = searchQuery;

    const response = await axiosInstance.get<Post[]>('/api/posts', { params });
    return response.data;
  } catch (error) {
    console.error('게시물 목록을 가져오는 데 실패했습니다:', error);
    throw new Error('게시물 목록을 가져오지 못했습니다.');
  }
};
