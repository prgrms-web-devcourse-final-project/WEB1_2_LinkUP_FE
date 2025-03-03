import React, { useMemo } from 'react';
import StarRating from '../../common/StarRating';
import { AllProducts } from './model/productSchema';
import {
  Card,
  CardWrapper,
  DiscountedPrice,
  LikeButton,
  MoreButtonWrapper,
  OriginalPrice,
  PriceWrapper,
  ProductImg,
  ProductName,
  ProductStar,
  ProductWrapper,
  Recommend,
  RecommendTitle,
  StyledLink,
  StyledMoreButton,
} from './style/CardStyle';
import DEFAULT_IMG from '../../../assets/icons/default-featured-image.png.jpg';
import { postWishProduct } from './api/wish';
import { QueryHandler, useWishQuery } from '../../../hooks/useGetProduct';

interface PopularProductsListProps {
  products: AllProducts[] | undefined;
}

const RecommendProduct: React.FC<PopularProductsListProps> = ({ products }) => {
  if (!products) {
    return <div>No products available</div>;
  }
  const getTopProducts = (products: AllProducts[]): AllProducts[] => {
    // 마감임박순서
    const sortedByDeadline = [...products].sort(
      (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    );

    // 상위 8개 선택
    return sortedByDeadline.slice(0, 8);
  };

  const displayedProducts = useMemo(() => getTopProducts(products), [products]);

  const { data: wish, isLoading, isError } = useWishQuery();

  const changeLike = (productPostId: number) => {
    const payload = {
      productPostId: productPostId,
    };

    postWishProduct(payload);
  };

  return (
    <QueryHandler isLoading={isLoading} isError={isError}>
      <Recommend>
        <RecommendTitle>실시간 인기 상품</RecommendTitle>

        <CardWrapper>
          {displayedProducts.map((product, index) => (
            <Card key={product.productPostId || `product-${index}`}>
              <StyledLink to={`/products/${product.productPostId}`}>
                <ProductImg
                  src={product.url || DEFAULT_IMG}
                  alt={product.name}
                  onError={(e) => {
                    e.currentTarget.src = DEFAULT_IMG;
                  }}
                />
                <ProductWrapper>
                  <ProductName>{product.name}</ProductName>
                  <ProductStar>
                    <StarRating rating={product.rating} />
                  </ProductStar>
                  <PriceWrapper>
                    <OriginalPrice>{product.originalprice}원</OriginalPrice>
                    <DiscountedPrice>{product.discountprice}원</DiscountedPrice>
                  </PriceWrapper>
                </ProductWrapper>
              </StyledLink>
              <LikeButton
                likes={
                  wish?.some(
                    (item) => item.productPostId === product.productPostId
                  ) || false
                }
                onClick={() => {
                  changeLike(product.productPostId);
                }}
              />
            </Card>
          ))}
        </CardWrapper>
        <MoreButtonWrapper>
          <StyledMoreButton to="/products">더보기</StyledMoreButton>
        </MoreButtonWrapper>
      </Recommend>
    </QueryHandler>
  );
};

export default RecommendProduct;
