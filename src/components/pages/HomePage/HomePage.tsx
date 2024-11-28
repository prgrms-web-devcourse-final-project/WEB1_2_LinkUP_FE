import React from 'react';
import styled from 'styled-components';
import RecommendProduct from './RecommendProduct';
import PopularProduct from './PopularProduct';
import CategoryProduct from './CategoryProduct';
import ScrollToTopButton from '../../common/ScrollToTopButton';
// import { getProducts } from './api/productApi';
// import { useQuery } from '@tanstack/react-query';
// import { fetchUser, User } from './api/userApi';
// import { Product } from '../Payment/api/paymentApi';

const HomePage: React.FC = () => {
  //   const {
  //     data: product,
  //     isLoading,
  //     isError,
  //   } = useQuery<Product[], Error>({
  //     queryKey: ['product'],
  //     queryFn: () => getProducts(),
  //   });

  //   // 로딩 상태 처리
  //   if (isLoading) return <div>Loading...</div>;

  //   // 에러 상태 처리
  //   if (isError) return <div>Error</div>;

  const categories = [
    '식료품',
    '생활용품',
    '패션/의류',
    '전자제품',
    '가구/인테리어',
    '유아/아동용품',
    '스포츠',
  ];
  const popularProduct = {
    id: 1,
    name: '다이슨 드라이기',
    rating: 5,
    category: '전자제품',
    originalPrice: 95.5,
    discountPrice: 79.98,
    description:
      '최고의 성능을 가진 드라이기 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구',
    url: 'https://via.placeholder.com/200',
    reviews: [
      {
        review: 'asd',
      },
      {
        review: 'asd',
      },
    ],
    likes: false,
  };
  const products = [
    {
      id: 1,
      name: '다이슨 드라이기',
      rating: 5,
      originalPrice: 95.5,
      discountPrice: 79.98,
      url: 'https://via.placeholder.com/200',
      category: '전자제품',
      reviews: [],
      likes: false,
    },
    {
      id: 2,
      name: '에어팟 프로',
      rating: 4,
      originalPrice: 250.0,
      category: '전자제품',
      discountPrice: 199.99,
      url: 'https://via.placeholder.com/200',

      reviews: [{ review: '좋아요!' }],
      likes: false,
    },
    {
      id: 3,
      name: '샤오미 전기포트',
      rating: 4.5,
      originalPrice: 50.0,
      discountPrice: 39.99,
      url: 'https://via.placeholder.com/200',
      category: '전자제품',
      reviews: [{ review: '좋은 제품이에요!' }, { review: '가성비 최고!' }],
      likes: false,
    },
    {
      id: 4,
      name: 'LG 모니터',
      rating: 4,
      originalPrice: 300.0,
      discountPrice: 259.99,
      url: 'https://via.placeholder.com/200',
      category: '전자제품',
      reviews: [
        { review: '화질 좋아요!' },
        { review: '디자인이 예뻐요!' },
        { review: '조금 무겁지만 괜찮아요.' },
      ],
      likes: false,
    },
    {
      id: 5,
      name: '삼성 TV',
      rating: 5,
      originalPrice: 1200.0,
      discountPrice: 999.99,
      url: 'https://via.placeholder.com/200',
      category: '전자제품',
      reviews: [],
      likes: false,
    },
    {
      id: 6,
      name: '닌텐도 스위치',
      rating: 4.5,
      originalPrice: 350.0,
      discountPrice: 299.99,
      url: 'https://via.placeholder.com/200',
      category: '전자제품',
      reviews: [{ review: '아이들이 너무 좋아해요!' }],
      likes: true,
    },
    {
      id: 7,
      name: '스타벅스 아메리카노',
      rating: 4.5,
      originalPrice: 5.0,
      discountPrice: 4.5,
      url: 'https://via.placeholder.com/200',
      category: '식료품',
      reviews: [],
      likes: false,
    },
    {
      id: 8,
      name: '캘리포니아 치즈',
      rating: 4,
      originalPrice: 15.0,
      discountPrice: 12.99,
      url: 'https://via.placeholder.com/200',
      category: '식료품',
      reviews: [{ review: '맛있어요!' }],
      likes: false,
    },
    {
      id: 9,
      name: '라면 3개입',
      rating: 5,
      originalPrice: 3.0,
      discountPrice: 2.5,
      url: 'https://via.placeholder.com/200',
      category: '식료품',
      reviews: [
        { review: '항상 먹는 맛!' },
        { review: '간편해서 좋아요.' },
        { review: '가격 대비 최고!' },
      ],
      likes: true,
    },
    {
      id: 10,
      name: '소형 청소기',
      rating: 4.5,
      originalPrice: 120.0,
      discountPrice: 99.99,
      url: 'https://via.placeholder.com/200',
      category: '생활용품',
      reviews: [],
      likes: true,
    },
    {
      id: 11,
      name: '다용도 걸이',
      rating: 4,
      originalPrice: 20.0,
      discountPrice: 15.99,
      url: 'https://via.placeholder.com/200',
      category: '생활용품',
      reviews: [{ review: '실용적이에요.' }],
      likes: false,
    },
    {
      id: 12,
      name: '스탠드 조명',
      rating: 4.5,
      originalPrice: 50.0,
      discountPrice: 45.99,
      url: 'https://via.placeholder.com/200',
      category: '생활용품',
      reviews: [
        { review: '조명이 예뻐요.' },
        { review: '편안한 분위기를 만들어줘요.' },
      ],
      likes: false,
    },
    {
      id: 13,
      name: '여성용 티셔츠',
      rating: 4.5,
      originalPrice: 20.0,
      discountPrice: 16.99,
      url: 'https://via.placeholder.com/200',
      category: '패션/의류',
      reviews: [
        { review: '편안해요.' },
        { review: '디자인이 마음에 들어요.' },
        { review: '색상이 예뻐요.' },
      ],
      likes: false,
    },
    {
      id: 14,
      name: '남성용 청바지',
      rating: 4,
      originalPrice: 40.0,
      discountPrice: 35.99,
      url: 'https://via.placeholder.com/200',
      category: '패션/의류',
      reviews: [],
      likes: false,
    },
    {
      id: 15,
      name: '여성용 핸드백',
      rating: 5,
      originalPrice: 120.0,
      discountPrice: 99.99,
      url: 'https://via.placeholder.com/200',
      category: '패션/의류',
      reviews: [{ review: '디자인 최고!' }, { review: '가죽이 고급스러워요.' }],
      likes: true,
    },
    {
      id: 16,
      name: '삼나무 책상',
      rating: 4.5,
      originalPrice: 250.0,
      discountPrice: 199.99,
      url: 'https://via.placeholder.com/200',
      category: '가구/인테리어',
      reviews: [
        { review: '튼튼해요.' },
        { review: '디자인이 멋져요.' },
        { review: '조립이 쉬워요.' },
      ],
      likes: true,
    },
    {
      id: 17,
      name: '라탄 의자',
      rating: 4,
      originalPrice: 150.0,
      discountPrice: 129.99,
      url: 'https://via.placeholder.com/200',
      category: '가구/인테리어',
      reviews: [],
      likes: false,
    },
    {
      id: 18,
      name: '스틸 책장',
      rating: 4.5,
      originalPrice: 120.0,
      discountPrice: 99.99,
      url: 'https://via.placeholder.com/200',
      category: '가구/인테리어',
      reviews: [{ review: '스타일리시해요.' }, { review: '높이가 딱 좋아요.' }],
      likes: true,
    },
    {
      id: 19,
      name: '유아용 기저귀',
      rating: 5,
      originalPrice: 30.0,
      discountPrice: 25.99,
      url: 'https://via.placeholder.com/200',
      category: '유아/아동용품',
      reviews: [
        { review: '아기가 잘 사용해요.' },
        { review: '흡수력이 좋아요.' },
        { review: '가격이 저렴해요.' },
      ],
      likes: true,
    },
    {
      id: 20,
      name: '유아용 장난감 세트',
      rating: 4.5,
      originalPrice: 45.0,
      discountPrice: 39.99,
      url: 'https://via.placeholder.com/200',
      category: '유아/아동용품',
      reviews: [],
      likes: true,
    },
  ];

  return (
    <>
      <ContainerBox>
        <Container>
          <PopularProduct product={popularProduct} />
        </Container>
      </ContainerBox>
      <ContainerBox>
        <Container>
          <RecommendProduct products={products} />
        </Container>
      </ContainerBox>
      <ContainerBox>
        <Container>
          <CategoryProduct categories={categories} products={products} />
        </Container>
        <ScrollToTopButton />
      </ContainerBox>
    </>
  );
};
const ContainerBox = styled.div`
  display: flex;
  margin-top: 5vh;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export default HomePage;
