import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  getOrderList,
  OrderType,
  postProductCancel,
} from '../../../../api/mypageApi';
const getStatusColor = (status: string): string => {
  switch (status) {
    case 'DONE':
      return '#2d8a6a';
    case 'PENDING':
      return '#3b7fc4';
    case 'AUTH_COMPLETED':
      return '#4e8ac9';
    case 'FAILED':
      return '#d35858';
    case 'CANCELED':
      return '#939393';
    case 'PARTIAL_CANCELED':
      return '#b88d3b';
    default:
      return '#6f8ca7';
  }
};
const OrderHistory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderList, setOrderList] = useState<OrderType[]>([]);
  const [pk, setPk] = useState<string>('');
  const navigate = useNavigate();

  const handleCancelClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    await postProductCancel({ paymentKey: pk, cancelReason: 'test' });
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'PENDING':
        return '결제 대기 중';
      case 'AUTH_COMPLETED':
        return '결제 요청 인증 성공';
      case 'DONE':
        return '결제 완료';
      case 'FAILED':
        return '결제 실패';
      case 'CANCELED':
        return '결제 취소';
      case 'PARTIAL_CANCELED':
        return '부분 취소';
      default:
        return '알 수 없는 상태';
    }
  };
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };
  useEffect(() => {
    const fetchOrderList = async () => {
      const response = await getOrderList();
      setOrderList(response);
    };
    fetchOrderList();
  }, []);

  return (
    <Container>
      {orderList.length === 0 ? (
        <EmptyState>
          <EmptyIcon>📦</EmptyIcon>
          <EmptyText>주문 내역이 없습니다.</EmptyText>
        </EmptyState>
      ) : (
        <OrderList>
          {orderList.map((order, index) => (
            <OrderItem key={index}>
              <OrderHeader>
                <OrderDate>주문일자: {formatDate(order.orderDate)}</OrderDate>
                {order.paymentStatus === 'DONE' && (
                  <OrderNumber>
                    주문번호: {order.payment_key?.substring(0, 8) || '00000000'}
                  </OrderNumber>
                )}
              </OrderHeader>
              <OrderContent>
                <OrderWrapper>
                  <ImageContainer>
                    <ImagePlaceholder />
                  </ImageContainer>
                  <OrderDetails>
                    <ProductName>{order.productName}</ProductName>
                    <ProductInfo>수량: {order.quantity}개</ProductInfo>
                    <StatusBadge status={order.paymentStatus}>
                      {getStatusLabel(order.paymentStatus)}
                    </StatusBadge>
                  </OrderDetails>
                </OrderWrapper>
                <Price>{order.price.toLocaleString()}원</Price>
                <Actions>
                  <ActionButton
                    onClick={() => {
                      navigate(`/products/${order.postId}`);
                    }}
                  >
                    상품 페이지 이동
                  </ActionButton>
                  {order.paymentStatus === 'DONE' && (
                    <CancelButton
                      onClick={() => {
                        handleCancelClick();
                        if (order.payment_key) {
                          setPk(order.payment_key);
                        }
                      }}
                    >
                      주문 취소/환불
                    </CancelButton>
                  )}
                  {order.paymentStatus === 'DONE' && (
                    <ReviewLink
                      onClick={() => {
                        navigate(`/products/${order.postId}`);
                      }}
                    >
                      <ReviewIcon src="/images/qricon.png" alt="review icon" />
                      <span>리뷰 작성하기</span>
                    </ReviewLink>
                  )}
                </Actions>
              </OrderContent>
            </OrderItem>
          ))}
        </OrderList>
      )}

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>주문 취소 확인</ModalHeader>
            <ModalText>주문을 취소/환불하시겠습니까?</ModalText>
            <ModalSubtext>
              취소 후에는 되돌릴 수 없으니 신중하게 결정해주세요.
            </ModalSubtext>
            <ModalButtons>
              <ConfirmButton onClick={handleConfirm}>확인</ConfirmButton>
              <CancelModalButton onClick={handleClose}>취소</CancelModalButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
`;

const EmptyIcon = styled.div`
  font-size: 40px;
  margin-bottom: 16px;
`;

const EmptyText = styled.div`
  font-size: 16px;
  color: #6f8ca7;
`;

const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const OrderItem = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #dae8f2;
  border-radius: 10px;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 50, 0.03);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 50, 0.06);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f0f6fc;
  padding: 12px 20px;
  border-bottom: 1px solid #dae8f2;
`;

const OrderDate = styled.div`
  font-size: 14px;
  color: #4a6b8a;
`;

const OrderNumber = styled.div`
  font-size: 14px;
  color: #4a6b8a;
`;

const OrderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const OrderWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  width: 400px;
`;

const ImageContainer = styled.div`
  flex-shrink: 0;
`;

const ImagePlaceholder = styled.div`
  width: 70px;
  height: 70px;
  background-color: #e6f0fa;
  border-radius: 8px;
  border: 1px solid #dae8f2;
`;

const OrderDetails = styled.div`
  margin-left: 20px;
`;

const ProductName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #2a5985;
  margin-bottom: 6px;
`;

const ProductInfo = styled.div`
  font-size: 14px;
  color: #6f8ca7;
  margin-bottom: 8px;
`;

const StatusBadge = styled.div<{ status: string }>`
  display: inline-block;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 500;
  color: white;
  background-color: ${(props) => getStatusColor(props.status)};
  border-radius: 20px;
`;

const Price = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #2a5985;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 140px;
`;

const ActionButton = styled.button`
  background: #fff;
  color: #3b7fc4;
  border: 1px solid #3b7fc4;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: #3b7fc4;
    color: #fff;
  }
`;

const CancelButton = styled.button`
  background: #fff;
  color: #d35858;
  border: 1px solid #d35858;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: #d35858;
    color: #fff;
  }
`;

const ReviewLink = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  margin-top: 6px;
  font-size: 13px;
  color: #3b7fc4;
  padding: 4px 0;

  span {
    border-bottom: 1px solid #3b7fc4;
  }

  &:hover {
    color: #2d6cae;

    span {
      border-bottom: 1px solid #2d6cae;
    }
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
  border-radius: 10px;
  width: 340px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 50, 0.1);
`;

const ModalHeader = styled.h3`
  color: #2a5985;
  margin-bottom: 16px;
  font-size: 18px;
`;

const ModalText = styled.p`
  margin-bottom: 12px;
  font-size: 16px;
  color: #4a6b8a;
`;

const ModalSubtext = styled.p`
  font-size: 14px;
  color: #6f8ca7;
  margin-bottom: 20px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const ConfirmButton = styled.button`
  padding: 8px 24px;
  border-radius: 6px;
  border: 1px solid #d35858;
  background-color: #fff;
  color: #d35858;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    background-color: #d35858;
    color: #fff;
  }
`;

const CancelModalButton = styled.button`
  padding: 8px 24px;
  border-radius: 6px;
  border: 1px solid #3b7fc4;
  background-color: #fff;
  color: #3b7fc4;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    background-color: #3b7fc4;
    color: #fff;
  }
`;

export default OrderHistory;
