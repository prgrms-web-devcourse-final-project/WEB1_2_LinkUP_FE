import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { ServiceTerms } from './Modal/ServiceTerms';
import { FinanceTerms } from './Modal/FinanceTerms';
import { PrivacyTerms } from './Modal/PrivacyTerms';

const TermsPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const handleViewTerms = (type: string) => {
    switch (type) {
      case 'service':
        setModalTitle('서비스 이용약관');
        setModalContent(ServiceTerms);
        break;
      case 'finance':
        setModalTitle('전자 금융거래 이용약관');
        setModalContent(FinanceTerms);
        break;
      case 'privacy':
        setModalTitle('개인정보 제공 동의');
        setModalContent(PrivacyTerms);
        break;
    }
    setShowModal(true);
  };

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
    <>
      <Wrapper>
        <LeftContent>
          <BlueOverlay />
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
          <ContentContainer>
            <LogoContainer>
              <Logo>GoodBuyUs</Logo>
            </LogoContainer>
            <Title>
              서비스 약관에
              <br />
              동의해주세요.
            </Title>

            <CheckBoxWrapper>
              <AllCheckBoxItem>
                <CustomCheckbox
                  type="checkbox"
                  checked={terms.all}
                  onChange={handleAllChange}
                  id="all"
                />
                <CheckboxLabel htmlFor="all">
                  <CheckBoxText isAll={true}>약관에 모두 동의</CheckBoxText>
                </CheckboxLabel>
              </AllCheckBoxItem>
              <Divider />

              <CheckBoxContainer>
                <CheckBoxItem>
                  <CustomCheckbox
                    type="checkbox"
                    checked={terms.age}
                    onChange={() => handleIndividualChange('age')}
                    id="age"
                  />
                  <CheckboxLabel htmlFor="age">
                    <CheckBoxText>(필수) 만 14세 이상입니다.</CheckBoxText>
                  </CheckboxLabel>
                </CheckBoxItem>
                <ViewButton></ViewButton>
              </CheckBoxContainer>

              <CheckBoxContainer>
                <CheckBoxItem>
                  <CustomCheckbox
                    type="checkbox"
                    checked={terms.service}
                    onChange={() => handleIndividualChange('service')}
                    id="service"
                  />
                  <CheckboxLabel htmlFor="service">
                    <CheckBoxText>(필수) 서비스 이용약관 동의</CheckBoxText>
                  </CheckboxLabel>
                </CheckBoxItem>
                <ViewButton onClick={() => handleViewTerms('service')}>
                  보기
                </ViewButton>
              </CheckBoxContainer>

              <CheckBoxContainer>
                <CheckBoxItem>
                  <CustomCheckbox
                    type="checkbox"
                    checked={terms.finance}
                    onChange={() => handleIndividualChange('finance')}
                    id="finance"
                  />
                  <CheckboxLabel htmlFor="finance">
                    <CheckBoxText>
                      (필수) 전자 금융거래 이용약관 동의
                    </CheckBoxText>
                  </CheckboxLabel>
                </CheckBoxItem>
                <ViewButton onClick={() => handleViewTerms('finance')}>
                  보기
                </ViewButton>
              </CheckBoxContainer>

              <CheckBoxContainer>
                <CheckBoxItem>
                  <CustomCheckbox
                    type="checkbox"
                    checked={terms.privacy}
                    onChange={() => handleIndividualChange('privacy')}
                    id="privacy"
                  />
                  <CheckboxLabel htmlFor="privacy">
                    <CheckBoxText>(필수) 개인정보 제공 동의</CheckBoxText>
                  </CheckboxLabel>
                </CheckBoxItem>
                <ViewButton onClick={() => handleViewTerms('privacy')}>
                  보기
                </ViewButton>
              </CheckBoxContainer>

              <CheckBoxItem>
                <CustomCheckbox
                  type="checkbox"
                  checked={terms.marketing}
                  onChange={() => handleIndividualChange('marketing')}
                  id="marketing"
                />
                <CheckboxLabel htmlFor="marketing">
                  <CheckBoxText>(선택) 마케팅 수신 동의</CheckBoxText>
                </CheckboxLabel>
              </CheckBoxItem>
            </CheckBoxWrapper>

            <NextButton
              disabled={
                !(terms.age && terms.service && terms.finance && terms.privacy)
              }
              onClick={() => {
                if (
                  terms.age &&
                  terms.service &&
                  terms.finance &&
                  terms.privacy
                ) {
                  navigate('/setlocation');
                } else {
                  alert('필수 항목을 모두 동의해주세요.');
                }
              }}
            >
              Next
            </NextButton>
          </ContentContainer>
        </RightContent>
      </Wrapper>
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{modalTitle}</ModalTitle>
              <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <pre>{modalContent}</pre>
            </ModalBody>
            <ModalFooter>
              <ConfirmButton onClick={() => setShowModal(false)}>
                확인
              </ConfirmButton>
            </ModalFooter>
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

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CheckBoxText = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== 'isAll',
})<{ isAll?: boolean }>`
  font-size: ${(props) => (props.isAll ? '16px' : '14px')};
  font-weight: ${(props) => (props.isAll ? '600' : '500')};
  color: ${(props) => (props.isAll ? '#34495e' : '#5d6d7e')};
`;

