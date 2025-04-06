import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { postSignUpLocation } from '../../../api/loginApi';
import KakaoMap from '../../common/KakaoMap';
import { useUser } from '../../../context/UserContext';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

function SetLocationPage() {
  const navigate = useNavigate();
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [region, setRegion] = useState<string | null>(null);
  const [called, setCalled] = useState<boolean>(false);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);

  const { setUser } = useUser();

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_KEY}&libraries=services&autoload=false`;

    script.onload = () => {
      window.kakao.maps.load(() => {
        setMapLoaded(true);
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (navigator.geolocation && !called && mapLoaded) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          try {
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
          } catch (error) {
            console.error('Geocoder error:', error);
          }
        },
        (error) => {
          console.error('위치 정보를 가져올 수 없습니다:', error);
        }
      );
    }
  }, [called, mapLoaded]);

  return (
    <Wrapper>
      <LeftContent>
        <BlueOverlay />
        <img
          src="/images/login10.jpg"
          alt="Login background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </LeftContent>
      <RightContent>
        <ContentContainer>
          <LogoContainer>
            <Logo>GoodBuyUs</Logo>
          </LogoContainer>
          <Title>우리동네 인증</Title>
          <Subtitle>위치서비스를 허용해주세요</Subtitle>

          <KakaoMapWrapper>
            {location && mapLoaded ? (
              <KakaoMap
                latitude={location.latitude}
                longitude={location.longitude}
                appKey={import.meta.env.VITE_KAKAO_KEY}
                width={400}
              />
            ) : (
              <LoadingText>위치 정보를 불러오는 중...</LoadingText>
            )}
          </KakaoMapWrapper>
          <AddressDesc>
            현재 위치가 내 동네로 설정한 <Region>{region || '00동'}</Region>에
            있습니다.
          </AddressDesc>

          <LoginButton
            onClick={async () => {
              if (region) {
                try {
                  const response = await postSignUpLocation({
                    address: region,
                  });

                  if (response.message === '주소 확인 완료') {
                    setUser({ address: region });
                    navigate('/setnickname');
                  } else {
                    alert('주소를 다시 확인해주세요.');
                  }
                } catch (error) {
                  console.error('Location submission error:', error);
                  alert('주소 정보 제출 중 오류가 발생했습니다.');
                }
              } else {
                alert('위치 정보를 먼저 불러와주세요.');
              }
            }}
          >
            Next
          </LoginButton>
        </ContentContainer>
      </RightContent>
    </Wrapper>
  );
}

const BlueOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(52, 152, 219, 0.2);
  z-index: 1;
`;

const LogoContainer = styled.div`
  margin-bottom: 30px;
`;

const Logo = styled.div`
  font-size: 22px;
  font-weight: 800;
  color: #3498db;
  letter-spacing: 2px;
`;

const ContentContainer = styled.div`
  width: 80%;
  max-width: 400px;
`;

const LoadingText = styled.p`
  color: #7f8c8d;
  font-size: 14px;
`;

const AddressDesc = styled.div`
  margin-left: -12%;
  width: 170%;
  color: #7f8c8d;
  font-size: 16px;
  margin-top: 10px;
`;
const Region = styled.b`
  color: #3498db;
`;
const KakaoMapWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const LoginButton = styled.div`
  background-color: #3498db;
  color: #fff;
  border-radius: 50px;
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  letter-spacing: 1px;
  box-shadow: 0 4px 10px rgba(52, 152, 219, 0.3);

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(52, 152, 219, 0.4);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(52, 152, 219, 0.3);
  }
`;

const Subtitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #34495e;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #34495e;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 40px;
    height: 3px;
    background-color: #3498db;
    border-radius: 3px;
  }
`;

const LeftContent = styled.div`
  flex: 6;
  position: relative;
  background-color: #ecf0f1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const RightContent = styled.div`
  flex: 4;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px 0;
  box-shadow: -10px 0 20px rgba(0, 0, 0, 0.05);
  z-index: 2;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #fff;
`;

export default SetLocationPage;
