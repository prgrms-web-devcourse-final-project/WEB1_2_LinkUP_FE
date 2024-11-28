import React from 'react';
import styled from 'styled-components';
import RecommendProduct from './RecommendProduct';
import PopularProduct from './PopularProduct';
import CategoryProduct from './CategoryProduct';
import ScrollToTopButton from '../../common/ScrollToTopButton';
import { categories, popularProduct, products } from '../../../mocks/products';
// import { QueryHandler, useProductsQuery } from '../../../hooks/useGetProduct';

const HomePage: React.FC = () => {
  // const { data: products, isLoading, isError } = useProductsQuery();
  return (
    <>
      {/* <QueryHandler isLoading={isLoading} isError={isError}> */}
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
      {/* </QueryHandler> */}
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
