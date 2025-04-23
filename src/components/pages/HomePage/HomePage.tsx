import React from 'react';
import styled from 'styled-components';
import RecommendProduct from './RecommendProduct';
import PopularProduct from './PopularProduct';
import CategoryProduct from './CategoryProduct';
import ScrollToTopButton from '../../common/ScrollToTopButton';

import { QueryHandler, useProductsQuery } from '../../../hooks/useGetProduct';
import { Link } from 'react-router-dom';
import { categories } from './model/categories';

const HomePage: React.FC = () => {
  const { data: products, isLoading, isError } = useProductsQuery();

  const availableProduct = products?.filter(
    (p) =>
      p.available === true &&
      new Date(p.deadline) > new Date() &&
      p.discountprice > 1
  );

  //할인율이 가장 높은 물건을 인기 상품으로
  const popularProduct = availableProduct?.sort(
    (a, b) =>
      (b.originalprice - b.discountprice) / b.originalprice -
      (a.originalprice - a.discountprice) / a.originalprice
  )[0];

  return (
    <>
      <QueryHandler isLoading={isLoading} isError={isError}>
        <ContainerBox data-testid="container-box">
          <Container>
            <StyledLink
              to={`/products/${popularProduct?.productPostId}`}
              data-testid="popular-product"
            >
              <PopularProduct
                productId={popularProduct?.productPostId}
                category={popularProduct?.category}
              />
            </StyledLink>
          </Container>
        </ContainerBox>
        <ContainerBox data-testid="container-box">
          <Container>
            <div data-testid="recommend-product">
              <RecommendProduct products={availableProduct} />
            </div>
          </Container>
        </ContainerBox>
        <ContainerBox data-testid="container-box">
          <Container>
            <div data-testid="category-product">
              <CategoryProduct
                categories={categories}
                products={availableProduct}
              />
            </div>
          </Container>
          <ScrollToTopButton data-testid="scroll-to-top" />
        </ContainerBox>
      </QueryHandler>
    </>
  );
};
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: 100%;
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
