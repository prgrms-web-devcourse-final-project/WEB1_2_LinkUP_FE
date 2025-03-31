import React, { useEffect, useState } from 'react';
import Sidemenu from './SideMenu';
import GS from './GS';
import { styled } from 'styled-components';
import { QueryHandler, useWishQuery } from '../../../hooks/useGetProduct';
import { postWishProduct } from '../HomePage/api/wish';
import DEFAULT_IMG from '../../../assets/icons/default-featured-image.png.jpg';
import Heart from '../../../assets/icons/heart.png';
import FilledHeart from '../../../assets/icons/filled-heart.png';
import { PageTitle } from './OrderListPage';
import { useNavigate } from 'react-router-dom';
const WishListPage: React.FC = () => {
  const { data: wish, isLoading, isError } = useWishQuery();

  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (wish) {
      setLikedProducts(wish.map((item) => item.productPostId));
    }
  }, [wish]);

  const changeLike = async (productPostId: number) => {
    setLikedProducts((prev) =>
      prev.includes(productPostId)
        ? prev.filter((id) => id !== productPostId)
        : [...prev, productPostId]
    );

    await postWishProduct({ productPostId });
  };

  return (
    <QueryHandler isLoading={isLoading} isError={isError}>
      <GS.Wrapper>
        <Sidemenu />
        <GS.Content>
          <PageTitle>찜한 상품</PageTitle>
          <Container>
            <CardGrid>
              {wish?.map((wish, index) => (
                <Card key={index}>
                  <ImageContainer>
                    <img
                      src={wish.productImage || DEFAULT_IMG}
                      alt={wish.productName}
                      onClick={() =>
                        navigate(`/products/${wish.productPostId}`)
                      }
                      onError={(e) => {
                        e.currentTarget.src = DEFAULT_IMG;
                      }}
                    />
                    <LikeButtonWrapper>
                      {' '}
                      <LikeButton
                        likes={likedProducts.includes(wish.productPostId)}
                        onClick={() => {
                          changeLike(wish.productPostId);
                        }}
                      />
                    </LikeButtonWrapper>
                  </ImageContainer>
                  <CardContent
                    onClick={() => navigate(`/products/${wish.productPostId}`)}
                  >
                    <ProductName>{wish.productName}</ProductName>
                    <Price>{wish.productPrice}원</Price>
                  </CardContent>
                </Card>
              ))}
            </CardGrid>
          </Container>
        </GS.Content>
      </GS.Wrapper>
    </QueryHandler>
  );
};

const Container = styled.div`
  width: 97%;
  margin: 20px 0;
  background-color: #f0f7ff;
  padding: 20px;
  border-radius: 10px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.15);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(37, 99, 235, 0.2);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const LikeButtonWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  border-radius: 50%;
  padding: 20px;
`;

const LikeButton = styled.img.withConfig({
  shouldForwardProp: (prop) => prop !== 'likes',
})<{ likes: boolean }>`
  position: absolute;
  bottom: 1px;
  right: 10px;

  cursor: pointer;
  content: ${({ likes }) => `url(${likes ? FilledHeart : Heart})`};
  color: ${({ likes }) => (likes ? 'red ' : 'transparent')};

  &:hover {
    cursor: pointer;
    transform: scale(1.2);
    transition: transform 0.2s ease-in-out;
  }
`;
const CardContent = styled.div`
  padding: 15px;
`;

const ProductName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #1e40af;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Price = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #1e40af;
  background-color: #dbeafe;
  padding: 6px 12px;
  border-radius: 20px;
  display: inline-block;
`;

export default WishListPage;
