import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import GS from './GS';
import Sidemenu from './SideMenu';
import PasswordModal from './Modal/PasswordModal';
import LogoutModal from './Modal/LogoutModal';
import WithdrawModal from './Modal/WithdrawModal';

import { getUser } from '../../../api/mypageApi';
import { useLocation } from '../../../context/LocationContext';

const SettingPage = () => {
  const { region } = useLocation();
  const [number, setNumber] = useState();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        console.log(response);
        setNumber(response.phoneNum);
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
        <AddressList>
          <AddressItem>
            <AddressInfo>
              <Name>최윤성</Name>
              <Details>{region}</Details>
              <Phone>{number}</Phone>
            </AddressInfo>
          </AddressItem>
        </AddressList>

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

const Title = styled.div`
  font-size: 12px;
  color: #131118;
`;

export default SettingPage;
