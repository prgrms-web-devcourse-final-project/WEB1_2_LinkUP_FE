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
        <BlueOverlay />
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
        <ContentContainer>
          <LogoContainer>
            <Logo>GoodBuyUs</Logo>
          </LogoContainer>
          <Title>Welcome 👋🏼</Title>
          <FormContainer>
            <InputGroup>
              <Subtitle>Email Address</Subtitle>
              <StyledInput
                placeholder="이메일 입력"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                }}
              />
            </InputGroup>

            <InputGroup>
              <Subtitle>Password</Subtitle>
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
            </InputGroup>
          </FormContainer>

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
                const userId = response.data.userid;
                localStorage.setItem('userid', userId);
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
              href="http://goodbuyus.store:8080/users/sociallogin"
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
        </ContentContainer>
      </RightContent>
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

const LogoContainer = styled.div`
  margin-bottom: 30px;
`;

const Logo = styled.div`
  font-size: 22px;
  font-weight: 800;
  color: #3498db;
  letter-spacing: 2px;
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

const AuthButton = styled.div`
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  color: #3498db;

  &:hover {
    text-decoration: underline;
    color: #2980b9;
  }
`;

const AuthButtonWrapper = styled.div`
  margin-top: 24px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const SNSButton = styled.div`
  border: 1px solid #3498db;
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  border-radius: 50px;
  font-size: 14px;
  cursor: pointer;
  gap: 10px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(52, 152, 219, 0.05);
    box-shadow: 0 2px 8px rgba(52, 152, 219, 0.2);
  }
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

export default SignInPage;
