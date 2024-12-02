import React, { useEffect, useRef } from 'react';
import { loadKakaoMapScript } from '../../utils/kakaoMapLoader';

type KakaoMapProps = {
  latitude: number;
  longitude: number;
  appKey: string;
  width: number;
};

const KakaoMap: React.FC<KakaoMapProps> = ({
  latitude,
  longitude,
  appKey,
  width,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeMap = async () => {
      try {
        const kakao = await loadKakaoMapScript(appKey);
        if (!mapContainer.current) return;

        const options = {
          center: new kakao.maps.LatLng(latitude, longitude),
          level: 3,
        };

        const map = new kakao.maps.Map(mapContainer.current, options);

        const markerPosition = new kakao.maps.LatLng(latitude, longitude);
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      } catch (error) {
        console.error('카카오맵 초기화 중 오류 발생:', error);
      }
    };

    initializeMap();
  }, [latitude, longitude, appKey]);

  return (
    <div
      ref={mapContainer}
      style={{
        width: `${width}px`,
        height: '350px',
      }}
    ></div>
  );
};

export default KakaoMap;
