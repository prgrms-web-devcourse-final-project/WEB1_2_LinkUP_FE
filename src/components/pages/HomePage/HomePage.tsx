import React from 'react';
import RecommendProduct from './RecommendProduct';
import PopularProduct from './PopularProduct';
import CategoryProduct from './CategoryProduct';
import ScrollToTopButton from '../../common/ScrollToTopButton';
import { QueryHandler, useProductsQuery } from '../../../hooks/useGetProduct';
import { StyledLink, ContainerBox, Container } from './style/CardStyle';
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
      </ContainerBox>
      <ScrollToTopButton data-testid="scroll-to-top" />
    </QueryHandler>
  );
};

export default HomePage;
