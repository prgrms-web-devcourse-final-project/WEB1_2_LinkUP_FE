export const getImageSrc = (
  image: File | string | null | undefined
): string => {
  if (!image) {
    return '';
  }

  const baseUrl = process.env.VITE_API_URL || 'https://goodbuyus.store';

  if (typeof image === 'string') {
    if (image.startsWith('http')) {
      return image;
    }
    // /app/upload/로 시작하는 경우 처리
    if (image.startsWith('/app/upload/')) {
      return `${baseUrl}/api/upload/${image.substring('/app/upload/'.length)}`;
    }
    // 이미 upload/로 시작하는 경우 baseUrl만 추가
    if (image.startsWith('upload/')) {
      return `${baseUrl}/api/upload/${image.substring('upload/'.length)}`;
    }
    // upload/가 포함된 경우 해당 부분부터 사용
    if (image.includes('upload/')) {
      const cleanedImagePath = image.substring(
        image.indexOf('upload/') + 'upload/'.length
      );
      return `${baseUrl}/api/upload/${cleanedImagePath}`;
    }
    // 그 외의 경우 /api/upload/ 경로를 추가
    return `${baseUrl}/api/upload/${image}`;
  } else if (image instanceof File) {
    return URL.createObjectURL(image);
  } else {
    return '';
  }
};
