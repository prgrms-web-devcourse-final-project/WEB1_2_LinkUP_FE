import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import GS from './GS';
import Sidemenu from './SideMenu';
import PasswordModal from './Modal/PasswordModal';
import LogoutModal from './Modal/LogoutModal';
import WithdrawModal from './Modal/WithdrawModal';
import {
  getUser,
  putEditProfile,
  putChangeNickname,
} from '../../../api/mypageApi';
import { PageTitle } from './OrderListPage';
import default_profile from '../../../../public/images/origin.png';

const SettingPage = () => {
  const [number, setNumber] = useState<string | undefined>();
  const [nickname, setNickname] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);
  const [newNickname, setNewNickname] = useState('');

  const formatPhoneNumber = (number: string) => {
    return number
      .replace(/\D/g, '') // 숫자 이외 제거
      .replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3'); // 010-XXXX-XXXX 형식 변환
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        setName(response.name);
        setNickname(response.nickname);
        setNumber(formatPhoneNumber(response.phoneNum));
        setAddress(response.address);
      } catch (error) {
        console.error('failed', error);
      }
    };
    fetchUser();
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async () => {
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append('profile', selectedFile);
      await putEditProfile(formData);
      setIsProfileModalOpen(false);
      setPreviewImage(null);
      setSelectedFile(null);
      window.dispatchEvent(new Event('profileUpdated'));
    } catch (error) {
      console.error('프로필 이미지 업데이트 실패:', error);
    }
  };

  const handleSetDefaultImage = async () => {
    try {
      // 기본 이미지 파일을 가져옵니다
      const response = await fetch(default_profile);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append('profile', blob, 'default_profile.png');

      await putEditProfile(formData);
      setIsProfileModalOpen(false);
      setPreviewImage(null);
      setSelectedFile(null);
      window.dispatchEvent(new Event('profileUpdated'));
    } catch (error) {
      console.error('기본 이미지 설정 실패:', error);
    }
  };

  const handleNicknameChange = async () => {
    try {
      await putChangeNickname(newNickname);
      setNickname(newNickname);
      setIsNicknameModalOpen(false);
      setNewNickname('');
      window.dispatchEvent(new Event('profileUpdated'));
    } catch (error) {
      console.error('닉네임 변경 실패:', error);
    }
  };

  return (
    <GS.Wrapper>
      <Sidemenu />
      <GS.Content>
        <PageTitle>내 계정 정보</PageTitle>
        <AddressList>
          <AddressItem>
            <AddressInfo>
              <NameWrapper>
                <Name>{name}</Name>
                <Nickname>{nickname}</Nickname>
              </NameWrapper>
              <Details>{address}</Details>
              <Phone>{number}</Phone>
            </AddressInfo>

            <EditButton onClick={() => setIsNicknameModalOpen(true)}>
              수정
            </EditButton>
          </AddressItem>
        </AddressList>

        <PasswordWrapper>
          <Title>프로필 변경</Title>
          <PasswordButton onClick={() => setIsProfileModalOpen(true)}>
            프로필 이미지 변경하기
          </PasswordButton>
        </PasswordWrapper>

        <PasswordWrapper>
          <Title>비밀번호 변경</Title>
          <PasswordButton
            onClick={() => {
              setIsPasswordModalOpen(true);
            }}
          >
            비밀번호 변경하기
          </PasswordButton>
        </PasswordWrapper>

        <AuthWrapper>
          <AuthButton
            onClick={() => {
              setIsLogoutModalOpen(true);
            }}
          >
            로그아웃
          </AuthButton>
          <AuthButton
            className="withdraw"
            onClick={() => {
              setIsWithdrawModalOpen(true);
            }}
          >
            회원탈퇴
          </AuthButton>
        </AuthWrapper>

        {isPasswordModalOpen && (
          <PasswordModal
            onClose={() => {
              setIsPasswordModalOpen(false);
            }}
          />
        )}
        {isLogoutModalOpen && (
          <LogoutModal
            onClose={() => {
              setIsLogoutModalOpen(false);
            }}
          />
        )}
        {isWithdrawModalOpen && (
          <WithdrawModal
            onClose={() => {
              setIsWithdrawModalOpen(false);
            }}
          />
        )}

        {isProfileModalOpen && (
          <ProfileModal onClick={() => setIsProfileModalOpen(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalTitle>프로필 이미지 변경</ModalTitle>
              <PreviewContainer>
                {previewImage ? (
                  <PreviewImage src={previewImage} alt="프로필 미리보기" />
                ) : (
                  <DefaultImage>
                    <img src={default_profile} alt="기본 프로필" />
                  </DefaultImage>
                )}
              </PreviewContainer>
              <ButtonContainer>
                <FileInput
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="profile-image-upload"
                />
                <FileLabel htmlFor="profile-image-upload">
                  이미지 선택
                </FileLabel>
                <DefaultButton onClick={handleSetDefaultImage}>
                  기본 이미지로 설정
                </DefaultButton>
                <ButtonRow>
                  <CancelButton onClick={() => setIsProfileModalOpen(false)}>
                    취소
                  </CancelButton>
                  <SaveButton
                    onClick={handleSaveProfile}
                    disabled={!selectedFile}
                  >
                    저장하기
                  </SaveButton>
                </ButtonRow>
              </ButtonContainer>
            </ModalContent>
          </ProfileModal>
        )}

        {isNicknameModalOpen && (
          <ProfileModal onClick={() => setIsNicknameModalOpen(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalTitle>닉네임 변경</ModalTitle>
              <CurrentNickname>현재 닉네임: {nickname}</CurrentNickname>
              <InputContainer>
                <Input
                  type="text"
                  value={newNickname}
                  onChange={(e) => setNewNickname(e.target.value)}
                  placeholder="새 닉네임을 입력하세요"
                />
              </InputContainer>
              <ButtonRow>
                <CancelButton onClick={() => setIsNicknameModalOpen(false)}>
                  취소
                </CancelButton>
                <SaveButton
                  onClick={handleNicknameChange}
                  disabled={!newNickname.trim()}
                >
                  저장하기
                </SaveButton>
              </ButtonRow>
            </ModalContent>
          </ProfileModal>
        )}
      </GS.Content>
    </GS.Wrapper>
  );
};

const AddressList = styled.div`
  margin-top: 20px;
  background-color: #f0f7ff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const AddressItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e2e8f0;
  transition: background-color 0.2s;
  position: relative;
  gap: 8px;

  &:hover {
    background-color: #e6f0ff;
  }
`;

const AddressInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px; /* 이름과 닉네임 간격 */
`;

const Name = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #2d3748;
`;

const Nickname = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  background-color: #3182ce;
  padding: 3px 8px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  text-align: center;
`;

const Details = styled.div`
  font-size: 14px;
  color: #4a5568;
  margin-top: 5px;
  display: flex;
  align-items: center;

  &:before {
    content: '📍';
    margin-right: 6px;
    font-size: 12px;
  }
`;

const Phone = styled.div`
  font-size: 14px;
  color: #4a5568;
  margin-top: 5px;
  display: flex;
  align-items: center;

  &:before {
    content: '📱';
    margin-right: 6px;
    font-size: 12px;
  }
`;

const EditButton = styled.button`
  background-color: transparent;
  color: #3182ce;
  border: 1px solid #3182ce;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background-color: #3182ce;
    color: white;
  }
`;

const AuthButton = styled.div`
  margin-top: 16px;
  cursor: pointer;
  color: #3182ce;
  font-size: 14px;
  padding: 8px 0;
  transition: color 0.2s;

  &:hover {
    color: #1a56db;
    text-decoration: underline;
  }

  &.withdraw {
    color: #e53e3e;

    &:hover {
      color: #c53030;
    }
  }
`;

const AuthWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #e2e8f0;
  padding-top: 20px;
`;

const PasswordButton = styled.div`
  margin-top: 10px;
  background-color: #3182ce;
  color: #fff;
  border-radius: 6px;
  padding: 12px 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #2c5282;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const PasswordWrapper = styled.div`
  margin-top: 30px;
  background-color: #f0f7ff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 10px;
`;

const ProfileModal = styled.div<{ onClose?: () => void }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #2d3748;
`;

const PreviewContainer = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 auto 20px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f7fafc;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DefaultImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
`;

const FileInput = styled.input`
  display: none;
`;

const FileLabel = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  background-color: #3182ce;
  color: #fff;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 90%;

  &:hover {
    background-color: #2c5282;
  }
`;

const DefaultButton = styled.button`
  padding: 12px 20px;
  background-color: #e2e8f0;
  color: #4a5568;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  border: none;

  &:hover {
    background-color: #cbd5e0;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
`;

const CancelButton = styled.button`
  padding: 12px 20px;
  background-color: #e2e8f0;
  color: #4a5568;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  border: none;

  &:hover {
    background-color: #cbd5e0;
  }
`;

const SaveButton = styled.button`
  padding: 12px 20px;
  background-color: #3182ce;
  color: #fff;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  border: none;

  &:hover {
    background-color: #2c5282;
  }

  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
`;

const InputContainer = styled.div`
  margin: 20px 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.1);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const CurrentNickname = styled.div`
  font-size: 14px;
  color: #4a5568;
  margin-bottom: 16px;
  padding: 12px;
  background-color: #f7fafc;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  width: 100%;
  box-sizing: border-box;
`;

export default SettingPage;
