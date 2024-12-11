import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { postSignUpLast } from '../../../api/loginApi';

const SetProfilePage = () => {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
        <Title>
          프로필 사진을
          <br />
          추가해주세요
        </Title>
        <ImageWrapper>
          <ImageLabel htmlFor="file-input">
            <img
              src={previewImage || '/images/origin.png'}
              alt="Profile Preview"
              width={217}
              height={217}
            />
          </ImageLabel>
          <input
            type="file"
            id="file-input"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          사진 추가하기
        </ImageWrapper>

        <NextButton
          onClick={async () => {
            await postSignUpLast(selectedFile);
            navigate('/logincomplete');
          }}
        >
          Next
        </NextButton>
        <SkipWrapper>
          <SkipButton
            onClick={async () => {
              await postSignUpLast(null);
              navigate('/logincomplete');
            }}
          >
            건너뛰기
          </SkipButton>
        </SkipWrapper>
      </RightContent>
    </Wrapper>
  );
};

const ImageLabel = styled.label`
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  width: calc(100% - 10px);
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: #858282;
`;

const SkipWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  width: calc(100% - 20px);
`;

const SkipButton = styled.div`
  color: #858282;
  font-size: 12px;
  margin-top: 30px;
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
  margin-top: 100px;
  cursor: pointer;
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

export default SetProfilePage;
