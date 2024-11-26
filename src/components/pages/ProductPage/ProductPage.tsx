import React, { useEffect, useMemo, useState } from 'react';
import InputComponent from '../ProductPage/InputComponent';
import ProductComponent from '../ProductPage/ProductComponent';
import styled from 'styled-components';

import { useLocation } from 'react-router-dom';
import ScrollToTopButton from '../../common/ScrollToTopButton';
import { Product } from '../HomePage/model/productSchema';
// import { useQuery } from '@tanstack/react-query';
// import { getProducts } from '../HomePage/api/productApi';

const ProductPage = () => {
  //   const {
  //   data: product,
  //   isLoading,
  //   isError,
  // } = useQuery<Product[], Error>({
  //   queryKey: ['product'],
  //   queryFn: () => getProducts(),
  // });

  // // 로딩 상태 처리
  // if (isLoading) return <div>Loading...</div>;

  // // 에러 상태 처리
  // if (isError) return <div>Error</div>;
  const [input, setInput] = useState('');

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');
    if (category) {
      setInput(category);
    }
  }, []);

  const products = [
    {
      id: '1',
      name: '다이슨 드라이기',
      stars: 5,
      originalPrice: 95.5,
      discountedPrice: 79.98,
      image: 'https://via.placeholder.com/200',
      category: '전자제품',
      comments: [],
      likes: false,
    },
    {
      id: '2',
      name: '에어팟 프로',
      stars: 4,
      originalPrice: 250.0,
      discountedPrice: 199.99,
      image: 'https://via.placeholder.com/200',
      category: '전자제품',
      comments: [{ comment: '좋아요!' }],
      likes: false,
    },
    {
      id: '3',
      name: '샤오미 전기포트',
      stars: 4.5,
      originalPrice: 50.0,
      discountedPrice: 39.99,
      image: 'https://via.placeholder.com/200',
      category: '전자제품',
      comments: [{ comment: '좋은 제품이에요!' }, { comment: '가성비 최고!' }],
      likes: false,
    },
    {
      id: '4',
      name: 'LG 모니터',
      stars: 4,
      originalPrice: 300.0,
      discountedPrice: 259.99,
      image: 'https://via.placeholder.com/200',
      category: '전자제품',
      comments: [
        { comment: '화질 좋아요!' },
        { comment: '디자인이 예뻐요!' },
        { comment: '조금 무겁지만 괜찮아요.' },
      ],
      likes: false,
    },
    {
      id: '5',
      name: '삼성 TV',
      stars: 5,
      originalPrice: 1200.0,
      discountedPrice: 999.99,
      image: 'https://via.placeholder.com/200',
      category: '전자제품',
      comments: [],
      likes: false,
    },
    {
      id: '6',
      name: '닌텐도 스위치',
      stars: 4.5,
      originalPrice: 350.0,
      discountedPrice: 299.99,
      image: 'https://via.placeholder.com/200',
      category: '전자제품',
      comments: [{ comment: '아이들이 너무 좋아해요!' }],
      likes: true,
    },
    {
      id: '7',
      name: '스타벅스 아메리카노',
      stars: 4.5,
      originalPrice: 5.0,
      discountedPrice: 4.5,
      image: 'https://via.placeholder.com/200',
      category: '식료품',
      comments: [],
      likes: false,
    },
    {
      id: '8',
      name: '캘리포니아 치즈',
      stars: 4,
      originalPrice: 15.0,
      discountedPrice: 12.99,
      image: 'https://via.placeholder.com/200',
      category: '식료품',
      comments: [{ comment: '맛있어요!' }],
      likes: false,
    },
    {
      id: '9',
      name: '라면 3개입',
      stars: 5,
      originalPrice: 3.0,
      discountedPrice: 2.5,
      image: 'https://via.placeholder.com/200',
      category: '식료품',
      comments: [
        { comment: '항상 먹는 맛!' },
        { comment: '간편해서 좋아요.' },
        { comment: '가격 대비 최고!' },
      ],
      likes: true,
    },
    {
      id: '10',
      name: '소형 청소기',
      stars: 4.5,
      originalPrice: 120.0,
      discountedPrice: 99.99,
      image: 'https://via.placeholder.com/200',
      category: '생활용품',
      comments: [],
      likes: true,
    },
    {
      id: '11',
      name: '다용도 걸이',
      stars: 4,
      originalPrice: 20.0,
      discountedPrice: 15.99,
      image: 'https://via.placeholder.com/200',
      category: '생활용품',
      comments: [{ comment: '실용적이에요.' }],
      likes: false,
    },
    {
      id: '12',
      name: '스탠드 조명',
      stars: 4.5,
      originalPrice: 50.0,
      discountedPrice: 45.99,
      image: 'https://via.placeholder.com/200',
      category: '생활용품',
      comments: [
        { comment: '조명이 예뻐요.' },
        { comment: '편안한 분위기를 만들어줘요.' },
      ],
      likes: false,
    },
    {
      id: '13',
      name: '여성용 티셔츠',
      stars: 4.5,
      originalPrice: 20.0,
      discountedPrice: 16.99,
      image: 'https://via.placeholder.com/200',
      category: '패션/의류',
      comments: [
        { comment: '편안해요.' },
        { comment: '디자인이 마음에 들어요.' },
        { comment: '색상이 예뻐요.' },
      ],
      likes: false,
    },
    {
      id: '14',
      name: '남성용 청바지',
      stars: 4,
      originalPrice: 40.0,
      discountedPrice: 35.99,
      image: 'https://via.placeholder.com/200',
      category: '패션/의류',
      comments: [],
      likes: false,
    },
    {
      id: '15',
      name: '여성용 핸드백',
      stars: 5,
      originalPrice: 120.0,
      discountedPrice: 99.99,
      image: 'https://via.placeholder.com/200',
      category: '패션/의류',
      comments: [
        { comment: '디자인 최고!' },
        { comment: '가죽이 고급스러워요.' },
      ],
      likes: true,
    },
    {
      id: '16',
      name: '삼나무 책상',
      stars: 4.5,
      originalPrice: 250.0,
      discountedPrice: 199.99,
      image: 'https://via.placeholder.com/200',
      category: '가구/인테리어',
      comments: [
        { comment: '튼튼해요.' },
        { comment: '디자인이 멋져요.' },
        { comment: '조립이 쉬워요.' },
      ],
      likes: true,
    },
    {
      id: '17',
      name: '라탄 의자',
      stars: 4,
      originalPrice: 150.0,
      discountedPrice: 129.99,
      image: 'https://via.placeholder.com/200',
      category: '가구/인테리어',
      comments: [],
      likes: false,
    },
    {
      id: '18',
      name: '스틸 책장',
      stars: 4.5,
      originalPrice: 120.0,
      discountedPrice: 99.99,
      image: 'https://via.placeholder.com/200',
      category: '가구/인테리어',
      comments: [
        { comment: '스타일리시해요.' },
        { comment: '높이가 딱 좋아요.' },
      ],
      likes: true,
    },
    {
      id: '19',
      name: '유아용 기저귀',
      stars: 5,
      originalPrice: 30.0,
      discountedPrice: 25.99,
      image: 'https://via.placeholder.com/200',
      category: '유아/아동용품',
      comments: [
        { comment: '아기가 잘 사용해요.' },
        { comment: '흡수력이 좋아요.' },
        { comment: '가격이 저렴해요.' },
      ],
      likes: true,
    },
    {
      id: '20',
      name: '유아용 장난감 세트',
      stars: 4.5,
      originalPrice: 45.0,
      discountedPrice: 39.99,
      image: 'https://via.placeholder.com/200',
      category: '유아/아동용품',
      comments: [],
      likes: true,
    },
  ];
  const getTopProducts = (products: Product[]): Product[] => {
    const sortedByComments = [...products].sort(
      (a, b) => b.comments.length - a.comments.length
    );
    return sortedByComments;
  };

  const displayedProducts = useMemo(() => getTopProducts(products), [products]);

  const filtered = displayedProducts.filter(
    (product: Product) =>
      product.name.toLowerCase().includes(input.toLowerCase()) ||
      product.category.toLowerCase().includes(input.toLowerCase())
  );
  return (
    <>
      <ContainerBox>
        <Container>
          <InputComponent input={input} setInput={setInput} />
        </Container>
      </ContainerBox>
      <ContainerBox>
        <Container>
          <ProductComponent input={input} products={filtered} />
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

export default ProductPage;
