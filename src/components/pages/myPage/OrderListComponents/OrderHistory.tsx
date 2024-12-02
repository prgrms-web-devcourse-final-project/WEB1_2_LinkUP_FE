import React, { useState } from 'react';
import styled from 'styled-components';
import { orderHistoryData } from '../mockData';

const OrderHistory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancelClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    // 주문 취소/환불 로직 추가 예정
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

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
              <CancelButton onClick={handleCancelClick}>
                주문 취소/환불
              </CancelButton>
              {order.status === '배송 완료' && (
                <ReviewLink>
                  <ReviewIcon src="/images/qricon.png" alt="review icon" />
                  <span>리뷰 작성하기</span>
                </ReviewLink>
              )}
            </Actions>
          </OrderItem>
        ))}
      </OrderList>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalText>주문을 취소/환불하시겠습니까?</ModalText>
            <ModalButtons>
              <ConfirmButton onClick={handleConfirm}>Yes</ConfirmButton>
              <CancelModalButton onClick={handleClose}>No</CancelModalButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}
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
  color: #131118;
  border: 1px solid #131118;
  padding: 10px 10px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: #131118;
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
    border-bottom: 1px solid #131118;
  }
`;

const ReviewIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
`;

const ModalText = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const ConfirmButton = styled.button`
  padding: 8px 24px;
  border-radius: 4px;
  border: 1px solid #ff7262;
  background-color: #fff;
  color: #ff7262;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ff7262;
    color: #fff;
  }
`;

const CancelModalButton = styled(ConfirmButton)`
  border: 1px solid #131118;
  color: #131118;

  &:hover {
    background-color: #131118;
    color: #fff;
  }
`;

export default OrderHistory;
