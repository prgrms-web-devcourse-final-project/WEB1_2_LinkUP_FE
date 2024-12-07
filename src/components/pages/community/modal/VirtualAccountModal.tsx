import React, { useState } from 'react';
import axiosInstance from '../../../../api/axiosInstance';
import styled from 'styled-components';
import { VirtualAccountResponse } from '../api/paymentApi';

const API_BASE_URL = 'http://localhost:8080/api/v1/virtual';

interface VirtualAccountModalProps {
  orderId: string;
  amount: number;
  title: string;
  customerName: string;
  customerEmail: string;
  onClose: () => void;
  onComplete: (response: VirtualAccountResponse) => void;
}

const VirtualAccountModal: React.FC<VirtualAccountModalProps> = ({
  orderId,
  amount,
  title,
  customerName,
  customerEmail,
  onClose,
  onComplete,
}) => {
  const [loading, setLoading] = useState(false);

  const handleVirtualAccountCreation = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post<VirtualAccountResponse>(
        `${API_BASE_URL}`,
        {
          orderId,
          amount,
          orderName: title,
          customerName,
          customerEmail,
          validHours: 12,
          successUrl: `${API_BASE_URL}/success`,
          failUrl: `${API_BASE_URL}/fail`,
          method: 'VIRTUAL_ACCOUNT',
        },
        {
          headers: {
            Authorization: `Basic ${btoa('토스 시크릿 키:')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      onComplete(response.data);
    } catch (error) {
      console.error('가상 계좌 발급 실패:', error);
      alert('가상 계좌 발급에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper>
      <ModalContent>
        <ModalHeader>가상 계좌 발급</ModalHeader>
        <ModalBody>
          <p>상품명: {title}</p>
          <p>결제 금액: {amount.toLocaleString()} 원</p>
        </ModalBody>
        <ModalFooter>
          <ActionButton
            onClick={handleVirtualAccountCreation}
            disabled={loading}
          >
            {loading ? '발급 중...' : '발급'}
          </ActionButton>
          <CancelButton onClick={onClose}>닫기</CancelButton>
        </ModalFooter>
      </ModalContent>
    </ModalWrapper>
  );
};

export default VirtualAccountModal;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ModalBody = styled.div`
  margin-bottom: 20px;

  p {
    margin: 5px 0;
    font-size: 1rem;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #6c757d;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #5a6268;
  }
`;
