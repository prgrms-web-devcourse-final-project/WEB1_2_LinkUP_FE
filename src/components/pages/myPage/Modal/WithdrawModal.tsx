import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const WithdrawModal = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  return (
    <ModalOverlay onClick={onClose}>
      <Modal
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          e.stopPropagation()
        }
      >
        <ModalContent>
          <Title>회원탈퇴 하시겠습니까?</Title>
          <Button
            onClick={() => {
              navigate('/');
            }}
          >
            확인
          </Button>
        </ModalContent>
      </Modal>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background-color: #fff;
  width: 300px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1001;
`;

const ModalContent = styled.div`
  font-size: 16px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

export default WithdrawModal;
