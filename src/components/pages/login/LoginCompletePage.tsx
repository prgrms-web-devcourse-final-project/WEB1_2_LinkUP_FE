import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const LoginCompletePage = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <LeftContent>
        <BlueOverlay />
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
        <ContentContainer>
          <LogoContainer>
            <Logo>GoodBuyUs</Logo>
          </LogoContainer>
          <Title>회원가입 완료!</Title>
          <ImageWrapper>
            <img
              src={'/images/check.png'}
              alt="check"
              width={120}
              height={120}
            />
          </ImageWrapper>
          <DescWrapper>
            <Desc>
              <B>GoodBuyUs</B>에 오신것을 환영합니다.
            </Desc>
            <Desc>공동구매를 시작해보세요.</Desc>
          </DescWrapper>
          <NextButton
            onClick={() => {
              navigate('/');
            }}
          >
            메인으로 가기
          </NextButton>
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

const Desc = styled.div`
  color: #34495e;
  font-size: 16px;
  font-weight: 500;
`;

const DescWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const NextButton = styled.div`
  background-color: #3498db;
  color: #fff;
  border-radius: 50px;
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
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
const B = styled.b`
  color: #3498db;
`;
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #fff;
`;

export default LoginCompletePage;
