export const loadKakaoMapScript = (appKey: string): Promise<typeof kakao> => {
  return new Promise((resolve, reject) => {
    if (document.getElementById('kakao-map-script')) {
      resolve(window.kakao);
      return;
    }

    const script = document.createElement('script');
    script.id = 'kakao-map-script';
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&libraries=services&autoload=false`;
    script.onload = () => {
      window.kakao.maps.load(() => resolve(window.kakao));
    };
    script.onerror = () =>
      reject(new Error('카카오맵 스크립트를 로드할 수 없습니다.'));
    document.head.appendChild(script);
  });
};
