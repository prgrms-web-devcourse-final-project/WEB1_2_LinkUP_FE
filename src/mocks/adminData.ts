import { Post } from '../components/pages/community/api/postApi';

const MOCK_POSTS: Post[] = [
  {
    postId: '1',
    title: '검증된 사용자의 모임글 제목',
    content: '검증된 사용자의 모임글 내용',
    images: ['https://picsum.photos/id/60/200/300'],
    url: 'https://www.naver.com',
    authorId: '1',
    authorNickname: '검증된 사용자',
    currentQuantity: 0,
    requiredQuantity: 5,
    createdAt: '2024-12-01T12:00:00',
    updatedAt: '2024-12-01T12:00:00',
    closeAt: '',
    period: 7,
    totalPrice: 10000,
    unitPrice: 2000,
    category: '생활용품',
    participants: [],
    comments: [],
    status: 'NOT_APPROVED',
    stateUpdatedAt: '',
    cancelledUsers: [],
  },
  {
    postId: '2',
    title: '일반 사용자의 모임글 제목',
    content: '일반 사용자의 모임글 내용',
    images: ['https://picsum.photos/id/61/200/300'],
    url: 'https://www.naver.com',
    authorId: '2',
    authorNickname: '일반 사용자',
    currentQuantity: 0,
    requiredQuantity: 5,
    createdAt: '2024-11-30T12:00:00',
    updatedAt: '2024-11-30T12:00:00',
    closeAt: '',
    period: 5,
    totalPrice: 10000,
    unitPrice: 2000,
    category: '생활용품',
    participants: [],
    comments: [],
    status: 'APPROVED',
    stateUpdatedAt: '2024-11-30T12:00:00',
    cancelledUsers: [],
  },
];

export const mockAdminPosts = (categoryId: string): Partial<Post>[] => {
  switch (categoryId) {
    case 'NOT_APPROVED':
      return MOCK_POSTS.filter((post) => post.status === 'NOT_APPROVED');
    case 'REPORTED':
      return []; // 신고 접수된 글 목록 데이터
    default:
      return [];
  }
};
