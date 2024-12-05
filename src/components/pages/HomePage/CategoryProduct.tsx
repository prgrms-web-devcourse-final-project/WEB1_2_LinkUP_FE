import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import StarRating from '../../common/StarRating';
import DEFAULT_IMG from '../../../assets/icons/default-featured-image.png.jpg';
import { Product } from './model/productSchema';
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
  StyledLink,
  StyledMoreButton,
} from './style/CardStyle';

interface CategoryProductsProps {
  categories: string[];
  products: Product[] | undefined;
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

  const filtered = products.filter((product: Product) =>
    product.category.toLowerCase().includes(selectedCategory.toLowerCase())
  );

  const getRandomProducts = (products: Product[]): Product[] => {
    const shuffled = [...products].sort(() => 0.5 - Math.random()); // Shuffle the array
    return shuffled.slice(0, 8);
  };

  const displayedProducts = useMemo(
    () => getRandomProducts(filtered),
    [filtered]
  );

  useEffect(() => {
    //fetch상품
  }, [selectedCategory]);
  return (
    <Recommend>
      <CategoryWrapper>
        <RecommendTitle onClick={handleToggle}>
          {selectedCategory}
        </RecommendTitle>
        <CategoryContainer expanded={isExpanded}>
          {categories.map((category) => (
            <CategoryItem
              key={category}
              selected={category == selectedCategory}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </CategoryItem>
          ))}
        </CategoryContainer>
      </CategoryWrapper>
      <CardWrapper>
        {displayedProducts.map((product) => (
          <Card key={product.id}>
            <StyledLink to={`/products/${product.id}`}>
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
                  {' '}
                  <StarRating rating={product.rating} />
                </ProductStar>
                <PriceWrapper>
                  <OriginalPrice>{product.originalprice}원</OriginalPrice>
                  <DiscountedPrice>{product.discountprice}원</DiscountedPrice>
                </PriceWrapper>
              </ProductWrapper>
            </StyledLink>
            <LikeButton likes={product.likes} />
          </Card>
        ))}
      </CardWrapper>
      <MoreButtonWrapper>
        <StyledMoreButton to={`/products?category=${selectedCategory}`}>
          더보기
        </StyledMoreButton>
      </MoreButtonWrapper>
    </Recommend>
  );
};
const Recommend = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  height: auto;
  margin: 0 auto;
`;

const RecommendTitle = styled.h2`
  text-decoration: underline;
  margin-left: 10px;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
  &:hover {
    cursor: pointer;
  }
`;

export default CategoryProduct;
