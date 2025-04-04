interface KakaoMarker {
  setMap: (map: object | null) => void;
}

interface KakaoMaps {
  maps: {
    LatLng: new (latitude: number, longitude: number) => object;
    Map: new (
      container: HTMLElement,
      options: { center: object; level: number }
    ) => object;
    Marker: new (options: { position: object }) => object;
    load: (callback: () => void) => void;
    services: {
      Geocoder: new () => {
        coord2RegionCode: (
          longitude: number,
          latitude: number,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          callback: (result: any, status: any) => void
        ) => void;
      };
      Status: {
        OK: string;
      };
    };
  };
}

declare global {
  interface Window {
    kakao: KakaoMaps;
  }
}

export {};
