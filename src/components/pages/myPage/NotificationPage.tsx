import React from 'react';
import Sidemenu from './SideMenu';
import GS from './GS';
import styled from 'styled-components';
import { notificationData } from './mockData'; // 목데이터 가져오기

function NotificationPage() {
  return (
    <GS.Wrapper>
      <Sidemenu />
      <GS.Content>
        <Title>알림내역</Title>
        <NotificationWrapper>
          {notificationData.map((item) => (
            <NotificationItem key={item.id}>
              <IconWrapper>
                <Icon>
                  <img src={'/images/' + item.icon + '.png'} />
                </Icon>
                <TitleText>{item.title}</TitleText>
              </IconWrapper>
              <TimeText>{item.time}</TimeText>
            </NotificationItem>
          ))}
        </NotificationWrapper>
      </GS.Content>
    </GS.Wrapper>
  );
}

const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
`;

const NotificationWrapper = styled.div`
  border: 1px solid #000;
  border-radius: 5px;
  padding: 16px;
  background: #fff;
  height: 450px;
`;

const NotificationItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #ddd;
  justify-content: space-between;

  &:last-child {
    border-bottom: none;
  }
`;

const Icon = styled.div`
  font-size: 20px;
  margin-right: 12px;

  img {
    width: 22px;
    height: 22px;
  }
`;

const TitleText = styled.div`
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
  display: inline-flex;
  align-items: center;
`;

const TimeText = styled.div`
  font-size: 12px;
  color: #000;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export default NotificationPage;
