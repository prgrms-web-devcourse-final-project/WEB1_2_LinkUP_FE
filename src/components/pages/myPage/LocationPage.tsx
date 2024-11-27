import React, { useEffect, useState } from 'react';
import Sidemenu from './SideMenu';
import GS from './GS';
import KakaoMap from '../../common/KakaoMap';
import styled from 'styled-components';

function LocationPage() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error('위치 정보를 가져올 수 없습니다:', error);
        }
      );
    }
  }, []);

  return (
    <GS.Wrapper>
      <Sidemenu />
      <GS.Content>
        <Title>동네 인증</Title>
        <KakaoMapWrapper>
          {location ? (
            <KakaoMap
              latitude={location.latitude}
              longitude={location.longitude}
              appKey={import.meta.env.VITE_KAKAO_KEY} // 카카오 JavaScript 키
            />
          ) : (
            <p>위치 정보를 불러오는 중...</p>
          )}
          <AddressDesc>
            현재 위치가 내 동네로 설정한 00동에 있습니다.
          </AddressDesc>
          <VerfiyButton>동네인증 완료하기</VerfiyButton>
        </KakaoMapWrapper>
      </GS.Content>
    </GS.Wrapper>
  );
}

const VerfiyButton = styled.div`
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  width: 445px;
  height: 56px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const AddressDesc = styled.div`
  color: #88868c;
`;

const KakaoMapWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export default LocationPage;
