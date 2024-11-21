import React from 'react';
import { styled } from 'styled-components';

const ResetPasswordPage = () => {
  return (
    <Wrapper>
      <LeftContent>Image</LeftContent>
      <RightContent>
        <Title>비밀번호 재설정</Title>
        <Subtitle>password</Subtitle>
        <StyledInput placeholder="비밀번호 입력 (8 ~ 16자리)" />
        <Subtitle>confirm password</Subtitle>
        <StyledInput placeholder="비밀번호 확인" />
        <LoginButton>Confirm</LoginButton>
      </RightContent>
    </Wrapper>
  );
};

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

export default ResetPasswordPage;
