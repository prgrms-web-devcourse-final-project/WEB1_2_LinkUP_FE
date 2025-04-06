import React, { useEffect, useRef } from 'react';
import { loadKakaoMapScript } from '../../utils/kakaoMapLoader';

// 카카오맵 관련 타입 정의
interface KakaoMapMarker {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setMap: (map: any) => void;
}

interface KakaoMapInstance {
  maps: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Map: new (container: HTMLElement, options: any) => any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LatLng: new (lat: number, lng: number) => any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Marker: new (options: { position: any }) => KakaoMapMarker;
  };
}

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
        const kakao = (await loadKakaoMapScript(
          appKey
        )) as unknown as KakaoMapInstance;
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
