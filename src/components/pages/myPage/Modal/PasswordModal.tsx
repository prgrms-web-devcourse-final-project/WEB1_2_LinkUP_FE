import React, { useState } from 'react';
import { styled } from 'styled-components';
import { postPasswordVerify } from '../../../../api/mypageApi';

const PasswordModal = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNextStep = async () => {
    if (step === 1) {
      await postPasswordVerify({ currentPassword: currentPassword });
      setStep(2);
    } else if (step === 2) {
      if (newPassword === confirmPassword) {
        onClose();
      } else {
        alert('비밀번호가 일치하지 않습니다.');
      }
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <Modal
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          e.stopPropagation()
        }
      >
        <ModalContent>
          {step === 1 && (
            <>
              <Title>현재 비밀번호</Title>
              <InputWrapper>
                <Input
                  type="password"
                  placeholder="현재 비밀번호를 입력하세요"
                  value={currentPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCurrentPassword(e.target.value)
                  }
                />
                <Button onClick={handleNextStep}>확인</Button>
              </InputWrapper>
            </>
          )}
          {step === 2 && (
            <>
              <Title>변경할 비밀번호</Title>
              <InputWrapper>
                <Input
                  type="password"
                  placeholder="새 비밀번호를 입력하세요"
                  value={newPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewPassword(e.target.value)
                  }
                />
              </InputWrapper>
              <Title>비밀번호 확인</Title>
              <InputWrapper>
                <Input
                  type="password"
                  placeholder="비밀번호를 다시 입력하세요"
                  value={confirmPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setConfirmPassword(e.target.value)
                  }
                />
                <Button onClick={handleNextStep}>변경</Button>
              </InputWrapper>
            </>
          )}
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
  width: 400px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1001;
`;

const ModalContent = styled.div`
  font-size: 16px;
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
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

export default PasswordModal;
