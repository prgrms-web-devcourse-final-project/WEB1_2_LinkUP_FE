import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

function SignUpPage() {
  const navigate = useNavigate();
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
        <StyledInput placeholder="이름 입력" />
        <Subtitle>Phone Number</Subtitle>
        <StyledInput placeholder="휴대폰 번호 입력" />
        <Subtitle>Email Address</Subtitle>
        <StyledInput placeholder="이메일 입력" />
        <Subtitle>Password</Subtitle>
        <StyledInput placeholder="비밀번호 입력 (8 ~ 16자리)" />
        <Subtitle>Confirm Password</Subtitle>
        <StyledInput placeholder="비밀번호 확인" />
        <LoginButton
          onClick={() => {
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
