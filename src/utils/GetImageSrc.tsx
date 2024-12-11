export const getImageSrc = (
  image: File | string | null | undefined
): string => {
  if (!image) {
    return '';
  }

  if (typeof image === 'string') {
    if (image.startsWith('http')) {
      return image;
    }
    // 상대 경로일 경우 절대 경로로 변환
    const baseUrl = process.env.VITE_API_URL || 'http://15.164.5.135:8080';
    return `${baseUrl}/${image}`;
  } else if (image instanceof File) {
    return URL.createObjectURL(image);
  } else {
    return '';
  }
};
