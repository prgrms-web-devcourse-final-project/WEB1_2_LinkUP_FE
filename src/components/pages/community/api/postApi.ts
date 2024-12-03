// import axiosInstance from '../../../../api/axiosInstance';
import { mockCommunityPosts } from '../../../../mocks/communityPosts';

export interface Comment {
  userId: string;
  userNickname: string;
  commentId: string;
  createdAt: string;
  content: string;
}

export interface Participant {
  userId: string;
  quantity: number;
  isCancelled: boolean;
  isPaymentCompleted: boolean;
  isRequiredRefund: boolean;
}

// PostStatus 타입
export type PostStatus =
  | 'NOT_APPROVED' // 승인 대기
  | 'APPROVED' // 승인 완료
  | 'REJECTED' // 승인 거절
  | 'COMPLETED' // 모집 완료
  | 'PAYMENT_STANDBY' // 결제 대기
  | 'PAYMENT_COMPLETED'; // 결제 완료

// POST_STATUS 상수 추가
export const POST_STATUS: { [key in PostStatus]: PostStatus } = {
  NOT_APPROVED: 'NOT_APPROVED',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  COMPLETED: 'COMPLETED',
  PAYMENT_STANDBY: 'PAYMENT_STANDBY',
  PAYMENT_COMPLETED: 'PAYMENT_COMPLETED',
};

export interface Post {
  postId: string;
  title: string;
  content: string;
  images: string[];
  url: string;
  authorId: string;
  authorNickname: string;
  currentQuantity: number;
  requiredQuantity: number;
  createdAt: string;
  updatedAt: string;
  closeAt: string;
  period?: number;
  totalPrice: number;
  unitPrice: number;
  category: string;
  participants: Participant[];
  comments: Comment[];
  status: PostStatus; // 상태 추가
  stateUpdatedAt?: string; // 상태 변경 시점
  cancelledUsers: string[]; // 이탈한 사용자 ID 목록
}

// Post 생성 시 필요한 타입 정의
export type CreatePostInput = Omit<
  Post,
  | 'postId'
  | 'createdAt'
  | 'updatedAt'
  | 'closeAt'
  | 'authorId'
  | 'authorNickname'
  | 'currentQuantity'
  | 'participants'
  | 'comments'
  | 'cancelledUsers'
> & {
  period?: number;
};

// 기본 Post 구조
export const defaultPost: Post = {
  postId: '',
  title: '',
  content: '',
  images: [],
  url: '',
  authorId: '',
  authorNickname: '',
  currentQuantity: 0,
  requiredQuantity: 0,
  createdAt: '',
  updatedAt: '',
  closeAt: '',
  period: 0,
  totalPrice: 0,
  unitPrice: 0,
  category: '',
  participants: [],
  comments: [],
  status: 'NOT_APPROVED', // 기본 상태 설정
  cancelledUsers: [], // 이탈한 사용자 ID 목록 초기화
};

// 포스트 목록 가져오기 (카테고리와 검색어 기반)
export const getPosts = async (
  category?: string,
  searchQuery?: string
): Promise<Post[]> => {
  // 실제 API 사용
  // const response = await axiosInstance.get('/posts', { params: { category, search: searchQuery } });
  // return response.data;

  // Mock 데이터 기반:
  return mockCommunityPosts.filter((post) => {
    const categoryMatch = !category || post.category === category;
    const searchMatch =
      !searchQuery ||
      post.title.includes(searchQuery) ||
      post.content.includes(searchQuery);
    return categoryMatch && searchMatch;
  });
};

// 포스트 생성
export const createPost = async (
  postData: CreatePostInput
): Promise<{ postId: string }> => {
  // 실제 API 사용
  // const response = await axiosInstance.post('/posts', postData);
  // return response.data;

  // Mock 데이터 기반:
  const postId = `communityPost-${new Date().getTime()}`;
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const createdPost: Post = {
    postId,
    createdAt,
    updatedAt,
    closeAt: '',
    authorId: 'user-00001',
    authorNickname: '사용자 A',
    currentQuantity: 0,
    participants: [],
    comments: [],
    ...postData,
    status: 'NOT_APPROVED', // 초기 상태를 '승인 대기'로 설정
    cancelledUsers: [], // 이탈한 사용자 목록 초기화
  };

  mockCommunityPosts.push(createdPost); // Mock 데이터에 추가
  return { postId };
};

