import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { postFindPassword } from '../../../api/loginApi';

const FindPasswordPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState<string>('');

  return (
    <>
      <Wrapper>
        <LeftContent>
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
          <StyledInput
            placeholder="이메일 입력"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
          />
          <LoginButton
            onClick={async () => {
              setShowModal(true);
              const response = await postFindPassword({ email: email });
              if (
                response.message ===
                '비밀번호 재설정 링크가 이메일로 전송되었습니다.'
              ) {
                navigate('/resetpassword');
              }
            }}
          >
            확인
          </LoginButton>
        </RightContent>
      </Wrapper>
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalText>이메일을 확인해주세요</ModalText>
            <ModalButton onClick={() => setShowModal(false)}>확인</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

const ModalButton = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px 20px;
  cursor: pointer;
  width: 100px;
  height: 35px;
  font-size: 14px;

  &:hover {
    opacity: 0.9;
  }
`;

const ModalText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;
const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
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
