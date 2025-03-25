import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiImage } from 'react-icons/fi'; // 기본 이미지 아이콘 (다른 아이콘으로 변경 가능)
import { getImageSrc } from '../../utils/GetImageSrc';

interface PostImageProps {
  src: string | null;
  alt: string;
  imageUrls?: string[]; // 이미지 URL 배열
}

const PostImage: React.FC<PostImageProps> = ({ src, alt, imageUrls = [] }) => {
  const [currentSrc, setCurrentSrc] = useState<string | null>(src);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [loadFailed, setLoadFailed] = useState<boolean>(false);

  // 이미지 로드 실패 처리
  const handleImageError = () => {
    // 다음 이미지가 있는 경우
    if (imageUrls && imageIndex < imageUrls.length - 1) {
      setImageIndex((prevIndex) => prevIndex + 1);
      setCurrentSrc(getImageSrc(imageUrls[imageIndex + 1]));
    } else {
      // 모든 이미지 로드 실패 시 기본 이미지 표시 상태로 설정
      setLoadFailed(true);
      setCurrentSrc(null);
    }
  };

  // URL 배열이 변경되면 첫 번째 이미지부터 시도
  useEffect(() => {
    if (imageUrls && imageUrls.length > 0) {
      setImageIndex(0);
      setCurrentSrc(getImageSrc(imageUrls[0]));
      setLoadFailed(false);
    } else {
      // 이미지가 없는 경우 기본 이미지 표시 상태로 설정
      setLoadFailed(true);
      setCurrentSrc(null);
    }
  }, [imageUrls]);

  // 이미지 로드 실패 또는 이미지가 없는 경우 아이콘 표시
  if (loadFailed || !currentSrc) {
    return (
      <DefaultImageContainer>
        <FiImage size={40} />
      </DefaultImageContainer>
    );
  }

  // 이미지 표시
  return <StyledImage src={currentSrc} alt={alt} onError={handleImageError} />;
};

// 스타일드 컴포넌트 정의
const StyledImage = styled.img`
  width: 172px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 16px;
`;

const DefaultImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 172px;
  height: 100px;
  background-color: #f0f0f0;
  border-radius: 8px;
  margin-right: 16px;
  color: #666;
`;

export default PostImage;
