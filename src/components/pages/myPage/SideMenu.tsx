import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { getUser } from '../../../api/mypageApi';

const Sidemenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [newName, setNewName] = useState('');

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();

        setNewName(response.name);
      } catch (error) {
        console.error('failed', error);
      }
    };
    fetchUser();
  }, []);

  return (
    <Wrapper>
      <ProfileSection>
        <ProfileImage src={'/images/profile.png'} alt="Profile" />
        <ProfileText>
          <Hello>Hello 👋</Hello>
          <Username>{newName}</Username>
        </ProfileText>
      </ProfileSection>
      <Line />
      <Menu>
        <MenuItem
          $isActive={isActive('/mypage/setting')}
          onClick={() => navigate('/mypage/setting')}
        >
          <img
            src={`/images/setting${isActive('/mypage/setting') ? '_on' : ''}.png`}
            width={24}
            height={24}
            alt="Icon"
          />
          설정
        </MenuItem>
        <MenuItem
          $isActive={isActive('/mypage/orderlist')}
          onClick={() => navigate('/mypage/orderlist')}
        >
          <img
            src={`/images/orderlist${
              isActive('/mypage/orderlist') ? '_on' : ''
            }.png`}
            width={24}
            height={24}
            alt="Icon"
          />
          주문 내역
        </MenuItem>
        <MenuItem
          $isActive={isActive('/mypage/wishlist')}
          onClick={() => navigate('/mypage/wishlist')}
        >
          <img
            src={`/images/wishlist${
              isActive('/mypage/wishlist') ? '_on' : ''
            }.png`}
            width={24}
            height={24}
            alt="Icon"
          />
          찜한 상품
        </MenuItem>
        <MenuItem
          $isActive={isActive('/mypage/location')}
          onClick={() => navigate('/mypage/location')}
        >
          <img
            src={`/images/location${
              isActive('/mypage/location') ? '_on' : ''
            }.png`}
            width={24}
            height={24}
            alt="Icon"
          />
          동네인증
        </MenuItem>
        <MenuItem
          $isActive={isActive('/mypage/refund')}
          onClick={() => navigate('/mypage/refund')}
        >
          <img
            src={`/images/refund${isActive('/mypage/refund') ? '_on' : ''}.png`}
            width={24}
            height={24}
            alt="Icon"
          />
          환불계좌 관리
        </MenuItem>
        <MenuItem
          $isActive={isActive('/mypage/notification')}
          onClick={() => navigate('/mypage/notification')}
        >
          <img
            src={`/images/notification${
              isActive('/mypage/notification') ? '_on' : ''
            }.png`}
            width={24}
            height={24}
            alt="Icon"
          />
          알림내역
        </MenuItem>
        <MenuItem
          $isActive={isActive('/mypage/myposts')}
          onClick={() => navigate('/mypage/myposts')}
        >
          <img
            src={`/images/myposts${isActive('/mypage/myposts') ? '_on' : ''}.png`}
            width={24}
            height={24}
            alt="Icon"
          />
          나의 게시글
        </MenuItem>
        <MenuItem
          $isActive={isActive('/mypage/chatlist')}
          onClick={() => navigate('/mypage/chatlist')}
        >
          <img
            src={`/images/chatlist${
              isActive('/mypage/chatlist') ? '_on' : ''
            }.png`}
            width={24}
            height={24}
            alt="Icon"
          />
          나의 채팅방 목록
        </MenuItem>
      </Menu>
    </Wrapper>
  );
};

const Line = styled.div`
  width: 100%;
  border: 0.5px solid #888;
`;

const Wrapper = styled.div`
  width: 260px;
  min-width: 260px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
`;

const ProfileText = styled.div`
  display: flex;
  flex-direction: column;
`;

const Hello = styled.div`
  font-size: 14px;
  color: #888;
`;

const Username = styled.div`
  margin-top: 15px;
  font-size: 16px;
  font-weight: bold;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px 20px;
`;

const MenuItem = styled.div<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: ${({ $isActive: isActive }) => (isActive ? '#fff' : '#333')};
  cursor: pointer;
  height: 30px;
  gap: 10px;
  background-color: ${({ $isActive: isActive }) =>
    isActive ? '#000' : 'transparent'};
  border-radius: 5px;
  padding: 5px 10px;

  &:hover {
    background-color: ${({ $isActive: isActive }) =>
      isActive ? '#000' : '#f1f1f1'};
    color: ${({ $isActive: isActive }) => (isActive ? '#fff' : '#000')};
  }
`;

export default Sidemenu;
