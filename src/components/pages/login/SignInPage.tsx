import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const SignInPage = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <LeftContent>Image</LeftContent>
      <RightContent>
        <Title>Welcome 👋🏼</Title>
        <Subtitle>email address</Subtitle>
        <StyledInput placeholder="이메일 입력" />
        <Subtitle>password</Subtitle>
        <StyledInput placeholder="비밀번호 입력 (8 ~ 16자리)" />
        <LoginButton>Login</LoginButton>
        <SNSButton>계정으로 로그인</SNSButton>
        <AuthButtonWrapper>
          <AuthButton
            onClick={() => {
              navigate('/signup');
            }}
          >
            회원가입 하기
          </AuthButton>
          <AuthButton>비밀번호 찾기</AuthButton>
        </AuthButtonWrapper>
      </RightContent>
    </Wrapper>
  );
};

const AuthButton = styled.div`
  font-size: 13px;
  font-weight: 400;
  cursor: pointer;
`;

const AuthButtonWrapper = styled.div`
  margin-top: 35px;
  width: calc(100% - 20px);
  display: inline-flex;
  justify-content: space-around;
`;

const SNSButton = styled.div`
  border: 1px solid #000;
  width: calc(100% - 20px);
  height: 35px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 13px;
  cursor: pointer;
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
  height: 35px;
  border-radius: 5px;
  font-size: 13px;
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
  background-color: lightblue;
  display: flex;
  align-items: center;
  justify-content: center;
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

export default SignInPage;
