import React from 'react';
import styled from 'styled-components';
import RecommendProduct from './RecommendProduct';
import PopularProduct from './PopularProduct';
import CategoryProduct from './CategoryProduct';
import ScrollToTopButton from '../../common/ScrollToTopButton';
import { categories } from '../../../mocks/products';
import { QueryHandler, useProductsQuery } from '../../../hooks/useGetProduct';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { data: products, isLoading, isError } = useProductsQuery();
  const popularProduct = products?.sort(
    (a, b) => b.currentStock - a.currentStock
  )[0];

  return (
    <>
      <QueryHandler isLoading={isLoading} isError={isError}>
        <ContainerBox>
          <Container>
            <StyledLink to={`/products/${popularProduct?.id}`}>
              {' '}
              <PopularProduct
                popular={popularProduct}
                category={popularProduct?.category}
              />
            </StyledLink>
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
      </QueryHandler>
    </>
  );
};
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:link,
  &:visited,
  &:hover,
  &:active {
    color: inherit;
    text-decoration: none;
  }
`;
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
