import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const TermsPage = () => {
  const navigate = useNavigate();

  const [terms, setTerms] = useState({
    all: false,
    age: false,
    service: false,
    finance: false,
    privacy: false,
    marketing: false,
  });

  const handleAllChange = () => {
    const newValue = !terms.all;
    setTerms({
      all: newValue,
      age: newValue,
      service: newValue,
      finance: newValue,
      privacy: newValue,
      marketing: newValue,
    });
  };

  const handleIndividualChange = (key: keyof typeof terms) => {
    setTerms((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      updated.all =
        updated.age &&
        updated.service &&
        updated.finance &&
        updated.privacy &&
        updated.marketing;
      return updated;
    });
  };

  return (
    <Wrapper>
      <LeftContent>
        <img
          src="/images/login2.jpg"
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
          서비스 약관에
          <br />
          동의해주세요.
        </Title>

        <CheckBoxWrapper>
          <CheckBoxItem>
            <input
              type="checkbox"
              checked={terms.all}
              onChange={handleAllChange}
            />
            약관에 모두 동의
          </CheckBoxItem>
          <Divider />
          <CheckBoxConatiner>
            <CheckBoxItem>
              <input
                type="checkbox"
                checked={terms.age}
                onChange={() => handleIndividualChange('age')}
              />
              (필수) 만 14세 이상입니다.
            </CheckBoxItem>
            <ViewButton>보기</ViewButton>
          </CheckBoxConatiner>
          <CheckBoxConatiner>
            <CheckBoxItem>
              <input
                type="checkbox"
                checked={terms.service}
                onChange={() => handleIndividualChange('service')}
              />
              (필수) 서비스 이용약관 동의
            </CheckBoxItem>
            <ViewButton>보기</ViewButton>
          </CheckBoxConatiner>
          <CheckBoxConatiner>
            <CheckBoxItem>
              <input
                type="checkbox"
                checked={terms.finance}
                onChange={() => handleIndividualChange('finance')}
              />
              (필수) 전자 금융거래 이용약관 동의
            </CheckBoxItem>
            <ViewButton>보기</ViewButton>
          </CheckBoxConatiner>
          <CheckBoxConatiner>
            <CheckBoxItem>
              <input
                type="checkbox"
                checked={terms.privacy}
                onChange={() => handleIndividualChange('privacy')}
              />
              (필수) 개인정보 제공 동의
            </CheckBoxItem>
            <ViewButton>보기</ViewButton>
          </CheckBoxConatiner>
          <CheckBoxItem>
            <input
              type="checkbox"
              checked={terms.marketing}
              onChange={() => handleIndividualChange('marketing')}
            />
            (선택) 마케팅 수신 동의
          </CheckBoxItem>
        </CheckBoxWrapper>

        <LoginButton
          onClick={() => {
            if (terms.age && terms.service && terms.finance && terms.privacy) {
              navigate('/setlocation');
            } else {
              alert('필수 항목을 모두 동의해주세요.');
            }
          }}
        >
          Next
        </LoginButton>
      </RightContent>
    </Wrapper>
  );
};

const ViewButton = styled.div`
  font-size: 10px;
  color: #737171;
  cursor: pointer;
`;

const CheckBoxWrapper = styled.div`
  margin-top: 20px;
  width: calc(100% - 20px);
`;

const CheckBoxConatiner = styled.div`
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
`;

const CheckBoxItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  font-size: 14px;

  input {
    margin-right: 10px;
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: #ddd;
  margin: 15px 0;
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

export default TermsPage;
