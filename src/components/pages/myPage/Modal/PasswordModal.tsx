import React, { useState } from 'react';
import { styled } from 'styled-components';
import axios from 'axios';
import {
  postPasswordChange,
  postPasswordVerify,
} from '../../../../api/mypageApi';

const PasswordModal = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwError, setPwError] = useState<string>('');
  const [cpwError, setCpwError] = useState<string>('');

  const validatePassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPw = e.target.value;
    setNewPassword(newPw);
    if (newPw && !validatePassword(newPw)) {
      setPwError(
        '비밀번호는 영문 대/소문자, 숫자, 특수문자를 포함한 8-16자여야 합니다.'
      );
    } else {
      setPwError('');
    }

    if (confirmPassword && newPw !== confirmPassword) {
      setCpwError('비밀번호가 일치하지 않습니다.');
    } else {
      setCpwError('');
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newCpw = e.target.value;
    setConfirmPassword(newCpw);
    if (newCpw && newPassword !== newCpw) {
      setCpwError('비밀번호가 일치하지 않습니다.');
    } else {
      setCpwError('');
    }
  };

  const handleNextStep = async () => {
    if (step === 1) {
      try {
        await postPasswordVerify({ currentPassword: currentPassword });
        setStep(2);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert('현재 비밀번호가 일치하지 않습니다.');
        } else {
          alert('오류가 발생했습니다.');
        }
      }
    } else if (step === 2) {
      if (!validatePassword(newPassword)) {
        alert('올바른 비밀번호 형식이 아닙니다.');
        return;
      }
      if (newPassword !== confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }
      try {
        await postPasswordChange({ newPassword: newPassword });
        alert('비밀번호가 성공적으로 변경되었습니다.');
        onClose();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert('비밀번호 변경에 실패했습니다.');
        } else {
          alert('오류가 발생했습니다.');
        }
      }
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>비밀번호 변경</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <ModalContent>
          {step === 1 && (
            <>
              <Title>현재 비밀번호</Title>
              <InputWrapper>
                <Input
                  type="password"
                  placeholder="현재 비밀번호를 입력하세요"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </InputWrapper>
              <ButtonWrapper>
                <CancelButton onClick={onClose}>취소</CancelButton>
                <SubmitButton onClick={handleNextStep}>확인</SubmitButton>
              </ButtonWrapper>
            </>
          )}
          {step === 2 && (
            <>
              <Title>변경할 비밀번호</Title>
              <InputWrapper>
                <Input
                  type="password"
                  placeholder="영문 대/소문자, 숫자, 특수문자 포함 8-16자"
                  value={newPassword}
                  onChange={handlePasswordChange}
                />
              </InputWrapper>
              {pwError && <ErrorMessage>{pwError}</ErrorMessage>}

              <Title>비밀번호 확인</Title>
              <InputWrapper>
                <Input
                  type="password"
                  placeholder="비밀번호를 다시 입력하세요"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </InputWrapper>
              {cpwError && <ErrorMessage>{cpwError}</ErrorMessage>}

              <ButtonWrapper>
                <CancelButton onClick={onClose}>취소</CancelButton>
                <SubmitButton onClick={handleNextStep}>변경</SubmitButton>
              </ButtonWrapper>
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
`;

const Modal = styled.div`
  background-color: #fff;
  width: 450px;
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
  padding: 20px;
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #2d3748;
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 93%;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.2);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    transform: translateY(1px);
  }
`;

const SubmitButton = styled(Button)`
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

const ErrorMessage = styled.div`
  color: #e53e3e;
  font-size: 13px;
  margin: -15px 0 20px 0;
  padding-left: 2px;
`;

export default PasswordModal;
