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
        <ModalHeader>
          <ModalTitle>회원탈퇴</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <ModalContent>
          <WarningIcon>⚠️</WarningIcon>
          <MessageText>회원탈퇴 하시겠습니까?</MessageText>
          <WarningText>
            계정을 삭제하면 모든 데이터가 영구적으로 삭제되며 복구할 수
            없습니다.
          </WarningText>
          <ButtonWrapper>
            <CancelButton onClick={onClose}>취소</CancelButton>
            <ConfirmButton
              onClick={() => {
                navigate('/');
              }}
            >
              탈퇴하기
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
  background-color: #c53030; /* Red header for warning */
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

const WarningIcon = styled.div`
  font-size: 32px;
  margin-bottom: 16px;
`;

const MessageText = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #2d3748;
  text-align: center;
`;

const WarningText = styled.div`
  font-size: 14px;
  color: #718096;
  text-align: center;
  margin-bottom: 24px;
  padding: 8px 12px;
  background-color: #fef2f2;
  border-radius: 6px;
  border-left: 3px solid #f87171;
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
  background-color: #e53e3e;
  color: white;
  border: none;

  &:hover {
    background-color: #c53030;
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

export default WithdrawModal;
