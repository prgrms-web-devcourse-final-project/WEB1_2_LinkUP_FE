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
                <Button onClick={handleNextStep}>변경</Button>
              </InputWrapper>
              {cpwError && <ErrorMessage>{cpwError}</ErrorMessage>}
            </>
          )}
        </ModalContent>
      </Modal>
    </ModalOverlay>
  );
};

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin: -15px 0 10px 0;
`;

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
