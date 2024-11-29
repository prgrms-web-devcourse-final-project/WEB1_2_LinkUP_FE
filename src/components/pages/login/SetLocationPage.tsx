import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function SetLocationPage() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <LeftContent>
        <img
          src="/images/login10.jpg"
          alt="Login background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </LeftContent>
      <RightContent>
        <Title>
          우리동네를 인증하고
          <br />
          공동구매를 시작하세요
        </Title>
        <Subtitle>위치서비스를 허용해주세요</Subtitle>

        <LoginButton
          onClick={() => {
            navigate('/setnickname');
          }}
        >
          Next
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

export default SetLocationPage;
