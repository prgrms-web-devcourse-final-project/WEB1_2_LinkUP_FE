import React, { useState } from 'react';
import { styled } from 'styled-components';
import GS from './GS';
import Sidemenu from './SideMenu';
import { SettingPageData } from './mockData';
import PasswordModal from './Modal/PasswordModal';
import LogoutModal from './Modal/LogoutModal';
import WithdrawModal from './Modal/WithdrawModal';
import { useDaumPostcodePopup } from 'react-daum-postcode';

const SettingPage = () => {
  const { addressList } = SettingPageData;
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
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
    if (newName && newPhone && newAddress) {
      addressList.push({
        id: Date.now(),
        name: newName,
        address: newAddress,
        phone: newPhone,
      });
      setNewName('');
      setNewPhone('');
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
          />
          <EditProfileButton
            onClick={() => document.getElementById('fileInput')?.click()}
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
          <StyledInput placeholder="최소 2자 이상 ~ 15자 이내, 띄어쓰기 및 특수문자 사용 불가" />
          <NicknameButton>변경하기</NicknameButton>
        </NicknameWrapper>
        <AddressWrapper>
          <Title>배송지 주소 변경</Title>
          {isAddingNewAddress ? (
            <NewAddressForm>
              <StyledInput
                placeholder="이름 입력"
                value={newName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewName(e.target.value)
                }
              />
              <StyledInput
                placeholder="핸드폰 번호 입력"
                value={newPhone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewPhone(e.target.value)
                }
              />
              <AddressSearchButton
                onClick={() => {
                  open({ onComplete: handleComplete });
                }}
              >
                주소 검색
              </AddressSearchButton>
              {newAddress && <AddressPreview>{newAddress}</AddressPreview>}
              <CompleteButton onClick={handleAddAddress}>완료</CompleteButton>
              <CancelButton onClick={() => setIsAddingNewAddress(false)}>
                취소
              </CancelButton>
            </NewAddressForm>
          ) : (
            <AddAddressButton onClick={() => setIsAddingNewAddress(true)}>
              Add New Address
            </AddAddressButton>
          )}
          <AddressList>
            {addressList.map((item) => (
              <AddressItem key={item.id}>
                <AddressInfo>
                  <Name>{item.name}</Name>
                  <Details>{item.address}</Details>
                  <Phone>{item.phone}</Phone>
                </AddressInfo>
                <Actions>
                  <EditButton>Edit</EditButton>
                  <DeleteButton>Delete</DeleteButton>
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
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AddressSearchButton = styled.div`
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  padding: 10px 20px;
  text-align: center;
  cursor: pointer;
  width: 350px;
`;

const AddressPreview = styled.div`
  margin-top: 5px;
  font-size: 12px;
  color: #555;
`;

const CompleteButton = styled.div`
  background-color: green;
  color: #fff;
  border-radius: 5px;
  padding: 10px 20px;
  text-align: center;
  cursor: pointer;
  width: 350px;
`;

const CancelButton = styled.div`
  background-color: red;
  color: #fff;
  border-radius: 5px;
  padding: 10px 20px;
  text-align: center;
  cursor: pointer;
  width: 350px;
`;

const EditButton = styled.div`
  display: inline-flex;
  justify-content: center;
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
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
  margin-top: 10px;
  width: 350px;
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
