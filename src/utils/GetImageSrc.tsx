export const getImageSrc = (image: File | string): string => {
  if (typeof image === 'string') {
    // 이미지 URL이 문자열일 경우 그대로 반환
    return image;
  } else if (image instanceof File) {
    // File 객체일 경우 URL.createObjectURL 사용
    return URL.createObjectURL(image);
  } else {
    console.error('Invalid image format:', image);
    return '';
  }
};
