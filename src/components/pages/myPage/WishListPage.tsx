import React, { useState } from 'react';
import Sidemenu from './SideMenu';
import GS from './GS';
import { styled } from 'styled-components';
import { wishHistoryData } from './mockData';

interface WishState {
  [key: number]: boolean;
}

interface Wish {
  id: number;
  name: string;
  quantity: number;
  price: string;
}

function WishListPage() {
  const [wishStates, setWishStates] = useState<WishState>(() =>
    wishHistoryData.reduce((acc: WishState, wish: Wish) => {
      acc[wish.id] = true;
      return acc;
    }, {})
  );

  const toggleWish = (id: number): void => {
    setWishStates((prev: WishState) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <GS.Wrapper>
      <Sidemenu />
      <GS.Content>
        <Title>찜한 상품</Title>
        <Container>
          <WishList>
            {wishHistoryData.map((wish) => (
              <WishItem key={wish.id}>
                <WishWrapper>
                  <ImageContainer>
                    <ImagePlaceholder />
                  </ImageContainer>
                  <WishDetails>
                    <ProductName>{wish.name}</ProductName>
                    <ProductInfo>Quantity: {wish.quantity}</ProductInfo>
                  </WishDetails>
                </WishWrapper>
                <Price>{wish.price}</Price>
                <Actions>
                  <HeartIcon
                    src={
                      wishStates[wish.id]
                        ? '/images/wish_on.png'
                        : '/images/wish.png'
                    }
                    onClick={() => toggleWish(wish.id)}
                    alt="찜하기"
                  />
                </Actions>
              </WishItem>
            ))}
          </WishList>
        </Container>
      </GS.Content>
    </GS.Wrapper>
  );
}

const HeartIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

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

const ProductInfo = styled.div`
  font-size: 14px;
  color: #555;
  margin-top: 4px;
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
