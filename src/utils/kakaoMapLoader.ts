export const loadKakaoMapScript = (
  appKey: string
): Promise<typeof window.kakao> => {
  return new Promise((resolve, reject) => {
    // Check if script is already loaded and kakao is defined
    if (window.kakao && window.kakao.maps) {
      resolve(window.kakao);
      return;
    }

    // Check if script tag exists but hasn't loaded yet
    const existingScript = document.getElementById('kakao-map-script');
    if (existingScript) {
      // Wait for the existing script to load
      const checkKakaoInterval = setInterval(() => {
        if (window.kakao && window.kakao.maps) {
          clearInterval(checkKakaoInterval);
          window.kakao.maps.load(() => resolve(window.kakao));
        }
      }, 100);

      // Set a timeout to prevent infinite waiting
      setTimeout(() => {
        clearInterval(checkKakaoInterval);
        reject(new Error('카카오맵 스크립트 로드 시간 초과'));
      }, 10000);

      return;
    }

    // Create and load script
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
