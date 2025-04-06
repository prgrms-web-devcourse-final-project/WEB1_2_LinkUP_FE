export const loadKakaoMapScript = (
  appKey: string
): Promise<typeof window.kakao> => {
  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      resolve(window.kakao);
      return;
    }

    const existingScript = document.getElementById('kakao-map-script');
    if (existingScript) {
      const checkKakaoInterval = setInterval(() => {
        if (window.kakao && window.kakao.maps) {
          clearInterval(checkKakaoInterval);
          window.kakao.maps.load(() => resolve(window.kakao));
        }
      }, 100);

      setTimeout(() => {
        clearInterval(checkKakaoInterval);
        reject(new Error('카카오맵 스크립트 로드 시간 초과'));
      }, 10000);

      return;
    }

    const script = document.createElement('script');
    script.id = 'kakao-map-script';
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&libraries=services&autoload=false`;
    script.async = true;

    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => resolve(window.kakao));
      } else {
        reject(new Error('카카오맵 객체를 찾을 수 없습니다'));
      }
    };

    script.onerror = () => {
      reject(new Error('카카오맵 스크립트를 로드할 수 없습니다'));
    };

    document.head.appendChild(script);
  });
};
