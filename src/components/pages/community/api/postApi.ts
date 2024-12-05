import axiosInstance from '../../../../api/axiosInstance';
// import { mockCommunityPosts } from '../../../../mocks/communityPosts';

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
  | 'PAYMENT_STANDBY' // 결제 대기
  | 'PAYMENT_COMPLETED' // 결제 완료
  | 'DELECTED'; // 삭제(참여 이후)

// POST_STATUS 상수 추가
export const POST_STATUS: { [key in PostStatus]: PostStatus } = {
  NOT_APPROVED: 'NOT_APPROVED',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  PAYMENT_STANDBY: 'PAYMENT_STANDBY',
  PAYMENT_COMPLETED: 'PAYMENT_COMPLETED',
  DELECTED: 'DELECTED',
};

export interface Post {
  communityPostId: number;
  title: string;
  description: string;
  imageUrls: string[];
  productUrl: string;
  userId: string;
  nickname: string;
  currentQuantity: number; // 현재 참여 수량(추가 확인 필요)
  availableNumber: number;
  createdAt: string;
  closeAt: string;
  period: number;
  totalAmount: number;
  unitAmount: number;
  category: string;
  participants: Participant[]; // 참여자 목록(추가 확인 필요)
  comments: Comment[]; // 댓글(추가 확인 필요)
  status: PostStatus;
  stateUpdatedAt?: string; // 상태 변경 시점(추가 확인 필요)
  cancelledUsers?: string[]; // 이탈한 사용자 ID 목록(추가 확인 필요)
}

// Post 생성 시 필요한 타입 정의
export type CreatePostInput = Omit<
  Post,
  | 'communityPostId'
  | 'createdAt'
  | 'closeAt'
  | 'userId'
  | 'nickname'
  | 'participants'
  | 'comments'
  | 'cancelledUsers'
> & {
  period?: number;
};

// 기본 Post 구조
export const defaultPost: Post = {
  communityPostId: 0,
  title: '',
  description: '',
  imageUrls: [],
  productUrl: '',
  userId: '',
  nickname: '',
  currentQuantity: 0, // 현재 참여 수량 초기화(추가 확인 필요)
  availableNumber: 0,
  createdAt: '',
  closeAt: '',
  period: 0,
  totalAmount: 0,
  unitAmount: 0,
  category: '',
  participants: [], // 참여자 목록 초기화(추가 확인 필요)
  comments: [], // 댓글 초기화(추가 확인 필요)
  status: 'NOT_APPROVED', // 기본 상태 설정
  cancelledUsers: [], // 이탈한 사용자 ID 목록 초기화(추가 확인 필요)
};

// 포스트 목록 가져오기 (카테고리와 검색어 기반)
export const getPosts = async (
  category?: string,
  searchQuery?: string
): Promise<Post[]> => {
  const response = await axiosInstance.get('/post', {
    params: { category, search: searchQuery },
  });
  return response.data.filter((post: Post) => post.status !== 'DELECTED');

  // Mock 데이터 기반:
  // return mockCommunityPosts.filter((post) => {
  //   const categoryMatch = !category || post.category === category;
  //   const searchMatch =
  //     !searchQuery ||
  //     post.title.includes(searchQuery) ||
  //     post.content.includes(searchQuery);
  //   return categoryMatch && searchMatch;
  // });
};

// 포스트 생성
export const createPost = async (
  postData: CreatePostInput
): Promise<{ communityPostId: number }> => {
  // 실제 API 사용
  const response = await axiosInstance.post('/post', postData);
  return response.data;
};

