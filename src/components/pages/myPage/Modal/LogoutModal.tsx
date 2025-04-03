import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useAuth } from '../../../../context/AuthContext';

const LogoutModal = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <ModalOverlay onClick={onClose}>
      <Modal
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          e.stopPropagation()
        }
      >
        <ModalHeader>
          <ModalTitle>로그아웃</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <ModalContent>
          <MessageText>로그아웃 하시겠습니까?</MessageText>
          <ButtonWrapper>
            <CancelButton onClick={onClose}>취소</CancelButton>
            <ConfirmButton
              onClick={() => {
                logout();
                navigate('/');
              }}
            >
              확인
            </ConfirmButton>
          </ButtonWrapper>
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
`;

const Modal = styled.div`
  background-color: #fff;
  width: 350px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1001;
  overflow: hidden;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background-color: #3182ce;
  color: white;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const ModalContent = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MessageText = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 24px;
  color: #2d3748;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  flex: 1;
  max-width: 120px;

  &:active {
    transform: translateY(1px);
  }
`;

const ConfirmButton = styled(Button)`
  background-color: #3182ce;
  color: white;
  border: none;

  &:hover {
    background-color: #2c5282;
  }
`;

const CancelButton = styled(Button)`
  background-color: transparent;
  color: #4a5568;
  border: 1px solid #e2e8f0;

  &:hover {
    background-color: #f7fafc;
  }
`;

export default LogoutModal;
