export type CommunityPost = {
  postId: string;
  title: string;
  content: string;
  images: string[];
  urlAddress: string;
  authorId: string;
  currentQuantity: number;
  requiredQuantity: number;
  createdAt: string;
  updatedAt: string;
  closeAt: string;
  totalPrice: number;
  itemUnitPrice: number;
  categories: {
    name: string;
  }[];
};

export const mockCommunityPosts: CommunityPost[] = [
  {
    postId: 'communityPost-00001',
    title: '생활용품 관련 공구 글 1 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T00:00:00',
    updatedAt: '2024-11-01T00:00:00',
    closeAt: '2024-11-08T00:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '생활용품',
      },
    ],
  },
  {
    postId: 'communityPost-00002',
    title: '생활용품 관련 공구 글 2 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T01:00:00',
    updatedAt: '2024-11-01T01:00:00',
    closeAt: '2024-11-08T01:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '생활용품',
      },
    ],
  },
  {
    postId: 'communityPost-00003',
    title: '생활용품 관련 공구 글 3 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T02:00:00',
    updatedAt: '2024-11-01T02:00:00',
    closeAt: '2024-11-08T02:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '생활용품',
      },
    ],
  },
  {
    postId: 'communityPost-00004',
    title: '생활용품 관련 공구 글 4 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T03:00:00',
    updatedAt: '2024-11-01T03:00:00',
    closeAt: '2024-11-08T03:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '생활용품',
      },
    ],
  },
  {
    postId: 'communityPost-00005',
    title: '생활용품 관련 공구 글 5 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T04:00:00',
    updatedAt: '2024-11-01T04:00:00',
    closeAt: '2024-11-08T04:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '생활용품',
      },
    ],
  },
  {
    postId: 'communityPost-00006',
    title: '생활용품 관련 공구 글 6 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T05:00:00',
    updatedAt: '2024-11-01T05:00:00',
    closeAt: '2024-11-08T05:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '생활용품',
      },
    ],
  },
  {
    postId: 'communityPost-00007',
    title: '생활용품 관련 공구 글 7 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T06:00:00',
    updatedAt: '2024-11-01T06:00:00',
    closeAt: '2024-11-08T06:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '생활용품',
      },
    ],
  },
  {
    postId: 'communityPost-00008',
    title: '생활용품 관련 공구 글 8 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T07:00:00',
    updatedAt: '2024-11-01T07:00:00',
    closeAt: '2024-11-08T07:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '생활용품',
      },
    ],
  },
  {
    postId: 'communityPost-00009',
    title: '생활용품 관련 공구 글 9 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T08:00:00',
    updatedAt: '2024-11-01T08:00:00',
    closeAt: '2024-11-08T08:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '생활용품',
      },
    ],
  },
  {
    postId: 'communityPost-000010',
    title: '식료품 관련 공구 글 1 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T00:00:00',
    updatedAt: '2024-11-01T00:00:00',
    closeAt: '2024-11-08T00:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '식료품',
      },
    ],
  },
  {
    postId: 'communityPost-000011',
    title: '식료품 관련 공구 글 2 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T01:00:00',
    updatedAt: '2024-11-01T01:00:00',
    closeAt: '2024-11-08T01:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '식료품',
      },
    ],
  },
  {
    postId: 'communityPost-000012',
    title: '식료품 관련 공구 글 3 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T02:00:00',
    updatedAt: '2024-11-01T02:00:00',
    closeAt: '2024-11-08T02:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '식료품',
      },
    ],
  },
  {
    postId: 'communityPost-00013',
    title: '식료품 관련 공구 글 4 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T03:00:00',
    updatedAt: '2024-11-01T03:00:00',
    closeAt: '2024-11-08T03:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '식료품',
      },
    ],
  },
  {
    postId: 'communityPost-00014',
    title: '식료품 관련 공구 글 5 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T04:00:00',
    updatedAt: '2024-11-01T04:00:00',
    closeAt: '2024-11-08T04:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '식료품',
      },
    ],
  },
  {
    postId: 'communityPost-00015',
    title: '식료품 관련 공구 글 6 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T05:00:00',
    updatedAt: '2024-11-01T05:00:00',
    closeAt: '2024-11-08T05:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '식료품',
      },
    ],
  },
  {
    postId: 'communityPost-00016',
    title: '식료품 관련 공구 글 7 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T06:00:00',
    updatedAt: '2024-11-01T06:00:00',
    closeAt: '2024-11-08T06:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '식료품',
      },
    ],
  },
  {
    postId: 'communityPost-00017',
    title: '식료품 관련 공구 글 8 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T07:00:00',
    updatedAt: '2024-11-01T07:00:00',
    closeAt: '2024-11-08T07:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '식료품',
      },
    ],
  },
  {
    postId: 'communityPost-00018',
    title: '식료품 관련 공구 글 9 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T08:00:00',
    updatedAt: '2024-11-01T08:00:00',
    closeAt: '2024-11-08T08:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '식료품',
      },
    ],
  },
  {
    postId: 'communityPost-00019',
    title: '식료품 관련 공구 글 10 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T09:00:00',
    updatedAt: '2024-11-01T09:00:00',
    closeAt: '2024-11-08T09:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '식료품',
      },
    ],
  },
  {
    postId: 'communityPost-00020',
    title: '식료품 관련 공구 글 11 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T10:00:00',
    updatedAt: '2024-11-01T10:00:00',
    closeAt: '2024-11-08T10:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '식료품',
      },
    ],
  },
  {
    postId: 'communityPost-00021',
    title: '식료품 관련 공구 글 12 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T11:00:00',
    updatedAt: '2024-11-01T11:00:00',
    closeAt: '2024-11-08T11:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '식료품',
      },
    ],
  },
  {
    postId: 'communityPost-00022',
    title: '식료품 관련 공구 글 13 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T12:00:00',
    updatedAt: '2024-11-01T12:00:00',
    closeAt: '2024-11-08T12:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '식료품',
      },
    ],
  },
  {
    postId: 'communityPost-00023',
    title: '패션/의류 관련 공구 글 1 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T00:00:00',
    updatedAt: '2024-11-01T00:00:00',
    closeAt: '2024-11-08T00:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '패션/의류',
      },
    ],
  },
  {
    postId: 'communityPost-00024',
    title: '패션/의류 관련 공구 글 2 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T01:00:00',
    updatedAt: '2024-11-01T0100:00',
    closeAt: '2024-11-08T01:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '패션/의류',
      },
    ],
  },
  {
    postId: 'communityPost-00025',
    title: '패션/의류 관련 공구 글 3 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T02:00:00',
    updatedAt: '2024-11-01T02:00:00',
    closeAt: '2024-11-08T02:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '패션/의류',
      },
    ],
  },
  {
    postId: 'communityPost-00026',
    title: '패션/의류 관련 공구 글 4 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T03:00:00',
    updatedAt: '2024-11-01T03:00:00',
    closeAt: '2024-11-08T03:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '패션/의류',
      },
    ],
  },
  {
    postId: 'communityPost-00027',
    title: '패션/의류 관련 공구 글 5 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T04:00:00',
    updatedAt: '2024-11-01T04:00:00',
    closeAt: '2024-11-08T04:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '패션/의류',
      },
    ],
  },
  {
    postId: 'communityPost-00028',
    title: '패션/의류 관련 공구 글 6 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T05:00:00',
    updatedAt: '2024-11-01T05:00:00',
    closeAt: '2024-11-08T05:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '패션/의류',
      },
    ],
  },
  {
    postId: 'communityPost-00029',
    title: '패션/의류 관련 공구 글 7 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T06:00:00',
    updatedAt: '2024-11-01T06:00:00',
    closeAt: '2024-11-08T06:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '패션/의류',
      },
    ],
  },
  {
    postId: 'communityPost-00030',
    title: '패션/의류 관련 공구 글 8 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T07:00:00',
    updatedAt: '2024-11-01T07:00:00',
    closeAt: '2024-11-08T07:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '패션/의류',
      },
    ],
  },
  {
    postId: 'communityPost-00031',
    title: '패션/의류 관련 공구 글 9 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T08:00:00',
    updatedAt: '2024-11-01T08:00:00',
    closeAt: '2024-11-08T08:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '패션/의류',
      },
    ],
  },
  {
    postId: 'communityPost-00032',
    title: '패션/의류 관련 공구 글 10 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T09:00:00',
    updatedAt: '2024-11-01T09:00:00',
    closeAt: '2024-11-08T09:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '패션/의류',
      },
    ],
  },
  {
    postId: 'communityPost-00033',
    title: '패션/의류 관련 공구 글 11 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T10:00:00',
    updatedAt: '2024-11-01T10:00:00',
    closeAt: '2024-11-08T10:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '패션/의류',
      },
    ],
  },
  {
    postId: 'communityPost-00034',
    title: '패션/의류 관련 공구 글 12 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T11:00:00',
    updatedAt: '2024-11-01T11:00:00',
    closeAt: '2024-11-08T11:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '패션/의류',
      },
    ],
  },
  {
    postId: 'communityPost-00035',
    title: '패션/의류 관련 공구 글 13 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T12:00:00',
    updatedAt: '2024-11-01T12:00:00',
    closeAt: '2024-11-08T12:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '패션/의류',
      },
    ],
  },
  {
    postId: 'communityPost-00036',
    title: '패션/의류 관련 공구 글 14 제목이 아주 길어질 거야 테스트를 해보자',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['https://picsum.photos/id/38/200/300'],
    urlAddress: 'https://www.naver.com',
    authorId: 'user-00001',
    currentQuantity: 1,
    requiredQuantity: 5,
    createdAt: '2024-11-01T13:00:00',
    updatedAt: '2024-11-01T13:00:00',
    closeAt: '2024-11-08T13:00:00',
    totalPrice: 10000,
    itemUnitPrice: 2000,
    categories: [
      {
        name: '패션/의류',
      },
    ],
  },
];

