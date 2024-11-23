import React from 'react';
import { styled } from 'styled-components';
import GS from './GS';
import Sidemenu from './SideMenu';

const SettingPage = () => {
  const { addressList } = mockData;

  return (
    <GS.Wrapper>
      <Sidemenu />
      <GS.Content>
        <ProfileWrapper>
          <img src="/images/origin.png" width={80} height={80} />
          <EditProfileButton>Edit Profile</EditProfileButton>
        </ProfileWrapper>
        <NicknameWrapper>
          <Title>닉네임 변경</Title>
          <StyledInput placeholder="최소 2자 이상 ~ 15자 이내, 띄어쓰기 및 특수문자 사용 불가" />
        </NicknameWrapper>
        <AddressWrapper>
          <Title>배송지 주소 변경</Title>
          <AddAddressButton>Add New Address</AddAddressButton>
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
          <PasswordButton>비밀번호 변경하기</PasswordButton>
        </PasswordWrapper>
        <AuthWrapper>
          <AuthButton>로그아웃</AuthButton>
          <AuthButton>회원탈퇴</AuthButton>
        </AuthWrapper>
      </GS.Content>
    </GS.Wrapper>
  );
};

const mockData = {
  addressList: [
    {
      id: 1,
      name: 'Robert Fox',
      address: '4517 Washington Ave. Manchester, Kentucky 39495',
      phone: '(209) 555-0104',
    },
    {
      id: 2,
      name: 'John Willions',
      address: '3891 Ranchview Dr. Richardson, California 62639',
      phone: '(270) 555-0117',
    },
    {
      id: 3,
      name: 'Alexa Johnson',
      address: '4517 Washington Ave. Manchester, Kentucky 39495',
      phone: '(208) 555-0112',
    },
  ],
};

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