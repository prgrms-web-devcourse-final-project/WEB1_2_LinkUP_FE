import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { postSignUpNickname } from '../../../api/loginApi';
import { useUser } from '../../../context/UserContext';

const SetNicknamePage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [isValidLength, setIsValidLength] = useState(true);
  const [isValidFormat, setIsValidFormat] = useState(true);
  const { setUser } = useUser();

  const validateNickname = (value: string) => {
    setIsValidLength(value.length >= 2 && value.length <= 15);
    setIsValidFormat(/^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]+$/.test(value));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);
    validateNickname(value);
  };

  return (
    <Wrapper>
      <LeftContent>
        <BlueOverlay />
        <img
          src="/images/login5.jpeg"
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
          <Title>닉네임 설정</Title>
          <Subtitle>굿바이어스에서 사용할 닉네임을 정해주세요</Subtitle>

          <FormContainer>
            <InputGroup>
              <StyledInput
                placeholder="닉네임을 입력해주세요"
                value={nickname}
                onChange={handleInputChange}
                maxLength={15}
              />
              <NicknameCondition isValid={isValidLength}>
                최소 2자 이상 ~ 15자 이내
              </NicknameCondition>
              <NicknameCondition isValid={isValidFormat}>
                띄어쓰기 및 특수문자 사용 불가
              </NicknameCondition>
            </InputGroup>
          </FormContainer>

          <LoginButton
            onClick={async () => {
              if (isValidLength && isValidFormat) {
                try {
                  const response = await postSignUpNickname({
                    nickname: nickname,
                  });

                  if (response.message === '닉네임 중복 확인 완료') {
                    setUser({ nickname: nickname });
                    navigate('/setprofile');
                  } else {
                    alert('닉네임이 중복입니다.');
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
              } else {
                alert('닉네임 조건을 만족시켜 주세요.');
              }
            }}
          >
            Next
          </LoginButton>
        </ContentContainer>
      </RightContent>
    </Wrapper>
  );
};

const NicknameCondition = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isValid',
})<{ isValid: boolean }>`
  color: ${({ isValid }) => (isValid ? '#7f8c8d' : '#e74c3c')};
  margin-top: 6px;
  font-size: 12px;
  font-weight: 500;
`;

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

const FormContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const InputGroup = styled.div`
  margin-bottom: 16px;
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

export default SetNicknamePage;
