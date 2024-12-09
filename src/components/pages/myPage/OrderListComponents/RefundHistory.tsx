import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getRefundList, RefundType } from '../../../../api/mypageApi';

const RefundHistory = () => {
  const [refundList, setRefundList] = useState<RefundType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderList = async () => {
      const response = await getRefundList();

      setRefundList(response);
    };
    fetchOrderList();
  }, []);
  return (
    <Container>
      <RefundList>
        {refundList.map((refund, idx) => (
          <RefundItem key={idx}>
            <RefundWrapper>
              <ImageContainer>
                <ImagePlaceholder />
              </ImageContainer>
              <RefundDetails>
                <ProductName>{refund.productName}</ProductName>
                <ProductInfo>Quantity: {refund.quantity}</ProductInfo>
                <StatusBadge status={refund.paymentStatus}>
                  {refund.paymentStatus === 'CANCELED' ? '취소' : '대기 중'}
                </StatusBadge>
              </RefundDetails>
            </RefundWrapper>
            <Price>{refund.price}원</Price>
            <Actions>
              <ActionButton
                onClick={() => {
                  navigate(`/products/${refund.postId}`);
                }}
              >
                상품 페이지 이동
              </ActionButton>
            </Actions>
          </RefundItem>
        ))}
      </RefundList>
    </Container>
  );
};

const RefundWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  width: 400px;
`;

const Container = styled.div`
  width: 100%;
  margin: 20px 0;
`;

const RefundList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RefundItem = styled.div`
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

const RefundDetails = styled.div`
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
    props.status === '환불 처리 중' ? '#dc3545' : '#007bff'};
`;

const Price = styled.div`
  font-size: 16px;
  font-weight: bold;
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
const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default RefundHistory;