// 포스트 상태 업데이트
export const updatePostStatus = async (
  postId: string,
  newStatus: PostStatus
): Promise<Post> => {
  // Mock 데이터 기반:
  const postIndex = mockCommunityPosts.findIndex(
    (item) => item.postId === postId
  );
  if (postIndex === -1) {
    throw new Error('해당 게시물이 존재하지 않습니다.');
  }

  const post = mockCommunityPosts[postIndex];
  const updatedAt = new Date().toISOString();

  // 상태별 처리 로직
  switch (newStatus) {
    case 'APPROVED': {
      if (post.status !== 'NOT_APPROVED' && post.status !== 'REJECTED') {
        throw new Error('현재 상태에서 승인할 수 없습니다.');
      }

      // 제목이 "(수정요망)"으로 시작하는 경우만 제거
      const cleanedTitle = post.title.startsWith('(수정요망)')
        ? post.title.replace(/^\(수정요망\)/, '').trim()
        : post.title;

      // 승인 시 createdAt, updatedAt 갱신 및 closeAt 설정
      const period = post.period || 0;

      // 실제 API 사용
      // const response = await axiosInstance.patch(`/posts/${postId}/status`, {
      //   status: newStatus,
      //   title: cleanedTitle,
      //   updatedAt,
      //   closeAt: new Date(new Date(updatedAt).getTime() + period * 24 * 60 * 60 * 1000).toISOString(),
      // });
      // return response.data;

      mockCommunityPosts[postIndex] = {
        ...post,
        status: newStatus,
        title: cleanedTitle,
        createdAt: updatedAt, // 관리자가 승인한 시점으로 갱신
        updatedAt,

        // closeAt 계산 (updatedAt + period)
        closeAt: new Date(
          new Date(updatedAt).getTime() + period * 24 * 60 * 60 * 1000
        ).toISOString(),
      };
      break;
    }

    case 'REJECTED': {
      // 거절 처리 로직
      if (post.status === 'NOT_APPROVED' || post.status === 'REJECTED') {
        // 'NOT_APPROVED' 상태 또는 기존 'REJECTED' 상태인 경우 처리
        const updatedTitle = post.title.startsWith('(수정요망)')
          ? post.title
          : `(수정요망)${post.title}`;

        // 실제 API 사용
        // const response = await axiosInstance.patch(`/posts/${postId}/status`, {
        //   status: newStatus,
        //   title: updatedTitle, // 제목에 수정요망 표시
        // });
        // return response.data;

        mockCommunityPosts[postIndex] = {
          ...post,
          status: newStatus,
          title: updatedTitle, // 제목에 수정요망 표시
        };
      }
      break;
    }

    case 'COMPLETED': {
      // 모집 완료: 모집 조건 충족 여부 확인
      if (post.currentQuantity < post.requiredQuantity) {
        throw new Error('모집 조건을 충족하지 못했습니다.');
      }

      // 실제 API 사용
      // const response = await axiosInstance.patch(`/posts/${postId}/status`, { status: newStatus });
      // return response.data;

      mockCommunityPosts[postIndex] = {
        ...post,
        status: newStatus,
      };
      break;
    }

    case 'PAYMENT_STANDBY': {
      // 결제 대기: 모집 완료 상태 확인
      if (post.status !== 'COMPLETED') {
        throw new Error('모집 완료 상태가 아닙니다.');
      }

      // 실제 API 사용
      // if (post.createdAt === post.updatedAt) {
      //   const response = await axiosInstance.patch(`/posts/${postId}/status`, {
      //     status: newStatus,
      //     stateUpdatedAt: new Date().toISOString(),
      //   });
      //   return response.data;
      // } else {
      //   throw new Error('관리자의 추가 승인이 필요합니다.');
      // }

      // 모집 완료 후 자동 승인 조건
      if (post.createdAt === post.updatedAt) {
        mockCommunityPosts[postIndex] = {
          ...post,
          status: newStatus,
          stateUpdatedAt: new Date().toISOString(), // 결제 대기 상태로 변경된 시점 저장
        };
      } else {
        // 관리자의 추가 승인을 요구하는 로직
        throw new Error(
          '관리자의 추가 승인이 필요합니다. createdAt과 updatedAt이 다릅니다.'
        );
      }
      break;
    }

    case 'PAYMENT_COMPLETED': {
      // 결제 완료: 모든 참가자 결제 여부 확인
      const allPaid = post.participants.every(
        (participant) => !participant.isCancelled
      );
      if (!allPaid) {
        throw new Error('모든 참가자가 결제를 완료하지 않았습니다.');
      }

      // 실제 API 사용
      // const response = await axiosInstance.patch(`/posts/${postId}/status`, { status: newStatus });
      // return response.data;

      mockCommunityPosts[postIndex] = {
        ...post,
        status: newStatus,
      };
      break;
    }

    default:
      throw new Error('잘못된 상태 변경 요청입니다.');
  }

  return mockCommunityPosts[postIndex];
};

