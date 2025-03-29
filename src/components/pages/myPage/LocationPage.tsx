import React, { useEffect, useState } from 'react';
import Sidemenu from './SideMenu';
import GS from './GS';
import KakaoMap from '../../common/KakaoMap';
import styled from 'styled-components';
import { putLocationChange } from '../../../api/mypageApi';
import { useLocation } from '../../../context/LocationContext';

function LocationPage() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const { region, setRegion } = useLocation();
  const [called, setCalled] = useState<boolean>(false);

  useEffect(() => {
    if (navigator.geolocation && !called) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          if (window.kakao) {
            const geocoder = new window.kakao.maps.services.Geocoder();

            geocoder.coord2RegionCode(
              longitude,
              latitude,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (result: any, status: any) => {
                if (status === window.kakao.maps.services.Status.OK) {
                  const fullRegion = `${result[0]?.region_1depth_name || ''} ${
                    result[0]?.region_2depth_name || ''
                  } ${result[0]?.region_3depth_name || ''}`;
                  setRegion(fullRegion);
                  setCalled(true);
                } else {
                  console.error('주소를 가져오지 못했습니다.');
                }
              }
            );
          }
        },
        (error) => {
          console.error('위치 정보를 가져올 수 없습니다:', error);
        }
      );
    }
  }, [location]);

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
              width={600}
            />
          ) : (
            <p>위치 정보를 불러오는 중...</p>
          )}
          <AddressDesc>
            현재 위치가 내 동네로 설정한 {region || '00동'}에 있습니다.
          </AddressDesc>
          <VerfiyButton
            onClick={async () => {
              if (region) {
                await putLocationChange({ newAddress: region });
              }
            }}
          >
            동네인증 완료하기
          </VerfiyButton>
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
