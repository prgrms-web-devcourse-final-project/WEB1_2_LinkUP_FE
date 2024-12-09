import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import GS from './GS';
import Sidemenu from './SideMenu';
import { SettingPageData } from './mockData';
import PasswordModal from './Modal/PasswordModal';
import LogoutModal from './Modal/LogoutModal';
import WithdrawModal from './Modal/WithdrawModal';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { getUser, putEditProfile } from '../../../api/mypageApi';

const SettingPage = () => {
  const [addressList, setAddressList] = useState(SettingPageData.addressList);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const [newName, setNewName] = useState('');
  const [phoneFirst, setPhoneFirst] = useState('');
  const [phoneMiddle, setPhoneMiddle] = useState('');
  const [phoneLast, setPhoneLast] = useState('');
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const postcodeScriptUrl =
    'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  const open = useDaumPostcodePopup(postcodeScriptUrl);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleComplete = (data: any) => {
    setNewAddress(data.zonecode + ' ' + data.jibunAddress);
  };

  const handleAddAddress = () => {
    if (newName && phoneFirst && phoneMiddle && phoneLast && newAddress) {
      const fullPhone = `${phoneFirst}-${phoneMiddle}-${phoneLast}`;
      addressList.push({
        id: Date.now(),
        name: newName,
        address: newAddress,
        phone: fullPhone,
      });
      setNewName('');
      setPhoneFirst('');
      setPhoneMiddle('');
      setPhoneLast('');
      setNewAddress('');
      setIsAddingNewAddress(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setProfileImage(reader.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAddress = (id: number) => {
    setAddressList((prevList) => prevList.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();

        setProfileImage(response.profile);
      } catch (error) {
        console.error('failed', error);
      }
    };
    fetchUser();
  }, []);

  return (
    <GS.Wrapper>
      <Sidemenu />
      <GS.Content>
        <ProfileWrapper>
          <img
            src={profileImage || '/images/origin.png'}
            alt="Profile"
            width={80}
            height={80}
            onClick={() => document.getElementById('fileInput')?.click()}
            style={{ cursor: 'pointer' }}
          />
          <EditProfileButton
            onClick={async () => {
              if (!profileImage) {
                alert('이미지를 먼저 업로드해주세요.');
                return;
              }

              try {
                const blob = await fetch(profileImage).then((res) =>
                  res.blob()
                );
                const file = new File([blob], 'profile.jpg', {
                  type: blob.type,
                });

                await putEditProfile(file);
                alert('프로필이 성공적으로 업데이트되었습니다.');
              } catch (error) {
                alert('프로필 업데이트 중 오류가 발생했습니다.');
                console.error('API 오류:', error);
              }
            }}
          >
            Edit Profile
          </EditProfileButton>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
        </ProfileWrapper>

        <NicknameWrapper>
          <Title>닉네임 변경</Title>
          <NicknameInput placeholder="최소 2자 이상 ~ 15자 이내, 띄어쓰기 및 특수문자 사용 불가" />
          <NicknameButton>변경하기</NicknameButton>
        </NicknameWrapper>
        <AddressWrapper>
          <Title>배송지 주소 변경</Title>
          {isAddingNewAddress ? (
            <NewAddressForm>
              <InputRow>
                <InputGroup>
                  <InputLabel>이름</InputLabel>
                  <StyledInput
                    placeholder="이름 입력"
                    value={newName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewName(e.target.value)
                    }
                  />
                </InputGroup>

                <InputGroup>
                  <InputLabel>휴대폰 번호</InputLabel>
                  <PhoneInputGroup>
                    <PhoneInput
                      placeholder="010"
                      value={phoneFirst}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPhoneFirst(e.target.value)
                      }
                      maxLength={3}
                    />
                    <Separator>-</Separator>
                    <PhoneInput
                      placeholder="0000"
                      value={phoneMiddle}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPhoneMiddle(e.target.value)
                      }
                      maxLength={4}
                    />
                    <Separator>-</Separator>
                    <PhoneInput
                      placeholder="0000"
                      value={phoneLast}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPhoneLast(e.target.value)
                      }
                      maxLength={4}
                    />
                  </PhoneInputGroup>
                </InputGroup>
              </InputRow>

              <AddressRow>
                <InputGroup>
                  <InputLabel>주소</InputLabel>
                  <AddressInputGroup>
                    <AddressSearchButton
                      onClick={() => {
                        open({ onComplete: handleComplete });
                      }}
                    >
                      주소 검색
                    </AddressSearchButton>
                    {newAddress && (
                      <AddressPreview>{newAddress}</AddressPreview>
                    )}
                  </AddressInputGroup>
                </InputGroup>
              </AddressRow>

              <ButtonGroup>
                <CompleteButton onClick={handleAddAddress}>완료</CompleteButton>
                <CancelButton onClick={() => setIsAddingNewAddress(false)}>
                  취소
                </CancelButton>
              </ButtonGroup>
            </NewAddressForm>
          ) : (
            <AddAddressButton onClick={() => setIsAddingNewAddress(true)}>
              Add New Address
            </AddAddressButton>
          )}
          <AddressList>
            {addressList?.map((item) => (
              <AddressItem key={item.id}>
                <AddressInfo>
                  <Name>{item.name}</Name>
                  <Details>{item.address}</Details>
                  <Phone>{item.phone}</Phone>
                </AddressInfo>
                <Actions>
                  <DeleteButton onClick={() => handleDeleteAddress(item.id)}>
                    Delete
                  </DeleteButton>
                </Actions>
              </AddressItem>
            ))}
          </AddressList>
        </AddressWrapper>
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
      </GS.Content>
    </GS.Wrapper>
  );
};

const NewAddressForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Separator = styled.span`
  color: #000;
  font-size: 16px;
`;

const PhoneInput = styled.input`
  width: 60px;
  height: 25px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 13px;
  padding: 5px 10px;
  box-shadow: none;
  outline: none;
  transition: border-color 0.3s ease;
  text-align: center;

  &:focus {
    border-color: #000;
  }
`;

const PhoneInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InputLabel = styled.div`
  font-size: 12px;
  color: #131118;
  margin-top: 15px;
  margin-bottom: 5px;
`;
const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-end;
`;

const AddressSearchButton = styled.div`
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  padding: 5px 15px;
  text-align: center;
  cursor: pointer;
  width: 90px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddressPreview = styled.div`
  margin-top: 5px;
  font-size: 12px;
  color: #555;
`;

const AddressInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const AddressRow = styled.div``;

const CompleteButton = styled.div`
  display: inline-flex;
  justify-content: center;
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px 20px;
  text-align: center;
  cursor: pointer;
  flex: 1;
  max-width: 175px;

  &:hover {
    background-color: #ddd;
  }
`;

const CancelButton = styled.div`
  display: inline-flex;
  justify-content: center;
  background-color: #ffeded;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
  padding: 10px 20px;
  text-align: center;
  cursor: pointer;
  color: #d9534f;
  flex: 1;
  max-width: 175px;

  &:hover {
    background-color: #f8d7da;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  width: 350px;
`;
const DeleteButton = styled.div`
  display: inline-flex;
  justify-content: center;
  background-color: #ffeded;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  color: #d9534f;

  &:hover {
    background-color: #f8d7da;
  }
`;

const AddressList = styled.div`
  margin-top: 20px;
`;

const AddressItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const AddressInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const Details = styled.div`
  font-size: 12px;
  color: #555;
  margin-top: 5px;
`;

const Phone = styled.div`
  font-size: 12px;
  color: #555;
  margin-top: 5px;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const AuthButton = styled.div`
  margin-top: 20px;
  cursor: pointer;
`;

const AuthWrapper = styled.div`
  margin-top: 10px;
`;

const PasswordButton = styled.div`
  margin-top: 10px;
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  padding: 10px 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const PasswordWrapper = styled.div`
  margin-top: 30px;
`;

const AddAddressButton = styled.div`
  margin-top: 10px;
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  padding: 10px 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const AddressWrapper = styled.div`
  margin-top: 30px;
`;

const StyledInput = styled.input`
  width: 150px;
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

const NicknameButton = styled.div`
  margin-top: 10px;
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  padding: 10px 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 15px;
`;

const NicknameInput = styled(StyledInput)`
  width: 350px;
`;

const Title = styled.div`
  font-size: 12px;
  color: #131118;
`;

const NicknameWrapper = styled.div`
  margin-top: 20px;
`;

const EditProfileButton = styled.div`
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  padding: 10px 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ProfileWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export default SettingPage;
