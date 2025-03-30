import React, { useEffect, useState } from 'react';
import Sidemenu from './SideMenu';
import GS from './GS';
import { styled } from 'styled-components';
import { QueryHandler, useWishQuery } from '../../../hooks/useGetProduct';
import { postWishProduct } from '../HomePage/api/wish';
import { LikeButton } from '../HomePage/style/CardStyle';

const WishListPage: React.FC = () => {
  const { data: wish, isLoading, isError } = useWishQuery();
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
  return (
    <QueryHandler isLoading={isLoading} isError={isError}>
      <GS.Wrapper>
        <Sidemenu />
        <GS.Content>
          <Title>찜한 상품</Title>
          <Container>
            <WishList>
              {wish?.map((wish, index) => (
                <WishItem key={index}>
                  <WishWrapper>
                    <ImageContainer>
                      {wish.productImage !== '' ? (
                        <img
                          src={wish.productImage}
                          alt={wish.productName}
                          width={60}
                          height={60}
                        />
                      ) : (
                        <ImagePlaceholder />
                      )}
                    </ImageContainer>
                    <WishDetails>
                      <ProductName>{wish.productName}</ProductName>
                    </WishDetails>
                  </WishWrapper>
                  <Price>{wish.productPrice}</Price>
                  <Actions>
                    <LikeButton
                      likes={likedProducts.includes(wish.productPostId)}
                      onClick={() => {
                        changeLike(wish.productPostId);
                      }}
                    />
                  </Actions>
                </WishItem>
              ))}
            </WishList>
          </Container>
        </GS.Content>
      </GS.Wrapper>
    </QueryHandler>
  );
};

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const WishWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  width: 400px;
`;

const Container = styled.div`
  width: 100%;
  margin: 20px 0;
`;

const WishList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const WishItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
`;

const ImageContainer = styled.div`
  flex-shrink: 0;
`;

const ImagePlaceholder = styled.div`
  width: 60px;
  height: 60px;
  background-color: #f0f0f0;
  border-radius: 8px;
`;

const WishDetails = styled.div`
  margin-left: 20px;
`;

const ProductName = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const Price = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default WishListPage;