// 포스트 조회
export const fetchPostById = async (postId: string): Promise<Post> => {
  // 실제 API 사용
  // const response = await axiosInstance.get(`/posts/${postId}`);
  // return response.data;

  // Mock 데이터 기반:
  const post = mockCommunityPosts.find((item) => item.postId === postId);
  if (!post) {
    throw new Error('해당 게시물이 존재하지 않습니다.');
  }
  return post;
};

// 포스트 수정
export const updatePost = async (
  postId: string,
  updatedPost: Partial<Post>
): Promise<Post> => {
  // 실제 API 사용
  // const response = await axiosInstance.patch(`/posts/${postId}`, updatedPost);
  // return response.data;

  // Mock 데이터 기반:
  const postIndex = mockCommunityPosts.findIndex(
    (item) => item.postId === postId
  );
  if (postIndex === -1) {
    throw new Error('해당 게시물이 존재하지 않습니다.');
  }
  const existingPost = mockCommunityPosts[postIndex];
  const updatedData = {
    ...existingPost,
    ...updatedPost,
    updatedAt: new Date().toISOString(),
  };
  mockCommunityPosts[postIndex] = updatedData;
  return updatedData;
};

// 포스트 삭제
export const deletePostById = async (postId: string): Promise<void> => {
  // 실제 API 사용
  // await axiosInstance.delete(`/posts/${postId}`);

  // Mock 데이터 기반:
  const postIndex = mockCommunityPosts.findIndex(
    (item) => item.postId === postId
  );
  if (postIndex === -1) {
    throw new Error('해당 게시물이 존재하지 않습니다.');
  }
  mockCommunityPosts.splice(postIndex, 1);
};

// 공구 진행 포스트 참여
export const joinPost = async (
  postId: string,
  userId: string,
  quantity: number
): Promise<void> => {
  // 실제 API 사용
  // await axiosInstance.post(`/posts/${postId}/join`, { userId, quantity });

  // Mock 데이터 기반:
  const post = mockCommunityPosts.find((item) => item.postId === postId);
  if (!post) {
    throw new Error('해당 게시물이 존재하지 않습니다.');
  }
  post.currentQuantity += quantity;
  post.participants.push({
    userId,
    quantity,
    isCancelled: false,
    isPaymentCompleted: false,
    isRequiredRefund: false,
  });
};

