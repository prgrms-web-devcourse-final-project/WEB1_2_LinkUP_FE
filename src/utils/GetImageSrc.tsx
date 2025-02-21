export const getImageSrc = (
  image: File | string | null | undefined
): string => {
  if (!image) {
    return '';
  }

  const baseUrl = process.env.VITE_API_URL || 'http://15.164.5.135:8080';

  if (typeof image === 'string') {
    if (image.startsWith('http')) {
      return image;
    }
    // "upload/" 이전의 모든 부분을 제거하고 baseUrl과 결합
    const cleanedImagePath = image.substring(image.indexOf('upload/'));
    return `${baseUrl}/${cleanedImagePath}`;
  } else if (image instanceof File) {
    return URL.createObjectURL(image);
  } else {
    return '';
  }
};
