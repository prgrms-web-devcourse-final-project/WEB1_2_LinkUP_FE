import React from 'react';
import styled from 'styled-components';
import RecommendProduct from './RecommendProduct';
import PopularProduct from './PopularProduct';
import CategoryProduct from './CategoryProduct';
import ScrollToTopButton from '../../common/ScrollToTopButton';
import { categories, popularProduct, products } from '../../../mocks/products';
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