// 공구 진행 포스트 참여 취소
export const cancelJoinPost = async (
  postId: string,
  userId: string
): Promise<void> => {
  // 실제 API 사용
  // await axiosInstance.post(`/posts/${postId}/cancel`, { userId });

  // Mock 데이터 기반:
  const post = mockCommunityPosts.find((item) => item.postId === postId);
  if (!post) {
    throw new Error('해당 게시물이 존재하지 않습니다.');
  }
  const participant = post.participants.find((p) => p.userId === userId);
  if (participant) {
    participant.isCancelled = true;
    post.cancelledUsers.push(userId); // 취소한 사용자 ID 추가
  }
};

// 결제 처리
export const completePayment = async (postId: string, userId: string) => {
  // 실제 API 사용
  // await axiosInstance.post(`/posts/${postId}/payment`, { userId });

  const postIndex = mockCommunityPosts.findIndex(
    (item) => item.postId === postId
  );
  if (postIndex === -1) {
    throw new Error('해당 게시물이 존재하지 않습니다.');
  }

  const post = mockCommunityPosts[postIndex];
  const participant = post.participants.find((p) => p.userId === userId);

  if (!participant) {
    throw new Error('해당 사용자가 참여자 목록에 없습니다.');
  }

  // 결제 완료 처리
  participant.isCancelled = false;
  participant.isPaymentCompleted = true;

  // 상태 갱신 필요
  const allPaid = post.participants.every((p) => !p.isCancelled);
  if (allPaid) {
    post.status = 'PAYMENT_COMPLETED';
  }
};

// 환불 처리
export const requestRefund = async (postId: string, userId: string) => {
  // 실제 API 사용
  // await axiosInstance.post(`/posts/${postId}/refund`, { userId });

  const postIndex = mockCommunityPosts.findIndex(
    (item) => item.postId === postId
  );
  if (postIndex === -1) {
    throw new Error('해당 게시물이 존재하지 않습니다.');
  }

  const post = mockCommunityPosts[postIndex];
  const participant = post.participants.find((p) => p.userId === userId);

  if (!participant) {
    throw new Error('해당 사용자가 참여자 목록에 없습니다.');
  }

  // 환불 처리
  participant.isCancelled = true;
  participant.isRequiredRefund = true;

  // 참여 취소 및 상태 변경
  post.cancelledUsers.push(userId);
  post.currentQuantity -= participant.quantity;

  // 모집 상태로 복귀
  if (post.status === 'PAYMENT_STANDBY') {
    post.status = 'APPROVED';
  }
};

// 댓글 작성
export const addComment = async (
  postId: string,
  userId: string,
  userNickname: string,
  content: string
): Promise<void> => {
  // 실제 API 사용
  // await axiosInstance.post(`/posts/${postId}/comments`, { userId, userNickname, content });

  // Mock 데이터 기반:
  const post = mockCommunityPosts.find((item) => item.postId === postId);
  if (!post) {
    throw new Error('해당 게시물이 존재하지 않습니다.');
  }
  post.comments.push({
    userId,
    userNickname,
    commentId: `comment-${new Date().getTime()}`,
    createdAt: new Date().toISOString(),
    content,
  });
};

// 댓글 삭제
export const deleteComment = async (
  postId: string,
  commentId: string
): Promise<void> => {
  // 실제 API 사용
  // await axiosInstance.delete(`/posts/${postId}/comments/${commentId}`);

  // Mock 데이터 기반:
  const post = mockCommunityPosts.find((item) => item.postId === postId);
  if (!post) {
    throw new Error('해당 게시물이 존재하지 않습니다.');
  }
  post.comments = post.comments.filter(
    (comment) => comment.commentId !== commentId
  );
};

// 댓글 수정
export const updateComment = async (
  postId: string,
  commentId: string,
  content: string
): Promise<void> => {
  // 실제 API 사용
  // await axiosInstance.put(`/posts/${postId}/comments/${commentId}`, {
  //   content,
  // });

  // Mock 데이터 기반:
  const post = mockCommunityPosts.find((item) => item.postId === postId);
  if (!post) {
    throw new Error('해당 게시물이 존재하지 않습니다.');
  }
  const comment = post.comments.find(
    (comment) => comment.commentId === commentId
  );
  if (comment) {
    comment.content = content;
  }
};
