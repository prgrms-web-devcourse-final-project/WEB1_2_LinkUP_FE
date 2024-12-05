import React, { useMemo } from 'react';
import StarRating from '../../common/StarRating';
import { Product } from './model/productSchema';
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
interface PopularProductsListProps {
  products: Product[] | undefined;
}

const RecommendProduct: React.FC<PopularProductsListProps> = ({ products }) => {
  if (!products) {
    return <div>No products available</div>;
  }
  const getTopProducts = (products: Product[]): Product[] => {
    // comments.length를 기준으로 내림차순 정렬
    const sortedByComments = [...products].sort(
      (a, b) => (b.reviews?.length || 0) - (a.reviews?.length || 0)
    );
    // 상위 8개 선택
    return sortedByComments.slice(0, 8);
  };

  const displayedProducts = useMemo(() => getTopProducts(products), [products]);

  const changeLike = () => {
    //찜하기, 찜 취소하기 api
  };

  return (
    <Recommend>
      <RecommendTitle>실시간 인기 상품</RecommendTitle>

      <CardWrapper>
        {displayedProducts.map((product) => (
          <Card key={product.id}>
            <StyledLink to={`/products/${product.id}`}>
              <ProductImg src={product.url} alt={product.name} />
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
            <LikeButton likes={product.likes} onClick={changeLike} />
          </Card>
        ))}
      </CardWrapper>
      <MoreButtonWrapper>
        <StyledMoreButton to="/products">더보기</StyledMoreButton>
      </MoreButtonWrapper>
    </Recommend>
  );
};

export default RecommendProduct;