const CustomCheckbox = styled.input`
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #bdc3c7;
  border-radius: 4px;
  margin-right: 10px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;

  &:checked {
    background-color: #3498db;
    border-color: #3498db;
  }

  &:checked::after {
    content: '✓';
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.3);
  }
`;

const AllCheckBoxItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  padding: 10px 0;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 15px 20px;
  border-top: 1px solid #eee;
`;

const ConfirmButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const ModalBody = styled.div`
  padding: 20px;
  max-height: calc(80vh - 140px);
  overflow-y: auto;

  pre {
    white-space: pre-wrap;
    font-family: inherit;
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: #34495e;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  color: #7f8c8d;
  transition: color 0.2s ease;

  &:hover {
    color: #34495e;
  }
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #34495e;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
`;

const ModalContent = styled.div`
  background-color: white;
  width: 80%;
  max-width: 600px;
  max-height: 80vh;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
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
  backdrop-filter: blur(2px);
`;

const ViewButton = styled.div`
  font-size: 12px;
  color: #3498db;
  cursor: pointer;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: #2980b9;
    text-decoration: underline;
  }
`;

const CheckBoxWrapper = styled.div`
  margin-top: 24px;
  width: 100%;
  background-color: #f9fafc;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const CheckBoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 12px;
`;

const CheckBoxItem = styled.div`
  margin-bottom: 12px;
  display: flex;
  align-items: center;
`;

const Divider = styled.div`
  height: 1px;
  background-color: #e0e0e0;
  margin: 10px 0 15px;
  width: 100%;
`;

const NextButton = styled.button<{ disabled: boolean }>`
  background-color: ${(props) => (props.disabled ? '#bdc3c7' : '#3498db')};
  color: #fff;
  border: none;
  border-radius: 50px;
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.3s ease;
  font-weight: 600;
  letter-spacing: 1px;
  box-shadow: ${(props) =>
    props.disabled ? 'none' : '0 4px 10px rgba(52, 152, 219, 0.3)'};

  &:hover {
    background-color: ${(props) => (props.disabled ? '#bdc3c7' : '#2980b9')};
    transform: ${(props) => (props.disabled ? 'none' : 'translateY(-2px)')};
    box-shadow: ${(props) =>
      props.disabled ? 'none' : '0 6px 12px rgba(52, 152, 219, 0.4)'};
  }

  &:active {
    transform: ${(props) => (props.disabled ? 'none' : 'translateY(0)')};
    box-shadow: ${(props) =>
      props.disabled ? 'none' : '0 2px 6px rgba(52, 152, 219, 0.3)'};
  }
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #34495e;
  line-height: 1.3;
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

export default TermsPage;
