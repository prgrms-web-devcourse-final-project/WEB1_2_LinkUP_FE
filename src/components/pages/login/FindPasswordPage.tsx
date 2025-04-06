import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { postFindPassword } from '../../../api/loginApi';

const FindPasswordPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [email, setEmail] = useState<string>('');

  return (
    <>
      <Wrapper>
        <LeftContent>
          <BlueOverlay />
          <img
            src="/images/login7.jpg"
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
            </FormContainer>
            <LoginButton
              onClick={async () => {
                try {
                  const response = await postFindPassword({ email });

                  if (
                    response.message ===
                    '비밀번호 재설정 링크가 이메일로 전송되었습니다.'
                  ) {
                    setIsSuccess(true);
                    setShowModal(true);
                  } else {
                    alert('이메일 주소를 다시 확인해주세요.');
                  }
                } catch (error) {
                  console.error(error);
                  alert('이메일 주소를 다시 확인해주세요.');
                }
              }}
            >
              확인
            </LoginButton>
          </ContentContainer>
        </RightContent>
      </Wrapper>
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalText>
              비밀번호 재설정 링크가 이메일로 전송되었습니다.
            </ModalText>
            <ModalButton
              onClick={() => {
                setShowModal(false);
                if (isSuccess) {
                  navigate('/resetpassword');
                }
              }}
            >
              확인
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
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

const ModalButton = styled.button`
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 10px 25px;
  cursor: pointer;
  width: 120px;
  height: 40px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  transition: all 0.3s ease;
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

const ModalText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #34495e;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const BackButton = styled.div`
  margin-bottom: 35px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  font-weight: 600;
  color: #34495e;
  transition: all 0.3s ease;

  &:hover {
    color: #3498db;
  }
`;

const Description = styled.div`
  margin-bottom: 20px;
  color: #7f8c8d;
  font-size: 14px;
  font-weight: 500;
  margin-top: 10px;
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

export default FindPasswordPage;
