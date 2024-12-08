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
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const handleConfirm = async () => {
    if (password === confirmPassword && password.length >= 8 && token) {
      await postResetPassword({ newPassword: password }, token);
      setShowModal(true);
    } else {
      alert('비밀번호가 일치하지 않거나 유효하지 않습니다.');
    }
  };

  return (
    <Wrapper>
      <LeftContent>
        <img
          src="/images/login6.jpg"
          alt="Login background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </LeftContent>
      <RightContent>
        <Title>비밀번호 재설정</Title>
        <Subtitle>password</Subtitle>
        <StyledInput
          type="password"
          placeholder="비밀번호 입력 (8 ~ 16자리)"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <Subtitle>confirm password</Subtitle>
        <StyledInput
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
        />
        <LoginButton onClick={handleConfirm}>Confirm</LoginButton>
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

const NaviButton = styled.div`
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  width: calc(100% - 40px);
  height: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 35px;
  cursor: pointer;
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
`;

const ModalText = styled.div`
  font-size: 18px;
  font-weight: 800;
  color: #333;
`;

const LoginButton = styled.div`
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  width: calc(100% - 20px);
  height: 35px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 35px;
  cursor: pointer;
`;

const StyledInput = styled.input`
  width: calc(100% - 20px);
  height: 25px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 13px;
  padding: 5px 10px;
  box-shadow: none;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #000;
  }
`;

const Subtitle = styled.div`
  font-size: 12px;
  font-weight: 500;
  margin-top: 10px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 900;
  margin-bottom: 20px;
`;

const LeftContent = styled.div`
  flex: 6;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const RightContent = styled.div`
  flex: 4;
  background-color: #fff;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding-left: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

export default ResetPasswordPage;
