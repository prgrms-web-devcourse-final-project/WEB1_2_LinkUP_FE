import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { getUser } from '../../../api/mypageApi';

const Sidemenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [newName, setNewName] = useState('');

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();

        setProfileImage(response.profile);
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
        <ProfileImage
          src={profileImage || '/images/origin.png'}
          alt="Profile"
        />
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
  border: 0.5px solid #dae8f2;
`;

const Wrapper = styled.div`
  width: 260px;
  min-width: 260px;
  height: 100%;
  background-color: #f7fafd;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 50, 0.1);
  border: 1px solid #e3eef7;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  background-color: #fff;
  border-radius: 10px 10px 0 0;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
  border: 2px solid #4e8ac9;
  box-shadow: 0 0 5px rgba(78, 138, 201, 0.3);
`;

const ProfileText = styled.div`
  display: flex;
  flex-direction: column;
`;

const Hello = styled.div`
  font-size: 14px;
  color: #6f8ca7;
`;

const Username = styled.div`
  margin-top: 8px;
  font-size: 16px;
  font-weight: bold;
  color: #2a5985;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 15px 20px;
`;

const MenuItem = styled.div<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: ${({ $isActive: isActive }) => (isActive ? '#fff' : '#4a6b8a')};
  cursor: pointer;
  height: 38px;
  gap: 10px;
  background-color: ${({ $isActive: isActive }) =>
    isActive ? '#3b7fc4' : 'transparent'};
  border-radius: 6px;
  padding: 5px 12px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ $isActive: isActive }) =>
      isActive ? '#2d6cae' : '#e6f0fa'};
    color: ${({ $isActive: isActive }) => (isActive ? '#fff' : '#1d5996')};
    transform: translateX(2px);
  }
`;

export default Sidemenu;
