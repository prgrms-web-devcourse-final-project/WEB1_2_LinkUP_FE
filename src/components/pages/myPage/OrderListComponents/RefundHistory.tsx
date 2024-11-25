import React from 'react';
import styled from 'styled-components';
import { refundHistoryData } from '../mockData';

const RefundHistory = () => {
  return (
    <Container>
      <RefundList>
        {refundHistoryData.map((refund) => (
          <RefundItem key={refund.id}>
            <RefundWrapper>
              <ImageContainer>
                <ImagePlaceholder />
              </ImageContainer>
              <RefundDetails>
                <ProductName>{refund.name}</ProductName>
                <ProductInfo>Quantity: {refund.quantity}</ProductInfo>
                <StatusBadge status={refund.status}>
                  {refund.status}
                </StatusBadge>
              </RefundDetails>
            </RefundWrapper>
            <Price>{refund.price}</Price>
            <Actions></Actions>
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

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default RefundHistory;
