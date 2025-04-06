import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { postSignUp } from '../../../api/loginApi';
import { useUser } from '../../../context/UserContext';

function SignUpPage() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [cpw, setCpw] = useState<string>('');
  const [pwError, setPwError] = useState<string>('');
  const [cpwError, setCpwError] = useState<string>('');

  const validatePassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPw = e.target.value;
    setPw(newPw);
    if (newPw && !validatePassword(newPw)) {
      setPwError(
        '비밀번호는 영문 대/소문자, 숫자, 특수문자를 포함한 8-16자여야 합니다.'
      );
    } else {
      setPwError('');
    }

    if (cpw && newPw !== cpw) {
      setCpwError('비밀번호가 일치하지 않습니다.');
    } else {
      setCpwError('');
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newCpw = e.target.value;
    setCpw(newCpw);
    if (newCpw && pw !== newCpw) {
      setCpwError('비밀번호가 일치하지 않습니다.');
    } else {
      setCpwError('');
    }
  };
  const { setUser } = useUser();

  return (
    <Wrapper>
      <LeftContent>
        <BlueOverlay />
        <img
          src="/images/login4.jpg"
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
          <Title>회원가입</Title>
          <FormContainer>
            <InputGroup>
              <Subtitle>Name</Subtitle>
              <StyledInput
                placeholder="이름 입력"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setName(e.target.value);
                }}
              />
            </InputGroup>

            <InputGroup>
              <Subtitle>Phone Number</Subtitle>
              <StyledInput
                placeholder="휴대폰 번호 입력"
                value={phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPhone(e.target.value);
                }}
              />
            </InputGroup>

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
                type="password"
                placeholder="비밀번호 입력 (영문 대/소문자, 숫자, 특수문자 포함 8-16자)"
                value={pw}
                onChange={handlePasswordChange}
              />
              {pwError && <ErrorMessage>{pwError}</ErrorMessage>}
            </InputGroup>

            <InputGroup>
              <Subtitle>Confirm Password</Subtitle>
              <StyledInput
                type="password"
                placeholder="비밀번호 확인"
                value={cpw}
                onChange={handleConfirmPasswordChange}
              />
              {cpwError && <ErrorMessage>{cpwError}</ErrorMessage>}
            </InputGroup>
          </FormContainer>

          <LoginButton
            onClick={async () => {
              if (!validatePassword(pw)) {
                alert('올바른 비밀번호 형식이 아닙니다.');
                return;
              }
              if (pw !== cpw) {
                alert('비밀번호가 일치하지 않습니다.');
                return;
              }
              try {
                const response = await postSignUp({
                  email: email,
                  password: pw,
                  password_confirm: cpw,
                  name: name,
                  phone: phone,
                });

                if (response.message === '이메일, 전화번호 중복 확인 완료') {
                  setUser({
                    email: email,
                    password: pw,
                    passwordConfirm: cpw,
                    name: name,
                    phone: phone,
                  });

                  navigate('/termsandservice');
                } else {
                  alert('이메일 또는 전화번호가 중복 되었습니다.');
                }
              } catch (err) {
                if (
                  axios.isAxiosError(err) &&
                  err.response &&
                  err.response.data &&
                  err.response.data.error
                ) {
                  alert(err.response.data.error);
                }
              }
            }}
          >
            Signup
          </LoginButton>
          <AuthButtonWrapper>
            <AuthText>이미 계정이 있으신가요?</AuthText>
            <AuthButton
              onClick={() => {
                navigate('/signin');
              }}
            >
              로그인하기
            </AuthButton>
          </AuthButtonWrapper>
        </ContentContainer>
      </RightContent>
    </Wrapper>
  );
}

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

const AuthText = styled.span`
  font-size: 13px;
  color: #7f8c8d;
  margin-right: 8px;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 12px;
  margin-top: 5px;
  font-weight: 500;
`;

const AuthButton = styled.span`
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
  justify-content: center;
  align-items: center;
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

export default SignUpPage;
