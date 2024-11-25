import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StarRating from '../../common/StarRating';
import Heart from '../../../assets/icons/heart.png';
import FilledHeart from '../../../assets/icons/filled-heart.png';
import { Product } from './model/productSchema';

interface CategoryProductsProps {
  categories: string[];
  products: Product[];
}

const CategoryProduct: React.FC<CategoryProductsProps> = ({
  categories,
  products,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('생활용품');

  const handleToggle = () => setIsExpanded(!isExpanded);
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setIsExpanded(false);
  };

  //임의로 8개만 선택
  const getRandomProducts = (products: Product[]): Product[] => {
    const shuffled = [...products].sort(() => 0.5 - Math.random()); // Shuffle the array
    return shuffled.slice(0, 8);
  };
  const displayedProducts = useMemo(
    () => getRandomProducts(products),
    [products]
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
        <CategoryContainer isExpanded={isExpanded}>
          {categories.map((category) => (
            <CategoryItem
              key={category}
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
              <ProductImg src={product.image} alt={product.name} />
              <ProductWrapper>
                <ProductName>{product.name}</ProductName>
                <ProductStar>
                  {' '}
                  <StarRating rating={product.stars} />
                </ProductStar>
                <PriceWrapper>
                  <OriginalPrice>
                    ${product.originalPrice.toFixed(2)}
                  </OriginalPrice>
                  <DiscountedPrice>
                    ${product.discountedPrice.toFixed(2)}
                  </DiscountedPrice>
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

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  gap: 20px;
  margin-top: 20px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  margin: 10px;
  width: 200px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  align-items: center;
  position: relative;
  &:hover {
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.4);
    transform: translateY(-5px);
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  &:link {
    color: inherit;
  }
  &:visited {
    color: inherit;
  }
  &:active {
    color: inherit;
  }
`;
const ProductImg = styled.img`
  width: 90%;
  height: 200px;
  background-color: #e0e0e0;
  border-radius: 8px;
  object-fit: cover;
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`;

const ProductName = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  text-align: left;
`;

const ProductStar = styled.div`
  font-size: 20px;
  color: #ffaa00;
  text-align: left;
  margin-left: -5px;
  margin-top: 5px;
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 30px;
  text-align: left;
`;

const OriginalPrice = styled.div`
  text-decoration: line-through;
  color: #999;
  font-size: 14px;
`;

const DiscountedPrice = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #ff4d4f;
`;

const LikeButton = styled.img<{ likes: boolean }>`
  position: absolute;
  bottom: 20px;
  right: 30px;
  width: 25px;
  height: 25px;
  cursor: pointer;
  content: ${({ likes }) => `url(${likes ? FilledHeart : Heart})`};
  color: ${({ likes }) => (likes ? 'red ' : 'transparent')};

  &:hover {
    transform: scale(1.2);
    transition: transform 0.2s ease-in-out;
  }
`;
const CategoryWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
`;

const CategoryContainer = styled.div<{ isExpanded: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  position: absolute;
  top: 15px;
  left: 190px;
  padding: 10px 20px;
  z-index: 10;
  visibility: ${(props) => (props.isExpanded ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isExpanded ? 1 : 0)};
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
`;

const CategoryItem = styled.div`
  padding: 5px 10px;
  border-radius: 5px;
  width: 120px;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
const MoreButtonWrapper = styled.div`
  position: relative;
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const StyledMoreButton = styled(Link)`
  position: absolute;
  right: 20px;
  display: inline-block;
  padding: 10px 30px;
  background-color: black;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: gray;
  }
`;
export default CategoryProduct;
