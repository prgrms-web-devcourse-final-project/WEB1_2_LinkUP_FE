import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../common/Pagination';
import StarRating from '../../common/StarRating';
import { AllProducts } from '../HomePage/model/productSchema';
import DEFAULT_IMG from '../../../assets/icons/default-featured-image.png.jpg';
import { QueryHandler, useWishQuery } from '../../../hooks/useGetProduct';
import { postWishProduct } from '../HomePage/api/wish';
import {
  Card,
  CardWrapper,
  DiscountedPrice,
  OriginalPrice,
  PriceWrapper,
  ProductImg,
  ProductName,
  ProductStar,
  ProductWrapper,
  Recommend,
  StyledLink,
} from '../HomePage/style/CardStyle';
import styled from 'styled-components';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

type ProductComponentProps = {
  input: string;
  products: AllProducts[];
  initialCategory: 'ALL' | 'LIFESTYLE' | 'FOOD' | 'FASHION';
};

const ProductComponent: React.FC<ProductComponentProps> = ({
  input,
  products,
  initialCategory,
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedText, setSelectedText] = useState<
    '판매 상품' | '기한 마감 상품'
  >('판매 상품');
  const [sortBy, setSortBy] = useState<'rating' | 'discountprice'>('rating');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedCategory, setSelectedCategory] = useState<
    'ALL' | 'LIFESTYLE' | 'FOOD' | 'FASHION'
  >(initialCategory);
  const PRODUCT_PER_PAGE = 16;
  const startIndex = (currentPage - 1) * PRODUCT_PER_PAGE;

  const { data: wish, isLoading, isError } = useWishQuery();
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  useEffect(() => {
    if (wish) {
      setLikedProducts(wish.map((item) => item.productPostId));
    }
  }, [wish]);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  const getSortedProducts = (products: AllProducts[]): AllProducts[] => {
    const sortedProducts = [...products];
    switch (sortBy) {
      case 'rating':
        return sortedProducts.sort((a, b) =>
          sortOrder === 'desc' ? b.rating - a.rating : a.rating - b.rating
        );
      case 'discountprice':
        return sortedProducts.sort((a, b) =>
          sortOrder === 'desc'
            ? b.discountprice - a.discountprice
            : a.discountprice - b.discountprice
        );
      default:
        return sortedProducts;
    }
  };

  const filteredProducts = useMemo(() => {
    const baseFiltered =
      selectedText === '기한 마감 상품'
        ? products.filter(
            (p) =>
              p.available === false ||
              (new Date(p.deadline) < new Date() && p.discountprice > 1)
          )
        : products.filter(
            (p) =>
              p.available === true &&
              new Date(p.deadline) > new Date() &&
              p.discountprice > 1
          );

    const categoryFiltered =
      selectedCategory === 'ALL'
        ? baseFiltered
        : baseFiltered.filter(
            (product) => product.category.toUpperCase() === selectedCategory
          );

    return getSortedProducts(categoryFiltered);
  }, [products, selectedText, sortBy, sortOrder, selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCT_PER_PAGE);

  const changeLike = async (productPostId: number) => {
    setLikedProducts((prev) =>
      prev.includes(productPostId)
        ? prev.filter((id) => id !== productPostId)
        : [...prev, productPostId]
    );
    await postWishProduct({ productPostId });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedText, sortBy, sortOrder]);

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCT_PER_PAGE
  );

  const handleCategoryClick = (
    category: 'ALL' | 'LIFESTYLE' | 'FOOD' | 'FASHION'
  ) => {
    setSelectedCategory(category);
    if (category === 'ALL') {
      navigate('/products');
    } else {
      navigate(`/products?category=${category}`);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <QueryHandler isLoading={isLoading} isError={isError}>
      <Recommend>
        <ProductHeader>
          <TextWrapper>
            <TabText
              selected={selectedText === '판매 상품'}
              onClick={() => setSelectedText('판매 상품')}
            >
              판매 상품
            </TabText>
            <TabText
              selected={selectedText === '기한 마감 상품'}
              onClick={() => setSelectedText('기한 마감 상품')}
            >
              기한 마감 상품
            </TabText>
          </TextWrapper>
          {input && <SearchTitle>{input}에 대한 검색 결과</SearchTitle>}
          <CategoryButtons>
            <CategoryButton
              onClick={() => handleCategoryClick('ALL')}
              $active={selectedCategory === 'ALL'}
            >
              전체
            </CategoryButton>
            <CategoryButton
              onClick={() => handleCategoryClick('FOOD')}
              $active={selectedCategory === 'FOOD'}
            >
              FOOD
            </CategoryButton>
            <CategoryButton
              onClick={() => handleCategoryClick('LIFESTYLE')}
              $active={selectedCategory === 'LIFESTYLE'}
            >
              LIFESTYLE
            </CategoryButton>
            <CategoryButton
              onClick={() => handleCategoryClick('FASHION')}
              $active={selectedCategory === 'FASHION'}
            >
              FASHION
            </CategoryButton>
          </CategoryButtons>
          <SortButtons>
            <SortButton
              onClick={() => {
                setSortBy('rating');
                setSortOrder('desc');
              }}
              $active={sortBy === 'rating' && sortOrder === 'desc'}
            >
              별점 높은순
            </SortButton>
            <SortButton
              onClick={() => {
                setSortBy('rating');
                setSortOrder('asc');
              }}
              $active={sortBy === 'rating' && sortOrder === 'asc'}
            >
              별점 낮은순
            </SortButton>
            <SortButton
              onClick={() => {
                setSortBy('discountprice');
                setSortOrder('desc');
              }}
              $active={sortBy === 'discountprice' && sortOrder === 'desc'}
            >
              가격 높은순
            </SortButton>
            <SortButton
              onClick={() => {
                setSortBy('discountprice');
                setSortOrder('asc');
              }}
              $active={sortBy === 'discountprice' && sortOrder === 'asc'}
            >
              가격 낮은순
            </SortButton>
          </SortButtons>
        </ProductHeader>

        <ProductCardWrapper>
          {currentProducts.length === 0 ? (
            <NoProductMessage>
              {selectedText === '판매 상품'
                ? '현재 판매 상품이 없습니다.'
                : '현재 기한 마감 상품이 없습니다.'}
            </NoProductMessage>
          ) : (
            currentProducts.map((product) => (
              <ProductCard
                key={product.productPostId}
                $isAvailable={selectedText === '판매 상품'}
              >
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
                      {product.available ? (
                        <>
                          <OriginalPrice>
                            {product.originalprice}원
                          </OriginalPrice>
                          <DiscountedPrice>
                            {product.discountprice}원
                          </DiscountedPrice>
                        </>
                      ) : (
                        <UnavailablePrice>∞ (판매 종료)</UnavailablePrice>
                      )}
                    </PriceWrapper>
                  </ProductWrapper>
                </StyledLink>
                <LikeButton
                  $likes={likedProducts.includes(product.productPostId)}
                  onClick={() => {
                    changeLike(product.productPostId);
                  }}
                >
                  {likedProducts.includes(product.productPostId) ? (
                    <FaHeart />
                  ) : (
                    <FaRegHeart />
                  )}
                </LikeButton>
              </ProductCard>
            ))
          )}
        </ProductCardWrapper>

        {totalPages > 1 && (
          <PagenationWrapper>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </PagenationWrapper>
        )}
      </Recommend>
    </QueryHandler>
  );
};

