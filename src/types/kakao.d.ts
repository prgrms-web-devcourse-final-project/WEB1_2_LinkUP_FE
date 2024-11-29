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
  };
}

declare global {
  const kakao: typeof window.kakao;
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}
export {};
