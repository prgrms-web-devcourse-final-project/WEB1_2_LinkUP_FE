import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { postSignIn } from '../../../api/loginApi';
import { useAuth } from '../../../context/AuthContext';

const SignInPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [pwError, setPwError] = useState<string>('');
  const { login } = useAuth();

  const validatePassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    return passwordRegex.test(password);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get('accessToken');
    if (accessToken) {
      localStorage.setItem('token', accessToken);
      navigate('/');
    }
  }, [location, navigate]);

  return (
    <Wrapper>
      <LeftContent>
        <img
          src="/images/login1.jpg"
          alt="Login background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
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
          placeholder="비밀번호 입력 (영문 대/소문자, 숫자, 특수문자 포함 8-16자)"
          value={pw}
          type={'password'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const newPw = e.target.value;
            setPw(newPw);
            if (newPw && !validatePassword(newPw)) {
              setPwError(
                '비밀번호는 영문 대/소문자, 숫자, 특수문자를 포함한 8-16자여야 합니다.'
              );
            } else {
              setPwError('');
            }
          }}
        />
        {pwError && <ErrorMessage>{pwError}</ErrorMessage>}
        <LoginButton
          onClick={async () => {
            if (!validatePassword(pw)) {
              alert('올바른 비밀번호 형식이 아닙니다.');
              return;
            }
            const response = await postSignIn({
              email: email,
              password: pw,
            });
            if (response.status === 200) {
              const token =
                response.headers['authorization'] ||
                response.headers['Authorization'];
              const role = response.data.roles;

              if (token) {
                login(token, role);
                navigate('/');
              }
            } else {
              alert('틀렸습니다.');
            }
          }}
        >
          Login
        </LoginButton>
        <SNSButton>
          <a
            href="http://15.164.5.135:8080/users/sociallogin"
            style={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <img
              src="/images/naverlogo.png"
              alt="Naver Logo"
              style={{ width: '50px', height: '15px' }}
            />
            계정으로 로그인
          </a>
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

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;
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
