import React, { useEffect, useMemo, useState } from 'react';
import StarRating from '../../common/StarRating';
import DEFAULT_IMG from '../../../assets/icons/default-featured-image.png.jpg';
import { AllProducts } from './model/productSchema';
import {
  Card,
  CardWrapper,
  CategoryContainer,
  CategoryItem,
  CategoryWrapper,
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
  SectionTitle,
  StyledLink,
  StyledMoreButton,
} from './style/CardStyle';
import { QueryHandler, useWishQuery } from '../../../hooks/useGetProduct';
import { postWishProduct } from './api/wish';

interface CategoryProductsProps {
  categories: string[];
  products: AllProducts[] | undefined;
}

const CategoryProduct: React.FC<CategoryProductsProps> = ({
  categories,
  products,
}) => {
  if (!products) {
    return <div>No products available</div>;
  }
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('LIFESTYLE');

  const handleToggle = () => setIsExpanded(!isExpanded);
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setIsExpanded(false);
  };
  const filtered = useMemo(
    () =>
      products?.filter((product) =>
        product.category.toLowerCase().includes(selectedCategory.toLowerCase())
      ) || [],
    [selectedCategory, products]
  );
  const { data: wish, isLoading, isError } = useWishQuery();

  // 상태를 관리하기 위한 useState 훅. 초기값은 빈 배열로 설정.
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  useEffect(() => {
    if (wish) {
      setLikedProducts(wish.map((item) => item.productPostId));
    }
  }, [wish]);
  const changeLike = async (productPostId: number) => {
    setLikedProducts(
      (prev) =>
        prev.includes(productPostId) // productPostId가 이미 likedProducts에 포함되어 있으면
          ? prev.filter((id) => id !== productPostId) // 제거
          : [...prev, productPostId] // 추가
    );

    // 서버에 좋아요 요청 전송
    await postWishProduct({ productPostId });
  };

  const displayedProducts = useMemo(() => {
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 8);
  }, [filtered]);

  return (
    <QueryHandler isLoading={isLoading} isError={isError}>
      <Recommend>
        <CategoryWrapper>
          <SectionTitle onClick={handleToggle}>{selectedCategory}</SectionTitle>
          <CategoryContainer $expanded={isExpanded}>
            {categories.map((category, index) => (
              <CategoryItem
                key={`${category}-${index}`}
                $selected={category === selectedCategory}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </CategoryItem>
            ))}
          </CategoryContainer>
        </CategoryWrapper>
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
                $likes={likedProducts.includes(product.productPostId)}
                onClick={() => {
                  changeLike(product.productPostId);
                }}
              />
            </Card>
          ))}
        </CardWrapper>
        <MoreButtonWrapper>
          <StyledMoreButton to={`/products?category=${selectedCategory}`}>
            더보기
          </StyledMoreButton>
        </MoreButtonWrapper>
      </Recommend>
    </QueryHandler>
  );
};

export default CategoryProduct;