// 포스트 상태 업데이트
export const updatePostStatus = async (
  communityPostId: number,
  newStatus: PostStatus,
  period?: number
): Promise<Post> => {
  const response = await axiosInstance.get(`/post/${communityPostId}`);
  const communityPost: Post = response.data;

  // 상태별 처리 로직
  switch (newStatus) {
    case 'APPROVED': {
      if (
        communityPost.status === 'NOT_APPROVED' ||
        communityPost.status === 'REJECTED'
      ) {
        // '(수정요망)' 제거 로직
        const cleanedTitle = communityPost.title.startsWith('(수정요망)')
          ? communityPost.title.replace(/^\(수정요망\)/, '').trim()
          : communityPost.title;

        // createdAt 및 closeAt 갱신
        const approvedAt = new Date().toISOString();
        const calculatedCloseAt = new Date(
          new Date(approvedAt).getTime() + (period || 0) * 24 * 60 * 60 * 1000
        ).toISOString();

        const updatedResponse = await axiosInstance.patch(
          `/post/${communityPostId}/status`,
          {
            status: newStatus,
            title: cleanedTitle,
            createdAt: approvedAt,
            closeAt: calculatedCloseAt,
          }
        );
        return updatedResponse.data;
      } else {
        throw new Error('현재 상태에서 APPROVED로 변경할 수 없습니다.');
      }
    }

    case 'REJECTED': {
      // 실제 API 사용
      if (
        communityPost.status === 'NOT_APPROVED' ||
        communityPost.status === 'REJECTED'
      ) {
        // '(수정요망)' 추가 로직
        const updatedTitle = communityPost.title.startsWith('(수정요망)')
          ? communityPost.title
          : `(수정요망)${communityPost.title}`;

        const updatedResponse = await axiosInstance.patch(
          `/post/${communityPostId}/status`,
          {
            status: newStatus,
            title: updatedTitle,
          }
        );
        return updatedResponse.data;
      } else {
        throw new Error('REJECTED 상태로 변경할 수 없습니다.');
      }
    }

    case 'PAYMENT_STANDBY': {
      // 실제 API 사용
      if (
        communityPost.status === 'APPROVED' &&
        communityPost.currentQuantity === communityPost.availableNumber
      ) {
        const standbyAt = new Date().toISOString();

        const updatedResponse = await axiosInstance.patch(
          `/post/${communityPostId}/status`,
          {
            status: newStatus,
            stateUpdatedAt: standbyAt,
          }
        );
        return updatedResponse.data;
      } else {
        throw new Error('PAYMENT_STANDBY 상태로 변경할 수 없습니다.');
      }
    }

    case 'PAYMENT_COMPLETED': {
      // 참여자 관련 부분이라 수정 필요
      const allPaid = communityPost.participants.every(
        (participant) =>
          participant.isPaymentCompleted && !participant.isCancelled
      );

      if (allPaid) {
        const updatedResponse = await axiosInstance.patch(
          `/post/${communityPostId}/status`,
          {
            status: newStatus,
          }
        );
        return updatedResponse.data;
      } else {
        throw new Error('PAYMENT_COMPLETED 상태로 변경할 수 없습니다.');
      }
    }

    case 'DELECTED': {
      if (
        communityPost.status === 'APPROVED' ||
        communityPost.status === 'PAYMENT_STANDBY'
      ) {
        const updatedResponse = await axiosInstance.patch(
          `/post/${communityPostId}/status`,
          {
            status: newStatus,
          }
        );
        return updatedResponse.data;
      }
      throw new Error('DELETED 상태로 변경할 수 없습니다.');
    }

    default: {
      throw new Error('잘못된 상태 변경 요청입니다.');
    }
  }
};

// 포스트 조회
export const fetchPostById = async (communityPostId: number): Promise<Post> => {
  // 실제 API 사용
  const response = await axiosInstance.get(`/post/${communityPostId}`);
  return response.data;

  // Mock 데이터 기반:
  // const post = mockCommunityPosts.find(
  //   (item) => item.communityPostId === communityPostId
  // );
  // if (!post) {
  //   throw new Error('해당 게시물이 존재하지 않습니다.');
  // }
  // return post;
};

// 포스트 수정
export const updatePost = async (
  communityPostId: number,
  updatedPost: Partial<Post>
): Promise<Post> => {
  // 실제 API 사용
  const response = await axiosInstance.patch(
    `/mypage/post/${communityPostId}`,
    updatedPost
  );
  return response.data;

  // Mock 데이터 기반:
  // const postIndex = mockCommunityPosts.findIndex(
  //   (item) => item.communityPostId === communityPostId
  // );
  // if (postIndex === -1) {
  //   throw new Error('해당 게시물이 존재하지 않습니다.');
  // }
  // const existingPost = mockCommunityPosts[postIndex];
  // const updatedData = {
  //   ...existingPost,
  //   ...updatedPost,
  //   updatedAt: new Date().toISOString(),
  // };
  // mockCommunityPosts[postIndex] = updatedData;
  // return updatedData;
};

// 포스트 삭제
export const deletePostById = async (
  communityPostId: number
): Promise<void> => {
  // 실제 API 사용
  await axiosInstance.delete(`/post/${communityPostId}`);

  // Mock 데이터 기반:
  // const postIndex = mockCommunityPosts.findIndex(
  //   (item) => item.communityPostId === communityPostId
  // );
  // if (postIndex === -1) {
  //   throw new Error('해당 게시물이 존재하지 않습니다.');
  // }
  // mockCommunityPosts.splice(postIndex, 1);
};

