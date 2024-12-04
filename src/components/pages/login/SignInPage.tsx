import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { postSignIn } from '../../../api/loginApi';

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');

  return (
    <Wrapper>
      <LeftContent>
        <img
          src="/images/login1.jpg"
          alt="Login background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </LeftContent>
      <RightContent>
        <Title>Welcome 👋🏼</Title>
        <Subtitle>email address</Subtitle>
        <StyledInput
          placeholder="이메일 입력"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
        />
        <Subtitle>password</Subtitle>
        <StyledInput
          placeholder="비밀번호 입력 (8 ~ 16자리)"
          value={pw}
          type={'password'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPw(e.target.value);
          }}
        />
        <LoginButton
          onClick={async () => {
            await postSignIn({
              email: email,
              password: pw,
            });
          }}
        >
          Login
        </LoginButton>
        <SNSButton>
          <img
            src="/images/googlelogo.png"
            alt="Google Logo"
            style={{ width: '50px', height: '17px' }}
          />
          계정으로 로그인
        </SNSButton>
        <AuthButtonWrapper>
          <AuthButton
            onClick={() => {
              navigate('/signup');
            }}
          >
            회원가입 하기
          </AuthButton>
          <AuthButton
            onClick={() => {
              navigate('/findpassword');
            }}
          >
            비밀번호 찾기
          </AuthButton>
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
  gap: 5px;
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
  width: calc(100% - 40px);
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

export default SignInPage;
