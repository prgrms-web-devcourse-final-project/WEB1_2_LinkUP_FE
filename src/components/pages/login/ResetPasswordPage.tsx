import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { postResetPassword } from '../../../api/loginApi';
import { useLocation } from 'react-router-dom';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [pwError, setPwError] = useState<string>('');
  const [cpwError, setCpwError] = useState<string>('');
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const validatePassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPw = e.target.value;
    setPassword(newPw);
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
    if (newCpw && password !== newCpw) {
      setCpwError('비밀번호가 일치하지 않습니다.');
    } else {
      setCpwError('');
    }
  };

  const handleConfirm = async () => {
    if (!validatePassword(password)) {
      alert('올바른 비밀번호 형식이 아닙니다.');
      return;
    }
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (token) {
      await postResetPassword({ newPassword: password }, token);
      setShowModal(true);
    } else {
      alert('유효하지 않은 토큰입니다.');
    }
  };

  return (
    <Wrapper>
      <LeftContent>
        <BlueOverlay />
        <img
          src="/images/login6.jpg"
          alt="Login background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </LeftContent>
      <RightContent>
        <ContentContainer>
          <Title>비밀번호 재설정</Title>
          <FormContainer>
            <InputGroup>
              <Subtitle>Password</Subtitle>
              <StyledInput
                type="password"
                placeholder="비밀번호 입력 (영문 대/소문자, 숫자, 특수문자 포함 8-16자)"
                value={password}
                onChange={handlePasswordChange}
              />
              {pwError && <ErrorMessage>{pwError}</ErrorMessage>}
            </InputGroup>

            <InputGroup>
              <Subtitle>Confirm Password</Subtitle>
              <StyledInput
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {cpwError && <ErrorMessage>{cpwError}</ErrorMessage>}
            </InputGroup>
          </FormContainer>

          <LoginButton onClick={handleConfirm}>Confirm</LoginButton>
        </ContentContainer>
      </RightContent>
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalText>비밀번호가 변경되었습니다.</ModalText>
            <NaviButton
              onClick={() => {
                navigate('/signin');
              }}
            >
              Back to Login
            </NaviButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Wrapper>
  );
};

const BlueOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(52, 152, 219, 0.2);
  z-index: 1;
`;

const ContentContainer = styled.div`
  width: 80%;
  max-width: 400px;
`;

const FormContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const InputGroup = styled.div`
  margin-bottom: 16px;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 12px;
  margin-top: 5px;
  font-weight: 500;
`;

const NaviButton = styled.div`
  background-color: #3498db;
  color: #fff;
  border-radius: 50px;
  width: 70%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  letter-spacing: 1px;
  box-shadow: 0 4px 10px rgba(52, 152, 219, 0.3);

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(52, 152, 219, 0.4);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(52, 152, 219, 0.3);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 432px;
  height: 332px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  z-index: 1001;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const ModalText = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #34495e;
`;

const LoginButton = styled.div`
  background-color: #3498db;
  color: #fff;
  border-radius: 50px;
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  letter-spacing: 1px;
  box-shadow: 0 4px 10px rgba(52, 152, 219, 0.3);

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(52, 152, 219, 0.4);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(52, 152, 219, 0.3);
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: 48px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  padding: 0 16px;
  box-shadow: none;
  outline: none;
  transition: all 0.3s ease;
  background-color: #f9fafc;

  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
    background-color: #fff;
  }

  &::placeholder {
    color: #bdc3c7;
  }
`;

const Subtitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #34495e;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #34495e;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 40px;
    height: 3px;
    background-color: #3498db;
    border-radius: 3px;
  }
`;

const LeftContent = styled.div`
  flex: 6;
  position: relative;
  background-color: #ecf0f1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const RightContent = styled.div`
  flex: 4;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px 0;
  box-shadow: -10px 0 20px rgba(0, 0, 0, 0.05);
  z-index: 2;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #fff;
`;

export default ResetPasswordPage;
