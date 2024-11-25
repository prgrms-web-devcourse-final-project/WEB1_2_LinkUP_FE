import axiosInstance from '../../../../api/axiosInstance';

export const defaultPost: Post = {
  postId: '',
  title: '',
  content: '',
  images: [],
  category: '',
  createdAt: '',
  closeAt: '',
  requiredQuantity: 0,
  totalPrice: 0,
  unitPrice: 0,
  url: '',
  authorId: '',
  authorNickname: '',
  updatedAt: '',
  currentQuantity: 0,
  participants: [],
};

// Participant 데이터 타입 정의
export type Participant = {
  userId: string; // 참여자 ID
  quantity: number; // 참여한 수량
  isCancelled: boolean; // 참여 상태 (취소 여부)
};

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
  authorNickname: string; // 작성자 닉네임
  updatedAt: string; // 수정일 (ISO 형식)
  currentQuantity: number; // 현재 참여 현황
  participants: Participant[]; // 참여자 목록
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

// 특정 포스트 가져오기
export const fetchPostById = async (postId: string): Promise<Post> => {
  try {
    // 실제 API 요청 코드
    const response = await axiosInstance.get<Post>(`/api/posts/${postId}`);
    return {
      ...response.data,
      participants: response.data.participants || [], // participants가 없을 경우 빈 배열로 초기화
    };
  } catch (error) {
    console.error('게시물을 가져오는 데 실패했습니다:', error);
    throw new Error('게시물 정보를 가져오지 못했습니다.');
  }
};

// 특정 포스트 삭제하기
export const deletePostById = async (postId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/posts/${postId}`);
    console.log(`게시물 ${postId} 삭제 성공`);
  } catch (error) {
    console.error(`게시물 ${postId} 삭제 중 오류 발생:`, error);
    throw new Error('게시물 삭제에 실패했습니다.');
  }
};

// 공구 진행 참여하기 API
export const joinPost = async (
  postId: string,
  userId: string,
  quantity: number
): Promise<void> => {
  try {
    await axiosInstance.put(`/api/posts/${postId}/join`, {
      userId,
      quantity,
      isCancelled: false, // 참여 상태
    });
  } catch (error) {
    console.error('참여 중 오류 발생:', error);
    throw new Error('참여에 실패했습니다.');
  }
};

// 공구 진행 취소하기 API
export const cancelJoinPost = async (
  postId: string,
  userId: string
): Promise<void> => {
  try {
    await axiosInstance.put(`/api/posts/${postId}/cancel`, {
      userId,
      isCancelled: true, // 취소 상태
    });
  } catch (error) {
    console.error('참여 취소 중 오류 발생:', error);
    throw new Error('참여 취소에 실패했습니다.');
  }
};