// 마감 기한 설정 함수
// const calculateCloseAt = (createdAt: string, days: number): string => {
//     const createdDate = new Date(createdAt);
//     createdDate.setDate(createdDate.getDate() + days);
//     return createdDate.toISOString();
// }

// 포스트 데이터 예시
// const post: Post = {
//     postId: "communityPost-00001",
//     title: "생활용품 관련 공구 글 1",
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     images: ['https://picsum.photos/id/38/200/300'],
//     urlAddress: 'https://www.naver.com',
//     createdAt: new Date().toISOString(), // 현재 시간 기준 생성
//   };

// 마감 날짜 계산 및 추가
//   const daysToClose = 7; // 7일 후 마감
//   post.closeAt = calculateCloseAt(post.createdAt, daysToClose);

//   {
//     postId: 'communityPost-00002',
//     title: '생활용품 관련 공구 글 2',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/35/200/300',
//       'https://picsum.photos/id/61/200/300',
//       'https://picsum.photos/id/14/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00002',
//     createdAt: new Date('2024-11-02'),
//     updatedAt: new Date('2024-11-04'),
//     categories: [
//       {
//         name: '생활용품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00003',
//     title: '생활용품 관련 공구 글 3',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: ['https://picsum.photos/id/30/200/300'],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00003',
//     createdAt: new Date('2024-11-03'),
//     updatedAt: new Date('2024-11-04'),
//     categories: [
//       {
//         name: '생활용품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00004',
//     title: '생활용품 관련 공구 글 4',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/10/200/300',
//       'https://picsum.photos/id/6/200/300',
//       'https://picsum.photos/id/83/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00004',
//     createdAt: new Date('2024-11-04'),
//     updatedAt: new Date('2024-11-05'),
//     categories: [
//       {
//         name: '생활용품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00005',
//     title: '생활용품 관련 공구 글 5',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/13/200/300',
//       'https://picsum.photos/id/12/200/300',
//       'https://picsum.photos/id/63/200/300',
//       'https://picsum.photos/id/7/200/300',
//       'https://picsum.photos/id/35/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00005',
//     createdAt: new Date('2024-11-05'),
//     updatedAt: new Date('2024-11-05'),
//     categories: [
//       {
//         name: '생활용품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00006',
//     title: '생활용품 관련 공구 글 6',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: ['https://picsum.photos/id/26/200/300'],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00006',
//     createdAt: new Date('2024-11-06'),
//     updatedAt: new Date('2024-11-11'),
//     categories: [
//       {
//         name: '생활용품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00007',
//     title: '생활용품 관련 공구 글 7',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: ['https://picsum.photos/id/53/200/300'],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00007',
//     createdAt: new Date('2024-11-07'),
//     updatedAt: new Date('2024-11-09'),
//     categories: [
//       {
//         name: '생활용품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00008',
//     title: '식료품 관련 공구 글 1',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/21/200/300',
//       'https://picsum.photos/id/89/200/300',
//       'https://picsum.photos/id/5/200/300',
//       'https://picsum.photos/id/11/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00008',
//     createdAt: new Date('2024-11-08'),
//     updatedAt: new Date('2024-11-12'),
//     categories: [
//       {
//         name: '식료품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00009',
//     title: '식료품 관련 공구 글 2',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/18/200/300',
//       'https://picsum.photos/id/25/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00009',
//     createdAt: new Date('2024-11-09'),
//     updatedAt: new Date('2024-11-13'),
//     categories: [
//       {
//         name: '식료품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00010',
//     title: '식료품 관련 공구 글 3',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/83/200/300',
//       'https://picsum.photos/id/97/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00010',
//     createdAt: new Date('2024-11-10'),
//     updatedAt: new Date('2024-11-12'),
//     categories: [
//       {
//         name: '식료품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00011',
//     title: '식료품 관련 공구 글 4',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/64/200/300',
//       'https://picsum.photos/id/6/200/300',
//       'https://picsum.photos/id/76/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00011',
//     createdAt: new Date('2024-11-11'),
//     updatedAt: new Date('2024-11-13'),
//     categories: [
//       {
//         name: '식료품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00012',
//     title: '식료품 관련 공구 글 5',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/74/200/300',
//       'https://picsum.photos/id/16/200/300',
//       'https://picsum.photos/id/30/200/300',
//       'https://picsum.photos/id/42/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00012',
//     createdAt: new Date('2024-11-12'),
//     updatedAt: new Date('2024-11-12'),
//     categories: [
//       {
//         name: '식료품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00013',
//     title: '식료품 관련 공구 글 6',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/70/200/300',
//       'https://picsum.photos/id/46/200/300',
//       'https://picsum.photos/id/85/200/300',
//       'https://picsum.photos/id/60/200/300',
//       'https://picsum.photos/id/48/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00013',
//     createdAt: new Date('2024-11-13'),
//     updatedAt: new Date('2024-11-15'),
//     categories: [
//       {
//         name: '식료품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00014',
//     title: '식료품 관련 공구 글 7',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: ['https://picsum.photos/id/64/200/300'],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00014',
//     createdAt: new Date('2024-11-14'),
//     updatedAt: new Date('2024-11-15'),
//     categories: [
//       {
//         name: '식료품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00015',
//     title: '패션/의류 관련 공구 글 1',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: ['https://picsum.photos/id/91/200/300'],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00015',
//     createdAt: new Date('2024-11-15'),
//     updatedAt: new Date('2024-11-20'),
//     categories: [
//       {
//         name: '패션/의류',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00016',
//     title: '패션/의류 관련 공구 글 2',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/54/200/300',
//       'https://picsum.photos/id/75/200/300',
//       'https://picsum.photos/id/28/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00016',
//     createdAt: new Date('2024-11-16'),
//     updatedAt: new Date('2024-11-19'),
//     categories: [
//       {
//         name: '패션/의류',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00017',
//     title: '패션/의류 관련 공구 글 3',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: ['https://picsum.photos/id/95/200/300'],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00017',
//     createdAt: new Date('2024-11-17'),
//     updatedAt: new Date('2024-11-20'),
//     categories: [
//       {
//         name: '패션/의류',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00018',
//     title: '패션/의류 관련 공구 글 4',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/70/200/300',
//       'https://picsum.photos/id/12/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00018',
//     createdAt: new Date('2024-11-18'),
//     updatedAt: new Date('2024-11-20'),
//     categories: [
//       {
//         name: '패션/의류',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00019',
//     title: '패션/의류 관련 공구 글 5',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/69/200/300',
//       'https://picsum.photos/id/30/200/300',
//       'https://picsum.photos/id/62/200/300',
//       'https://picsum.photos/id/82/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00019',
//     createdAt: new Date('2024-11-19'),
//     updatedAt: new Date('2024-11-22'),
//     categories: [
//       {
//         name: '패션/의류',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00020',
//     title: '패션/의류 관련 공구 글 6',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/33/200/300',
//       'https://picsum.photos/id/5/200/300',
//       'https://picsum.photos/id/55/200/300',
//       'https://picsum.photos/id/6/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00020',
//     createdAt: new Date('2024-11-20'),
//     updatedAt: new Date('2024-11-23'),
//     categories: [
//       {
//         name: '패션/의류',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00021',
//     title: '패션/의류 관련 공구 글 7',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: ['https://picsum.photos/id/50/200/300'],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00021',
//     createdAt: new Date('2024-11-21'),
//     updatedAt: new Date('2024-11-23'),
//     categories: [
//       {
//         name: '패션/의류',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00022',
//     title: '전자제품 관련 공구 글 1',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/60/200/300',
//       'https://picsum.photos/id/40/200/300',
//       'https://picsum.photos/id/75/200/300',
//       'https://picsum.photos/id/29/200/300',
//       'https://picsum.photos/id/69/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00022',
//     createdAt: new Date('2024-11-22'),
//     updatedAt: new Date('2024-11-22'),
//     categories: [
//       {
//         name: '전자제품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00023',
//     title: '전자제품 관련 공구 글 2',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/84/200/300',
//       'https://picsum.photos/id/11/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00023',
//     createdAt: new Date('2024-11-23'),
//     updatedAt: new Date('2024-11-26'),
//     categories: [
//       {
//         name: '전자제품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00024',
//     title: '전자제품 관련 공구 글 3',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: ['https://picsum.photos/id/73/200/300'],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00024',
//     createdAt: new Date('2024-11-24'),
//     updatedAt: new Date('2024-11-27'),
//     categories: [
//       {
//         name: '전자제품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00025',
//     title: '전자제품 관련 공구 글 4',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/97/200/300',
//       'https://picsum.photos/id/38/200/300',
//       'https://picsum.photos/id/5/200/300',
//       'https://picsum.photos/id/13/200/300',
//       'https://picsum.photos/id/25/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00025',
//     createdAt: new Date('2024-11-25'),
//     updatedAt: new Date('2024-11-28'),
//     categories: [
//       {
//         name: '전자제품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00026',
//     title: '전자제품 관련 공구 글 5',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/86/200/300',
//       'https://picsum.photos/id/46/200/300',
//       'https://picsum.photos/id/63/200/300',
//       'https://picsum.photos/id/72/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00026',
//     createdAt: new Date('2024-11-26'),
//     updatedAt: new Date('2024-11-26'),
//     categories: [
//       {
//         name: '전자제품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00027',
//     title: '전자제품 관련 공구 글 6',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/76/200/300',
//       'https://picsum.photos/id/31/200/300',
//       'https://picsum.photos/id/87/200/300',
//       'https://picsum.photos/id/12/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00027',
//     createdAt: new Date('2024-11-27'),
//     updatedAt: new Date('2024-11-27'),
//     categories: [
//       {
//         name: '전자제품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00028',
//     title: '전자제품 관련 공구 글 7',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: ['https://picsum.photos/id/47/200/300'],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00028',
//     createdAt: new Date('2024-11-28'),
//     updatedAt: new Date('2024-12-01'),
//     categories: [
//       {
//         name: '전자제품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00029',
//     title: '가구/인테리어 관련 공구 글 1',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/8/200/300',
//       'https://picsum.photos/id/86/200/300',
//       'https://picsum.photos/id/39/200/300',
//       'https://picsum.photos/id/68/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00029',
//     createdAt: new Date('2024-11-29'),
//     updatedAt: new Date('2024-12-01'),
//     categories: [
//       {
//         name: '가구/인테리어',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00030',
//     title: '가구/인테리어 관련 공구 글 2',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/71/200/300',
//       'https://picsum.photos/id/69/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00030',
//     createdAt: new Date('2024-11-30'),
//     updatedAt: new Date('2024-12-04'),
//     categories: [
//       {
//         name: '가구/인테리어',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00031',
//     title: '가구/인테리어 관련 공구 글 3',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/8/200/300',
//       'https://picsum.photos/id/36/200/300',
//       'https://picsum.photos/id/73/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00031',
//     createdAt: new Date('2024-12-01'),
//     updatedAt: new Date('2024-12-02'),
//     categories: [
//       {
//         name: '가구/인테리어',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00032',
//     title: '가구/인테리어 관련 공구 글 4',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/66/200/300',
//       'https://picsum.photos/id/80/200/300',
//       'https://picsum.photos/id/39/200/300',
//       'https://picsum.photos/id/78/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00032',
//     createdAt: new Date('2024-12-02'),
//     updatedAt: new Date('2024-12-02'),
//     categories: [
//       {
//         name: '가구/인테리어',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00033',
//     title: '가구/인테리어 관련 공구 글 5',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/81/200/300',
//       'https://picsum.photos/id/47/200/300',
//       'https://picsum.photos/id/43/200/300',
//       'https://picsum.photos/id/14/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00033',
//     createdAt: new Date('2024-12-03'),
//     updatedAt: new Date('2024-12-08'),
//     categories: [
//       {
//         name: '가구/인테리어',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00034',
//     title: '가구/인테리어 관련 공구 글 6',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/7/200/300',
//       'https://picsum.photos/id/60/200/300',
//       'https://picsum.photos/id/71/200/300',
//       'https://picsum.photos/id/39/200/300',
//       'https://picsum.photos/id/47/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00034',
//     createdAt: new Date('2024-12-04'),
//     updatedAt: new Date('2024-12-06'),
//     categories: [
//       {
//         name: '가구/인테리어',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00035',
//     title: '가구/인테리어 관련 공구 글 7',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/39/200/300',
//       'https://picsum.photos/id/6/200/300',
//       'https://picsum.photos/id/49/200/300',
//       'https://picsum.photos/id/27/200/300',
//       'https://picsum.photos/id/88/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00035',
//     createdAt: new Date('2024-12-05'),
//     updatedAt: new Date('2024-12-06'),
//     categories: [
//       {
//         name: '가구/인테리어',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00036',
//     title: '유아/아동용품 관련 공구 글 1',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: ['https://picsum.photos/id/36/200/300'],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00036',
//     createdAt: new Date('2024-12-06'),
//     updatedAt: new Date('2024-12-08'),
//     categories: [
//       {
//         name: '유아/아동용품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00037',
//     title: '유아/아동용품 관련 공구 글 2',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/63/200/300',
//       'https://picsum.photos/id/5/200/300',
//       'https://picsum.photos/id/6/200/300',
//       'https://picsum.photos/id/20/200/300',
//       'https://picsum.photos/id/41/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00037',
//     createdAt: new Date('2024-12-07'),
//     updatedAt: new Date('2024-12-11'),
//     categories: [
//       {
//         name: '유아/아동용품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00038',
//     title: '유아/아동용품 관련 공구 글 3',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/45/200/300',
//       'https://picsum.photos/id/77/200/300',
//       'https://picsum.photos/id/23/200/300',
//       'https://picsum.photos/id/88/200/300',
//       'https://picsum.photos/id/6/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00038',
//     createdAt: new Date('2024-12-08'),
//     updatedAt: new Date('2024-12-09'),
//     categories: [
//       {
//         name: '유아/아동용품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00039',
//     title: '유아/아동용품 관련 공구 글 4',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/84/200/300',
//       'https://picsum.photos/id/96/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00039',
//     createdAt: new Date('2024-12-09'),
//     updatedAt: new Date('2024-12-10'),
//     categories: [
//       {
//         name: '유아/아동용품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00040',
//     title: '유아/아동용품 관련 공구 글 5',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/46/200/300',
//       'https://picsum.photos/id/70/200/300',
//       'https://picsum.photos/id/9/200/300',
//       'https://picsum.photos/id/69/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00040',
//     createdAt: new Date('2024-12-10'),
//     updatedAt: new Date('2024-12-12'),
//     categories: [
//       {
//         name: '유아/아동용품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00041',
//     title: '유아/아동용품 관련 공구 글 6',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/31/200/300',
//       'https://picsum.photos/id/3/200/300',
//       'https://picsum.photos/id/73/200/300',
//       'https://picsum.photos/id/15/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00041',
//     createdAt: new Date('2024-12-11'),
//     updatedAt: new Date('2024-12-11'),
//     categories: [
//       {
//         name: '유아/아동용품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00042',
//     title: '유아/아동용품 관련 공구 글 7',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/56/200/300',
//       'https://picsum.photos/id/3/200/300',
//       'https://picsum.photos/id/73/200/300',
//       'https://picsum.photos/id/89/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00042',
//     createdAt: new Date('2024-12-12'),
//     updatedAt: new Date('2024-12-17'),
//     categories: [
//       {
//         name: '유아/아동용품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00043',
//     title: '스포츠/레저 관련 공구 글 1',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/31/200/300',
//       'https://picsum.photos/id/42/200/300',
//       'https://picsum.photos/id/55/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00043',
//     createdAt: new Date('2024-12-13'),
//     updatedAt: new Date('2024-12-14'),
//     categories: [
//       {
//         name: '스포츠/레저',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00044',
//     title: '스포츠/레저 관련 공구 글 2',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/8/200/300',
//       'https://picsum.photos/id/63/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00044',
//     createdAt: new Date('2024-12-14'),
//     updatedAt: new Date('2024-12-16'),
//     categories: [
//       {
//         name: '스포츠/레저',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00045',
//     title: '스포츠/레저 관련 공구 글 3',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/90/200/300',
//       'https://picsum.photos/id/22/200/300',
//       'https://picsum.photos/id/17/200/300',
//       'https://picsum.photos/id/20/200/300',
//       'https://picsum.photos/id/70/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00045',
//     createdAt: new Date('2024-12-15'),
//     updatedAt: new Date('2024-12-20'),
//     categories: [
//       {
//         name: '스포츠/레저',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00046',
//     title: '스포츠/레저 관련 공구 글 4',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: ['https://picsum.photos/id/9/200/300'],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00046',
//     createdAt: new Date('2024-12-16'),
//     updatedAt: new Date('2024-12-20'),
//     categories: [
//       {
//         name: '스포츠/레저',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00047',
//     title: '스포츠/레저 관련 공구 글 5',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/50/200/300',
//       'https://picsum.photos/id/22/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00047',
//     createdAt: new Date('2024-12-17'),
//     updatedAt: new Date('2024-12-21'),
//     categories: [
//       {
//         name: '스포츠/레저',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00048',
//     title: '스포츠/레저 관련 공구 글 6',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: ['https://picsum.photos/id/24/200/300'],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00048',
//     createdAt: new Date('2024-12-18'),
//     updatedAt: new Date('2024-12-23'),
//     categories: [
//       {
//         name: '스포츠/레저',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00049',
//     title: '스포츠/레저 관련 공구 글 7',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/67/200/300',
//       'https://picsum.photos/id/36/200/300',
//       'https://picsum.photos/id/58/200/300',
//       'https://picsum.photos/id/8/200/300',
//       'https://picsum.photos/id/12/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00049',
//     createdAt: new Date('2024-12-19'),
//     updatedAt: new Date('2024-12-19'),
//     categories: [
//       {
//         name: '스포츠/레저',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00050',
//     title: '반려동물 용품 관련 공구 글 1',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/67/200/300',
//       'https://picsum.photos/id/38/200/300',
//       'https://picsum.photos/id/55/200/300',
//       'https://picsum.photos/id/7/200/300',
//       'https://picsum.photos/id/23/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00050',
//     createdAt: new Date('2024-12-20'),
//     updatedAt: new Date('2024-12-23'),
//     categories: [
//       {
//         name: '반려동물 용품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00051',
//     title: '반려동물 용품 관련 공구 글 2',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/50/200/300',
//       'https://picsum.photos/id/8/200/300',
//       'https://picsum.photos/id/54/200/300',
//       'https://picsum.photos/id/5/200/300',
//       'https://picsum.photos/id/19/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00051',
//     createdAt: new Date('2024-12-21'),
//     updatedAt: new Date('2024-12-22'),
//     categories: [
//       {
//         name: '반려동물 용품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00052',
//     title: '반려동물 용품 관련 공구 글 3',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: ['https://picsum.photos/id/28/200/300'],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00052',
//     createdAt: new Date('2024-12-22'),
//     updatedAt: new Date('2024-12-24'),
//     categories: [
//       {
//         name: '반려동물 용품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00053',
//     title: '반려동물 용품 관련 공구 글 4',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/34/200/300',
//       'https://picsum.photos/id/95/200/300',
//       'https://picsum.photos/id/2/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00053',
//     createdAt: new Date('2024-12-23'),
//     updatedAt: new Date('2024-12-24'),
//     categories: [
//       {
//         name: '반려동물 용품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00054',
//     title: '반려동물 용품 관련 공구 글 5',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: ['https://picsum.photos/id/4/200/300'],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00054',
//     createdAt: new Date('2024-12-24'),
//     updatedAt: new Date('2024-12-25'),
//     categories: [
//       {
//         name: '반려동물 용품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00055',
//     title: '반려동물 용품 관련 공구 글 6',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/92/200/300',
//       'https://picsum.photos/id/86/200/300',
//       'https://picsum.photos/id/65/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00055',
//     createdAt: new Date('2024-12-25'),
//     updatedAt: new Date('2024-12-30'),
//     categories: [
//       {
//         name: '반려동물 용품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00056',
//     title: '반려동물 용품 관련 공구 글 7',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/4/200/300',
//       'https://picsum.photos/id/29/200/300',
//       'https://picsum.photos/id/90/200/300',
//       'https://picsum.photos/id/92/200/300',
//       'https://picsum.photos/id/46/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00056',
//     createdAt: new Date('2024-12-26'),
//     updatedAt: new Date('2024-12-27'),
//     categories: [
//       {
//         name: '반려동물 용품',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00057',
//     title: '미용/건강 관련 공구 글 1',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/95/200/300',
//       'https://picsum.photos/id/61/200/300',
//       'https://picsum.photos/id/23/200/300',
//       'https://picsum.photos/id/14/200/300',
//       'https://picsum.photos/id/41/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00057',
//     createdAt: new Date('2024-12-27'),
//     updatedAt: new Date('2024-12-31'),
//     categories: [
//       {
//         name: '미용/건강',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00058',
//     title: '미용/건강 관련 공구 글 2',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: ['https://picsum.photos/id/86/200/300'],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00058',
//     createdAt: new Date('2024-12-28'),
//     updatedAt: new Date('2024-12-31'),
//     categories: [
//       {
//         name: '미용/건강',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00059',
//     title: '미용/건강 관련 공구 글 3',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/72/200/300',
//       'https://picsum.photos/id/97/200/300',
//       'https://picsum.photos/id/45/200/300',
//       'https://picsum.photos/id/99/200/300',
//       'https://picsum.photos/id/8/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00059',
//     createdAt: new Date('2024-12-29'),
//     updatedAt: new Date('2025-01-01'),
//     categories: [
//       {
//         name: '미용/건강',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00060',
//     title: '미용/건강 관련 공구 글 4',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: [
//       'https://picsum.photos/id/48/200/300',
//       'https://picsum.photos/id/39/200/300',
//       'https://picsum.photos/id/55/200/300',
//       'https://picsum.photos/id/96/200/300',
//     ],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00060',
//     createdAt: new Date('2024-12-30'),
//     updatedAt: new Date('2025-01-04'),
//     categories: [
//       {
//         name: '미용/건강',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00061',
//     title: '미용/건강 관련 공구 글 5',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: ['https://picsum.photos/id/62/200/300'],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00061',
//     createdAt: new Date('2024-12-31'),
//     updatedAt: new Date('2025-01-02'),
//     categories: [
//       {
//         name: '미용/건강',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00062',
//     title: '미용/건강 관련 공구 글 6',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: ['https://picsum.photos/id/24/200/300'],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00062',
//     createdAt: new Date('2025-01-01'),
//     updatedAt: new Date('2025-01-05'),
//     categories: [
//       {
//         name: '미용/건강',
//       },
//     ],
//   },
//   {
//     postId: 'communityPost-00063',
//     title: '미용/건강 관련 공구 글 7',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: ['https://picsum.photos/id/44/200/300'],
//     urlAddress: 'https://www.naver.com',
//     authorId: 'user-00063',
//     createdAt: new Date('2025-01-02'),
//     updatedAt: new Date('2025-01-05'),
//     categories: [
//       {
//         name: '미용/건강',
//       },
//     ],
//   },
// ];
