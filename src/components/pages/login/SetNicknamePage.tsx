import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const SetNicknamePage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [isValidLength, setIsValidLength] = useState(true);
  const [isValidFormat, setIsValidFormat] = useState(true);

  const validateNickname = (value: string) => {
    setIsValidLength(value.length >= 2 && value.length <= 15);
    setIsValidFormat(/^[가-힣a-zA-Z0-9]+$/.test(value));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);
    validateNickname(value);
  };

  return (
    <Wrapper>
      <LeftContent>
        <img
          src="/images/login5.jpeg"
          alt="Login background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </LeftContent>
      <RightContent>
        <Title>
          굿바이어스에서 사용할
          <br />
          닉네임을 정해주세요
        </Title>
        <StyledInput
          placeholder="닉네임을 입력해주세요"
          value={nickname}
          onChange={handleInputChange}
        />
        <NicknameCondition isValid={isValidLength}>
          최소 2자 이상 ~ 15자 이내
        </NicknameCondition>
        <NicknameCondition isValid={isValidFormat}>
          띄어쓰기 및 특수문자 사용 불가
        </NicknameCondition>
        <NextButton
          onClick={() => {
            if (isValidLength && isValidFormat) {
              navigate('/setprofile');
            } else {
              alert('닉네임 조건을 만족시켜 주세요.');
            }
          }}
        >
          Next
        </NextButton>
      </RightContent>
    </Wrapper>
  );
};

const NicknameCondition = styled.div<{ isValid: boolean }>`
  color: ${({ isValid }) => (isValid ? '#858282' : '#EF2626')};
  margin-top: 20px;
  font-size: 12px;
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
  margin-top: 235px;
  cursor: pointer;
`;

const StyledInput = styled.input`
  width: calc(100% - 42px);
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

export default SetNicknamePage;
