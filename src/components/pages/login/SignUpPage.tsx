import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { postSignUp } from '../../../api/loginApi';

function SignUpPage() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [cpw, setCpw] = useState<string>('');

  return (
    <Wrapper>
      <LeftContent>
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
        <Title>회원가입</Title>
        <Subtitle>Name</Subtitle>
        <StyledInput
          placeholder="이름 입력"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
        />
        <Subtitle>Phone Number</Subtitle>
        <StyledInput
          placeholder="휴대폰 번호 입력"
          value={phone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPhone(e.target.value);
          }}
        />
        <Subtitle>Email Address</Subtitle>
        <StyledInput
          placeholder="이메일 입력"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
        />
        <Subtitle>Password</Subtitle>
        <StyledInput
          placeholder="비밀번호 입력 (8 ~ 16자리)"
          value={pw}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPw(e.target.value);
          }}
        />
        <Subtitle>Confirm Password</Subtitle>
        <StyledInput
          placeholder="비밀번호 확인"
          value={cpw}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setCpw(e.target.value);
          }}
        />
        <LoginButton
          onClick={async () => {
            if (pw !== cpw) {
              alert('비밀번호가 일치하지 않습니다.');
            } else {
              try {
                const response = await postSignUp({
                  email: email,
                  password: pw,
                  password_confirm: cpw,
                  name: name,
                  phone: phone,
                });

                if (response.message === '이메일, 전화번호 중복 확인 완료') {
                  localStorage.setItem('email', email);
                  localStorage.setItem('password', pw);
                  localStorage.setItem('password_confirm', cpw);
                  localStorage.setItem('name', name);
                  localStorage.setItem('phone', phone);

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
            }
          }}
        >
          Signup
        </LoginButton>
        <AuthButtonWrapper>
          <AuthButton
            onClick={() => {
              navigate('/signin');
            }}
          >
            로그인하기
          </AuthButton>
        </AuthButtonWrapper>
      </RightContent>
    </Wrapper>
  );
}

const AuthButton = styled.div`
  font-size: 13px;
  font-weight: 400;
  cursor: pointer;
`;

const AuthButtonWrapper = styled.div`
  margin-top: 35px;
  width: calc(100% - 20px);
  display: inline-flex;
  justify-content: center;
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

export default SignUpPage;
