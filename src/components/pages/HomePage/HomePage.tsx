import React from 'react';
import Header from '../../common/Header';
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

  // const filledStars = data?.likes.length || 0;
  // const emptyHearts = 5 - filledStars;

  const categories = [
    '식료품',
    '생활용품',
    '패션/의류',
    '전자제품',
    '가구/인테리어',
    '유아/아동용품',
    '스포츠/레저',
    '반려동물 용품',
    '미용/건강',
    '자동차/공구',
  ];
  const popularProduct = {
    id: 1,
    name: '다이슨 드라이기',
    stars: 5,
    originalPrice: 95.5,
    discountedPrice: 79.98,
    image: 'https://via.placeholder.com/200',
  };
  const products = [
    {
      id: 1,
      name: '다이슨 드라이기',
      stars: 5,
      originalPrice: 95.5,
      discountedPrice: 79.98,
      image: 'https://via.placeholder.com/200',
    },
    {
      id: 2,
      name: '에어팟 프로',
      stars: 4,
      originalPrice: 250.0,
      discountedPrice: 199.99,
      image: 'https://via.placeholder.com/200',
    },
    {
      id: 3,
      name: '샤오미 전기포트',
      stars: 4.5,
      originalPrice: 50.0,
      discountedPrice: 39.99,
      image: 'https://via.placeholder.com/200',
    },
    {
      id: 4,
      name: 'LG 모니터',
      stars: 4,
      originalPrice: 300.0,
      discountedPrice: 259.99,
      image: 'https://via.placeholder.com/200',
    },
    {
      id: 5,
      name: '삼성 TV',
      stars: 5,
      originalPrice: 1200.0,
      discountedPrice: 999.99,
      image: 'https://via.placeholder.com/200',
    },
    {
      id: 6,
      name: '닌텐도 스위치',
      stars: 4.5,
      originalPrice: 350.0,
      discountedPrice: 299.99,
      image: 'https://via.placeholder.com/200',
    },
    {
      id: 7,
      name: '닌텐도 스위치',
      stars: 4.5,
      originalPrice: 350.0,
      discountedPrice: 299.99,
      image: 'https://via.placeholder.com/200',
    },
    {
      id: 8,
      name: '닌텐도 스위치',
      stars: 4.5,
      originalPrice: 350.0,
      discountedPrice: 299.99,
      image: 'https://via.placeholder.com/200',
    },
  ];
  return (
    <>
      <Header />
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
