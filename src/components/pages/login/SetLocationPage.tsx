import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { postSignUpLocation } from '../../../api/loginApi';
import KakaoMap from '../../common/KakaoMap';

function SetLocationPage() {
  const navigate = useNavigate();
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [region, setRegion] = useState<string | null>(null);
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
                  const primaryRegion = result[0]?.region_3depth_name || '';
                  setRegion(primaryRegion);
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
    <Wrapper>
      <LeftContent>
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
        <Title>
          우리동네를 인증하고
          <br />
          공동구매를 시작하세요
        </Title>
        <Subtitle>위치서비스를 허용해주세요</Subtitle>

        <KakaoMapWrapper>
          {location ? (
            <KakaoMap
              latitude={location.latitude}
              longitude={location.longitude}
              appKey={import.meta.env.VITE_KAKAO_KEY} // 카카오 JavaScript 키
              width={400}
            />
          ) : (
            <p>위치 정보를 불러오는 중...</p>
          )}
          <AddressDesc>
            현재 위치가 내 동네로 설정한 {region || '00동'}에 있습니다.
          </AddressDesc>
        </KakaoMapWrapper>

        <LoginButton
          onClick={async () => {
            if (region) {
              const response = await postSignUpLocation({ address: region });

              if (response.message === '주소 확인 완료') {
                localStorage.setItem('address', region);
                navigate('/setnickname');
              } else {
                alert('주소를 다시 확인해주세요.');
              }
            }
          }}
        >
          Next
        </LoginButton>
      </RightContent>
    </Wrapper>
  );
}

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
  margin-top: 20px;
`;

const LoginButton = styled.div`
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  width: calc(100% - 20px);
  height: 35px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 35px;
  cursor: pointer;
`;

const Subtitle = styled.div`
  font-size: 12px;
  font-weight: 500;
  margin-top: 10px;
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: 900;
  margin-bottom: 20px;
`;
const LeftContent = styled.div`
  flex: 6;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const RightContent = styled.div`
  flex: 4;
  background-color: #fff;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding-left: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

export default SetLocationPage;