const ProductHeader = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const TextWrapper = styled.div`
  display: flex;
  gap: 25px;
  margin-bottom: 15px;
`;

const TabText = styled.h2<{ selected: boolean }>`
  cursor: pointer;
  font-size: 16px;
  margin: 0;
  color: ${({ selected }) => (selected ? '#333' : '#666')};
  text-decoration: ${({ selected }) => (selected ? 'underline' : 'none')};
  font-weight: ${({ selected }) => (selected ? '600' : '400')};

  &:hover {
    color: #333;
  }
`;

const SearchTitle = styled.h3`
  font-size: 18px;
  color: #333;
  margin: 10px 0;
`;

const SortButtons = styled.div`
  display: flex;
  gap: 8px;
  margin: 15px 0;
  flex-wrap: wrap;
  justify-content: flex-end;
  width: 100%;
`;

const SortButton = styled.button<{ $active: boolean }>`
  padding: 6px 12px;
  border: 1px solid ${({ $active }) => ($active ? '#2563eb' : '#e5e7eb')};
  border-radius: 4px;
  background-color: ${({ $active }) => ($active ? '#2563eb' : 'white')};
  color: ${({ $active }) => ($active ? 'white' : '#4b5563')};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ $active }) => ($active ? '#1d4ed8' : '#f3f4f6')};
    border-color: ${({ $active }) => ($active ? '#1d4ed8' : '#d1d5db')};
  }
`;

const NoProductMessage = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: gray;
  margin: 50px 0;
`;

const ProductCardWrapper = styled(CardWrapper)`
  margin-top: 20px;
`;

const ProductCard = styled(Card)<{ $isAvailable: boolean }>`
  background-color: ${({ $isAvailable }) =>
    $isAvailable ? 'white' : '#f5f5f5'};
  opacity: ${({ $isAvailable }) => ($isAvailable ? 1 : 0.8)};

  &::after {
    content: ${({ $isAvailable }) => ($isAvailable ? '""' : '"판매 종료"')};
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    color: #474545;
    font-size: 14px;
    font-weight: bold;
    padding: 5px 10px;
    border-radius: 5px;
    background-color: ${({ $isAvailable }) =>
      $isAvailable ? 'transparent' : 'rgba(255, 255, 255, 0.7)'};
  }
`;

const UnavailablePrice = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #999;

  @media (max-width: 767px) {
    font-size: 14px;
  }
`;

const PagenationWrapper = styled.div`
  margin-top: 60px;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const LikeButton = styled.button<{ $likes: boolean }>`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  transition: all 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
    transform: scale(1.1);
  }

  svg {
    color: ${({ $likes }) => ($likes ? '#ff4d4f' : '#999')};
    font-size: 20px;
  }
`;

const CategoryButtons = styled.div`
  display: flex;
  gap: 8px;
  margin: 15px 0;
  flex-wrap: wrap;
`;

const CategoryButton = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border: 1px solid ${({ $active }) => ($active ? '#2563eb' : '#e5e7eb')};
  border-radius: 20px;
  background-color: ${({ $active }) => ($active ? '#2563eb' : 'white')};
  color: ${({ $active }) => ($active ? 'white' : '#4b5563')};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ $active }) => ($active ? '#1d4ed8' : '#f3f4f6')};
    border-color: ${({ $active }) => ($active ? '#1d4ed8' : '#d1d5db')};
  }
`;

export default ProductComponent;
