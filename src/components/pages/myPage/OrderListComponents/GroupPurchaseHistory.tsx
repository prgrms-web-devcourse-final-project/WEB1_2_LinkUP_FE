import React from 'react';
import styled from 'styled-components';
import { groupPurchaseHistoryData } from '../mockData';

const GroupPurchaseHistory = () => {
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
                  <ReviewButton>리뷰 작성하기</ReviewButton>
                  <QRCodeButton>QR 코드 확인</QRCodeButton>
                </>
              )}
              {groupPurchase.status === '공구 모집중' && (
                <>
                  <CancelButton>주문 취소하기</CancelButton>
                  <QRCodeButton>QR 코드 확인</QRCodeButton>
                </>
              )}
            </Actions>
          </GroupPurchaseItem>
        ))}
      </OrderList>
    </Container>
  );
};

const QRCodeButton = styled.div`
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
`;

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
  color: #000;
  border: 1px solid #000;
  padding: 10px 10px;
  border-radius: 4px;
  cursor: pointer;
`;

const ReviewButton = styled.div`
  background: black;
  color: #fff;
  border: 1px solid #000;
  padding: 10px 10px;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
`;

const CancelButton = styled.div`
  background: #dc3545;
  color: #fff;
  border: 1px solid #dc3545;
  padding: 10px 10px;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
`;

export default GroupPurchaseHistory;
