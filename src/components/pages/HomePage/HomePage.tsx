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
  // 상품 데이터 처리
  const availableProduct = products?.filter(
    (p) =>
      p.available === true &&
      new Date(p.deadline) > new Date() &&
      p.discountprice > 1
  );

  // 별점이 높은 순서로 정렬
  const recommendProduct = availableProduct?.sort(
    (a, b) => b.rating - a.rating
  );

  // recommendProduct 중 가격 할인율이 높은 순서로 정렬
  const now = new Date();

  // 인기상품 -> 마감임박 순서 중 평점 4점 이상 상품 추천으로 변경
  const popularProduct = availableProduct
    ?.filter((product) => product.rating >= 4)
    ?.sort(
      (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    )
    ?.find((product) => new Date(product.deadline).getTime() > now.getTime());

  return (
    <QueryHandler isLoading={isLoading} isError={isError}>
      <ContainerBox data-testid="container-box">
        <Container>
          <StyledLink
            to={`/products/${popularProduct?.productPostId}`}
            data-testid="popular-product"
          >
            <PopularProduct
              productRating={popularProduct?.rating}
              productId={popularProduct?.productPostId}
              category={popularProduct?.category}
            />
          </StyledLink>
        </Container>
      </ContainerBox>
      <ContainerBox data-testid="container-box">
        <Container>
          <div data-testid="recommend-product">
            <RecommendProduct products={recommendProduct} />
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
