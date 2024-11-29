import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const LoginCompletePage = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <LeftContent>
        <img
          src="/images/login-compl.jpg"
          alt="Login background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </LeftContent>
      <RightContent>
        <Title>회원가입 완료!</Title>
        <ImageWrapper>
          <img src={'/images/check.png'} alt="check" width={120} height={120} />
        </ImageWrapper>
        <DescWrapper>
          <Desc>굿바이어스에 오신것을 환영합니다.</Desc>
          <Desc>공동구매를 시작해보세요.</Desc>
        </DescWrapper>
        <NextButton
          onClick={() => {
            navigate('/');
          }}
        >
          메인으로 가기
        </NextButton>
      </RightContent>
    </Wrapper>
  );
};

const Desc = styled.div`
  color: #302f2f;
`;

const DescWrapper = styled.div`
  margin-top: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - 20px);
  flex-direction: column;
  gap: 10px;
`;

const ImageWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  width: calc(100% - 10px);
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: #858282;
  margin-top: 50px;
`;

const NextButton = styled.div`
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  width: calc(100% - 20px);
  height: 35px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
  cursor: pointer;
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

export default LoginCompletePage;
