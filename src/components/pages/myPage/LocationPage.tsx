import React, { useEffect, useState, useCallback } from 'react';
import Sidemenu from './SideMenu';
import GS from './GS';
import KakaoMap from '../../common/KakaoMap';
import styled from 'styled-components';
import { putLocationChange } from '../../../api/mypageApi';
import { useLocation } from '../../../context/LocationContext';
import { PageTitle } from './OrderListPage';
import { loadKakaoMapScript } from '../../../utils/kakaoMapLoader'; // Ensure this path is correct

function LocationPage() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const { region, setRegion } = useLocation();
  const [called, setCalled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mapScriptLoaded, setMapScriptLoaded] = useState<boolean>(false);

  // Get address from coordinates
  const getAddressFromCoords = useCallback(
    (longitude: number, latitude: number) => {
      if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
        console.error('카카오맵 서비스가 로드되지 않았습니다');
        return;
      }

      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.coord2RegionCode(
        longitude,
        latitude,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (result: any, status: any) => {
          if (
            status === window.kakao.maps.services.Status.OK &&
            result &&
            result[0]
          ) {
            const fullRegion = `${result[0]?.region_1depth_name || ''} ${
              result[0]?.region_2depth_name || ''
            } ${result[0]?.region_3depth_name || ''}`;
            setRegion(fullRegion.trim());
            setCalled(true);
          } else {
            console.error('주소를 가져오지 못했습니다.');
          }
        }
      );
    },
    [setRegion]
  );

  // Load Kakao map script
  useEffect(() => {
    const appKey = import.meta.env.VITE_KAKAO_KEY;
    if (!appKey) {
      console.error('Kakao API 키가 설정되지 않았습니다');
      setIsLoading(false);
      return;
    }

    loadKakaoMapScript(appKey)
      .then(() => {
        setMapScriptLoaded(true);
      })
      .catch((error) => {
        console.error('카카오맵 스크립트 로드 실패:', error);
        setIsLoading(false);
      });
  }, []);

  // Get current position
  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Geolocation이 지원되지 않는 브라우저입니다');
      setIsLoading(false);
      return;
    }

    if (called) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setIsLoading(false);
      },
      (error) => {
        console.error('위치 정보를 가져올 수 없습니다:', error);
        setIsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, [called]);

  // Get address when both location and map script are ready
  useEffect(() => {
    if (location && mapScriptLoaded && !called) {
      getAddressFromCoords(location.longitude, location.latitude);
    }
  }, [location, mapScriptLoaded, called, getAddressFromCoords]);

  const handleVerification = async () => {
    if (!region) {
      alert('동네 정보를 가져올 수 없습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    try {
      await putLocationChange({ newAddress: region });
      alert('동네 인증이 완료되었습니다.');
    } catch (error) {
      console.error('동네 인증 실패:', error);
      alert('동네 인증에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <GS.Wrapper>
      <Sidemenu />
      <GS.Content>
        <PageTitle>동네 인증</PageTitle>
        <Container>
          <KakaoMapWrapper>
            {isLoading ? (
              <LoadingMessage>위치 정보를 불러오는 중...</LoadingMessage>
            ) : location ? (
              <MapContainer>
                <KakaoMap
                  latitude={location.latitude}
                  longitude={location.longitude}
                  appKey={import.meta.env.VITE_KAKAO_KEY}
                  width={600}
                />
              </MapContainer>
            ) : (
              <ErrorMessage>
                위치 정보를 가져올 수 없습니다. 브라우저 설정에서 위치 접근
                권한을 확인해주세요.
              </ErrorMessage>
            )}
            <AddressCard>
              <LocationIcon>📍</LocationIcon>
              <AddressDesc>
                현재 위치가 내 동네로 설정한{' '}
                <AddressHighlight>{region || '00동'}</AddressHighlight>에
                있습니다.
              </AddressDesc>
            </AddressCard>
            <VerfiyButton
              onClick={handleVerification}
              disabled={!region || isLoading}
            >
              동네인증 완료하기
            </VerfiyButton>
          </KakaoMapWrapper>
        </Container>
      </GS.Content>
    </GS.Wrapper>
  );
}

const Container = styled.div`
  width: 100%;
  margin: 20px 0;
  background-color: #f0f7ff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(37, 99, 235, 0.1);
`;

const MapContainer = styled.div`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
  width: 100%;
  max-width: 600px;
`;

const VerfiyButton = styled.button`
  background: linear-gradient(45deg, #1e40af, #3b82f6);
  color: #fff;
  border-radius: 8px;
  width: 100%;
  max-width: 445px;
  height: 56px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
  border: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(59, 130, 246, 0.3);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
  }

  &:disabled {
    background: linear-gradient(45deg, #94a3b8, #cbd5e1);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const AddressCard = styled.div`
  background-color: white;
  padding: 15px 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 530px;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.08);
  margin: 10px 0;
`;

const LocationIcon = styled.div`
  font-size: 20px;
  margin-right: 10px;
`;

const AddressDesc = styled.div`
  color: #64748b;
  font-size: 15px;
`;

const AddressHighlight = styled.span`
  color: #1e40af;
  font-weight: bold;
`;

const KakaoMapWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #1e3a8a;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #2563eb;
`;

const LoadingMessage = styled.div`
  padding: 40px;
  font-size: 16px;
  color: #64748b;
  background-color: white;
  border-radius: 12px;
  text-align: center;
  width: 100%;
  max-width: 600px;
`;

const ErrorMessage = styled.div`
  padding: 30px;
  font-size: 16px;
  color: #ef4444;
  background-color: #fee2e2;
  border-radius: 12px;
  text-align: center;
  width: 100%;
  max-width: 600px;
`;

export default LocationPage;
