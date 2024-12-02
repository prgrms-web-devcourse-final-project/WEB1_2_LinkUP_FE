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
            objectFit: 'contain',
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
            const staticFile = new File(
              ['This is a static file content'],
              'profile.txt',
              {
                type: 'text/plain',
              }
            );
            await postSignUp({
              email: email,
              password: pw,
              password_confirm: cpw,
              nickname: name,
              name: name,
              phone: phone,
              profile: staticFile,
              address: '',
            });
            navigate('/termsandservice');
          }}
        >
          Signup
        </LoginButton>
      </RightContent>
    </Wrapper>
  );
}

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
