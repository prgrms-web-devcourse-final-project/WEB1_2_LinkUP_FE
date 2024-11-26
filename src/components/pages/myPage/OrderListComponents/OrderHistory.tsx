import React from 'react';
import styled from 'styled-components';
import { orderHistoryData } from '../mockData';

const OrderHistory = () => {
  return (
    <Container>
      <OrderList>
        {orderHistoryData.map((order) => (
          <OrderItem key={order.id}>
            <OrderWrapper>
              <ImageContainer>
                <ImagePlaceholder />
              </ImageContainer>
              <OrderDetails>
                <ProductName>{order.name}</ProductName>
                <ProductInfo>Quantity: {order.quantity}</ProductInfo>
                <StatusBadge status={order.status}>{order.status}</StatusBadge>
              </OrderDetails>
            </OrderWrapper>
            <Price>{order.price}</Price>
            <Actions>
              <ActionButton>상품 페이지 이동</ActionButton>
              {order.status === '배송 완료' && (
                <>
                  <ReviewButton>리뷰 작성하기</ReviewButton>
                  <CancelButton>환불하기</CancelButton>
                </>
              )}
              {order.status === '배송 준비 중' && (
                <CancelButton>주문 취소하기</CancelButton>
              )}
            </Actions>
          </OrderItem>
        ))}
      </OrderList>
    </Container>
  );
};

const OrderWrapper = styled.div`
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

const OrderItem = styled.div`
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

const OrderDetails = styled.div`
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
  color: ${(props) =>
    props.status === '배송 완료'
      ? '#28a745'
      : props.status === '배송 준비 중'
        ? '#ffc107'
        : props.status === '주문 취소'
          ? '#dc3545'
          : '#007bff'};
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

export default OrderHistory;