// 공구 진행 포스트 참여
export const joinPost = async (
  communityPostId: number,
  userId: string,
  quantity: number
): Promise<void> => {
  // 실제 API 사용
  await axiosInstance.post(`/community/post/${communityPostId}/join`, {
    userId,
    quantity,
  });

  // Mock 데이터 기반:
  // const post = mockCommunityPosts.find(
  //   (item) => item.communityPostId === communityPostId
  // );
  // if (!post) {
  //   throw new Error('해당 게시물이 존재하지 않습니다.');
  // }
  // post.currentQuantity += quantity;
  // post.participants.push({
  //   userId,
  //   quantity,
  //   isCancelled: false,
  //   isPaymentCompleted: false,
  //   isRequiredRefund: false,
  // });
};

// 공구 진행 포스트 참여 취소
export const cancelJoinPost = async (
  communityPostId: number,
  userId: string
): Promise<void> => {
  // 실제 API 사용
  await axiosInstance.post(`community/post/${communityPostId}/cancel`, {
    userId,
  });

  // Mock 데이터 기반:
  // const post = mockCommunityPosts.find(
  //   (item) => item.communityPostId === communityPostId
  // );
  // if (!post) {
  //   throw new Error('해당 게시물이 존재하지 않습니다.');
  // }
  // const participant = post.participants.find((p) => p.userId === userId);
  // if (participant) {
  //   participant.isCancelled = true;
  //   post.cancelledUsers.push(userId); // 취소한 사용자 ID 추가
  // }
};

// 결제 처리 & 환불 처리는 가상 계좌 관련 로직과 API 명세를 기준으로 전부 수정해야 함

// // 결제 처리
// export const completePayment = async (communityPostId: number, userId: string) => {
//   // 실제 API 사용
//   // await axiosInstance.post(`/posts/${postId}/payment`, { userId });

//   const postIndex = mockCommunityPosts.findIndex(
//     (item) => item.postId === postId
//   );
//   if (postIndex === -1) {
//     throw new Error('해당 게시물이 존재하지 않습니다.');
//   }

//   const post = mockCommunityPosts[postIndex];
//   const participant = post.participants.find((p) => p.userId === userId);

//   if (!participant) {
//     throw new Error('해당 사용자가 참여자 목록에 없습니다.');
//   }

//   // 결제 완료 처리
//   participant.isCancelled = false;
//   participant.isPaymentCompleted = true;

//   // 상태 갱신 필요
//   const allPaid = post.participants.every((p) => !p.isCancelled);
//   if (allPaid) {
//     post.status = 'PAYMENT_COMPLETED';
//   }
// };

// 댓글 작성
export const addComment = async (
  communityPostId: number,
  userId: string,
  userNickname: string,
  content: string
): Promise<void> => {
  // 실제 API 사용
  await axiosInstance.post(`/post/${communityPostId}/comments`, {
    userId,
    userNickname,
    content,
  });

  // Mock 데이터 기반:
  // const post = mockCommunityPosts.find(
  //   (item) => item.communityPostId === communityPostId
  // );
  // if (!post) {
  //   throw new Error('해당 게시물이 존재하지 않습니다.');
  // }
  // post.comments.push({
  //   userId,
  //   userNickname,
  //   commentId: `comment-${new Date().getTime()}`,
  //   createdAt: new Date().toISOString(),
  //   content,
  // });
};

// 댓글 삭제
export const deleteComment = async (
  communityPostId: number,
  commentId: string
): Promise<void> => {
  // 실제 API 사용
  await axiosInstance.delete(`/post/${communityPostId}/comments/${commentId}`);

  // Mock 데이터 기반:
  // const post = mockCommunityPosts.find(
  //   (item) => item.communityPostId === communityPostId
  // );
  // if (!post) {
  //   throw new Error('해당 게시물이 존재하지 않습니다.');
  // }
  // post.comments = post.comments.filter(
  //   (comment) => comment.commentId !== commentId
  // );
};

// 댓글 수정
export const updateComment = async (
  communityPostId: number,
  commentId: string,
  content: string
): Promise<void> => {
  // 실제 API 사용
  await axiosInstance.put(`/post/${communityPostId}/comments/${commentId}`, {
    content,
  });

  // Mock 데이터 기반:
  // const post = mockCommunityPosts.find(
  //   (item) => item.communityPostId === communityPostId
  // );
  // if (!post) {
  //   throw new Error('해당 게시물이 존재하지 않습니다.');
  // }
  // const comment = post.comments.find(
  //   (comment) => comment.commentId === commentId
  // );
  // if (comment) {
  //   comment.content = content;
  // }
};
