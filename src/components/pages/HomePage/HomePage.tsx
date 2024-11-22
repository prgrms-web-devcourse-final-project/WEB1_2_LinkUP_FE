import React from 'react';
import styled from 'styled-components';
import RecommendProduct from './RecommendProduct';
import PopularProduct from './PopularProduct';
import CategoryProduct from './CategoryProduct';
// import { getProducts, Product } from './api/productApi';
// import { useQuery } from '@tanstack/react-query';
// import { fetchUser, User } from './api/userApi';

const HomePage: React.FC = () => {
  // const { data, isLoading, error } = useQuery<Product>({
  //   queryKey: ['product'],
  //   queryFn: () => getProducts(),
  // });

  // // 로딩 상태 처리
  // if (isLoading) return <div>Loading...</div>;

  // // 에러 상태 처리
  // if (error instanceof Error) return <div>Error: {error.message}</div>;

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
    id: '1',
    name: '다이슨 드라이기',
    stars: 5,
    originalPrice: 95.5,
    discountedPrice: 79.98,
    image: 'https://via.placeholder.com/200',
  };
  const products = [
    {
      id: '1',
      name: '다이슨 드라이기',
      stars: 5,
      originalPrice: 95.5,
      discountedPrice: 79.98,
      image: 'https://via.placeholder.com/200',
      category: '전자제품',
    },
    {
      id: '2',
      name: '에어팟 프로',
      stars: 4,
      originalPrice: 250.0,
      discountedPrice: 199.99,
      image: 'https://via.placeholder.com/200',
      category: '전자제품',
    },
    {
      id: '3',
      name: '샤오미 전기포트',
      stars: 4.5,
      originalPrice: 50.0,
      discountedPrice: 39.99,
      image: 'https://via.placeholder.com/200',
      category: '전자제품',
    },
    {
      id: '4',
      name: 'LG 모니터',
      stars: 4,
      originalPrice: 300.0,
      discountedPrice: 259.99,
      image: 'https://via.placeholder.com/200',
      category: '전자제품',
    },
    {
      id: '5',
      name: '삼성 TV',
      stars: 5,
      originalPrice: 1200.0,
      discountedPrice: 999.99,
      image: 'https://via.placeholder.com/200',
      category: '전자제품',
    },
    {
      id: '6',
      name: '닌텐도 스위치',
      stars: 4.5,
      originalPrice: 350.0,
      discountedPrice: 299.99,
      image: 'https://via.placeholder.com/200',
      category: '전자제품',
    },
    {
      id: '7',
      name: '스타벅스 아메리카노',
      stars: 4.5,
      originalPrice: 5.0,
      discountedPrice: 4.5,
      image: 'https://via.placeholder.com/200',
      category: '식료품',
    },
    {
      id: '8',
      name: '캘리포니아 치즈',
      stars: 4,
      originalPrice: 15.0,
      discountedPrice: 12.99,
      image: 'https://via.placeholder.com/200',
      category: '식료품',
    },
    {
      id: '9',
      name: '라면 3개입',
      stars: 5,
      originalPrice: 3.0,
      discountedPrice: 2.5,
      image: 'https://via.placeholder.com/200',
      category: '식료품',
    },
    {
      id: '10',
      name: '소형 청소기',
      stars: 4.5,
      originalPrice: 120.0,
      discountedPrice: 99.99,
      image: 'https://via.placeholder.com/200',
      category: '생활용품',
    },
    {
      id: '11',
      name: '다용도 걸이',
      stars: 4,
      originalPrice: 20.0,
      discountedPrice: 15.99,
      image: 'https://via.placeholder.com/200',
      category: '생활용품',
    },
    {
      id: '12',
      name: '스탠드 조명',
      stars: 4.5,
      originalPrice: 50.0,
      discountedPrice: 45.99,
      image: 'https://via.placeholder.com/200',
      category: '생활용품',
    },
    {
      id: '13',
      name: '여성용 티셔츠',
      stars: 4.5,
      originalPrice: 20.0,
      discountedPrice: 16.99,
      image: 'https://via.placeholder.com/200',
      category: '패션/의류',
    },
    {
      id: '14',
      name: '남성용 청바지',
      stars: 4,
      originalPrice: 40.0,
      discountedPrice: 35.99,
      image: 'https://via.placeholder.com/200',
      category: '패션/의류',
    },
    {
      id: '15',
      name: '여성용 핸드백',
      stars: 5,
      originalPrice: 120.0,
      discountedPrice: 99.99,
      image: 'https://via.placeholder.com/200',
      category: '패션/의류',
    },
    {
      id: '16',
      name: '삼나무 책상',
      stars: 4.5,
      originalPrice: 250.0,
      discountedPrice: 199.99,
      image: 'https://via.placeholder.com/200',
      category: '가구/인테리어',
    },
    {
      id: '17',
      name: '라탄 의자',
      stars: 4,
      originalPrice: 150.0,
      discountedPrice: 129.99,
      image: 'https://via.placeholder.com/200',
      category: '가구/인테리어',
    },
    {
      id: '18',
      name: '스틸 책장',
      stars: 4.5,
      originalPrice: 120.0,
      discountedPrice: 99.99,
      image: 'https://via.placeholder.com/200',
      category: '가구/인테리어',
    },
    {
      id: '19',
      name: '유아용 기저귀',
      stars: 5,
      originalPrice: 30.0,
      discountedPrice: 25.99,
      image: 'https://via.placeholder.com/200',
      category: '유아/아동용품',
    },
    {
      id: '20',
      name: '유아용 장난감 세트',
      stars: 4.5,
      originalPrice: 45.0,
      discountedPrice: 39.99,
      image: 'https://via.placeholder.com/200',
      category: '유아/아동용품',
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
