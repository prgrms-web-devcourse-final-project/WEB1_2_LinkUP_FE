import React, { useEffect } from 'react';
import styled from 'styled-components';
import { getCommunity } from '../../../../api/mypageApi';
import { groupPurchaseHistoryData } from '../mockData';

const GroupPurchaseHistory = () => {
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getCommunity();
        console.log(response);
      } catch (error) {
        console.error('failed', error);
      }
    };
    fetchPost();
  }, []);
  return (
    <Container>
      <OrderList>
        {groupPurchaseHistoryData.map((groupPurchase) => (
          <GroupPurchaseItem key={groupPurchase.id}>
            <GroupPurchaseWrapper>
              <ImageContainer>
                <ImagePlaceholder />
              </ImageContainer>
              <GroupPurchaseDetails>
                <ProductName>{groupPurchase.name}</ProductName>
                <ProductInfo>Quantity: {groupPurchase.quantity}</ProductInfo>
                <StatusBadge status={groupPurchase.status}>
                  {groupPurchase.status}
                </StatusBadge>
              </GroupPurchaseDetails>
            </GroupPurchaseWrapper>
            <Price>{groupPurchase.price}</Price>
            <Actions>
              <ActionButton>상품 페이지 이동</ActionButton>
              {groupPurchase.status === '공구 완료' && (
                <>
                  <QRCodeButton>QR 코드 확인</QRCodeButton>
                  <ReviewLink>
                    <ReviewIcon src="/images/qricon.png" alt="review icon" />
                    <span>리뷰 작성하기</span>
                  </ReviewLink>
                </>
              )}
              {groupPurchase.status === '공구 모집중' && (
                <>
                  <CancelButton>주문 취소하기</CancelButton>
                </>
              )}
            </Actions>
          </GroupPurchaseItem>
        ))}
      </OrderList>
    </Container>
  );
};

const GroupPurchaseWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  width: 400px;
`;

const Container = styled.div`
  width: 100%;
  margin: 20px 0;
`;

const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const GroupPurchaseItem = styled.div`
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

const GroupPurchaseDetails = styled.div`
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

const StatusBadge = styled.div<{ status: string }>`
  margin-top: 10px;
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => (props.status === '공구 모집중' ? '#28a745' : '#007bff')};
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

const ActionButton = styled.div`
  background: #fff;
  color: #131118;
  border: 1px solid #131118;
  padding: 10px 10px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #131118;
    color: #fff;
  }
`;

const CancelButton = styled.div`
  background: #fff;
  color: #ff7262;
  border: 1px solid #ff7262;
  padding: 10px 10px;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: #ff7262;
    color: #fff;
  }
`;

const ReviewLink = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  margin-top: 8px;

  span {
    border-bottom: 1px solid #000;
  }
`;

const ReviewIcon = styled.img`
  width: 16px;
  height: 16px;
`;
const QRCodeButton = styled.div`
  background: #fff;
  color: #131118;
  border: 1px solid #131118;
  padding: 10px 10px;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  &:hover {
    background: #131118;
    color: #fff;
  }
`;

export default GroupPurchaseHistory;
