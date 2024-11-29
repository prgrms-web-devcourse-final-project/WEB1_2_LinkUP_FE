import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const FindPasswordPage = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <LeftContent>
        <img
          src="/images/login7.jpg"
          alt="Login background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </LeftContent>
      <RightContent>
        <BackButton
          onClick={() => {
            navigate(-1);
          }}
        >
          <img
            src="/images/arrow-left.png"
            alt="left arrow"
            style={{ width: '20px', height: '20px' }}
          />
          Back
        </BackButton>
        <Title>비밀번호 찾기</Title>
        <Description>
          등록된 이메일 주소를 입력하고 확인 버튼을 클릭해주세요
        </Description>
        <Subtitle>email address</Subtitle>
        <StyledInput placeholder="이메일 입력" />

        <LoginButton>확인</LoginButton>
      </RightContent>
    </Wrapper>
  );
};

const BackButton = styled.div`
  margin-bottom: 35px;
  display: inline-flex;
  align-items: center;
`;

const Description = styled.div`
  margin-bottom: 20px;
  color: #a4a1aa;
  font-size: 14px;
  font-weight: 500;
  margin-top: 10px;
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

export default FindPasswordPage;
