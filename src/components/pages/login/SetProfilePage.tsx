import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { postSignUpLast } from '../../../api/loginApi';
import { useUser } from '../../../context/UserContext';

const SetProfilePage = () => {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { user } = useUser();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  return (
    <Wrapper>
      <LeftContent>
        <BlueOverlay />
        <img
          src="/images/login3.jpg"
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
          <Title>프로필 설정</Title>
          <Subtitle>프로필 사진을 추가해주세요</Subtitle>

          <ImageWrapper>
            <ProfileImageContainer>
              <ImageLabel htmlFor="file-input">
                <ProfileImage
                  src={previewImage || '/images/origin.png'}
                  alt="Profile Preview"
                />
                <UploadOverlay>
                  <UploadText>사진 추가하기</UploadText>
                </UploadOverlay>
              </ImageLabel>
            </ProfileImageContainer>
            <input
              type="file"
              id="file-input"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </ImageWrapper>

          <LoginButton
            onClick={async () => {
              await postSignUpLast(user, selectedFile);
              navigate('/logincomplete');
            }}
          >
            Next
          </LoginButton>

          <AuthButtonWrapper>
            <AuthButton
              onClick={async () => {
                await postSignUpLast(user, null);
                navigate('/logincomplete');
              }}
            >
              건너뛰기
            </AuthButton>
          </AuthButtonWrapper>
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

const ProfileImageContainer = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 16px rgba(52, 152, 219, 0.3);
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UploadOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 8px 0;
  background-color: rgba(52, 152, 219, 0.8);
  color: white;
  text-align: center;
  transition: opacity 0.3s;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;

const UploadText = styled.span`
  font-size: 12px;
  font-weight: 600;
`;

const ImageLabel = styled.label`
  cursor: pointer;
  display: block;
  width: 100%;
  height: 100%;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const AuthButtonWrapper = styled.div`
  margin-top: 16px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AuthButton = styled.span`
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  color: #7f8c8d;
  transition: color 0.3s ease;

  &:hover {
    color: #3498db;
    text-decoration: underline;
  }
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

export default SetProfilePage;
