import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import GS from './GS';
import Sidemenu from './SideMenu';
import PasswordModal from './Modal/PasswordModal';
import LogoutModal from './Modal/LogoutModal';
import WithdrawModal from './Modal/WithdrawModal';

import { getUser } from '../../../api/mypageApi';
import { PageTitle } from './OrderListPage';

const SettingPage = () => {
  const [number, setNumber] = useState<string | undefined>();
  const [nickname, setNickname] = useState();
  const [address, setAddress] = useState();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const formatPhoneNumber = (number: string) => {
    return number
      .replace(/\D/g, '') // 숫자 이외 제거
      .replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3'); // 010-XXXX-XXXX 형식 변환
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();

        setNickname(response.nickname);
        setNumber(formatPhoneNumber(response.phoneNum));
        setAddress(response.address);
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
        <PageTitle>내 계정 정보</PageTitle>
        <AddressList>
          <AddressItem>
            <AddressInfo>
              <NameWrapper>
                <Name>최윤성</Name>
                <Nickname>{nickname}</Nickname>
              </NameWrapper>
              <Details>{address}</Details>
              <Phone>{number}</Phone>
            </AddressInfo>

            <EditButton>수정</EditButton>
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
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e2e8f0;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e6f0ff;
  }
`;
const AddressInfo = styled.div`
  display: flex;
  flex-direction: column;
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

export default SettingPage;
