import React from 'react';
import styled from 'styled-components';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { getImageSrc } from '../../../../hooks/GetImageSrc';

interface PostImageSectionProps {
  selectedPost: {
    imageUrls: (File | string)[];
    productUrl: string;
  } | null;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const PostImageSection: React.FC<PostImageSectionProps> = ({
  selectedPost,
  currentIndex,
  setCurrentIndex,
}) => {
  if (!selectedPost) return null;

  const handleNextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % selectedPost.imageUrls.length);
  };

  const handlePreviousImage = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + selectedPost.imageUrls.length) %
        selectedPost.imageUrls.length
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <ImageContainer>
      <ImagePreviewWrapper>
        <PreviousButtonWrapper>
          {selectedPost.imageUrls.length > 1 && currentIndex > 0 && (
            <PreviousButton onClick={handlePreviousImage}>
              <FaAngleLeft size={20} />
            </PreviousButton>
          )}
        </PreviousButtonWrapper>

        <ImagePreview>
          <img
            src={getImageSrc(selectedPost.imageUrls[currentIndex])}
            alt={`이미지 ${currentIndex + 1}`}
          />
        </ImagePreview>

        <NextButtonWrapper>
          {selectedPost.imageUrls.length > 1 &&
            currentIndex < selectedPost.imageUrls.length - 1 && (
              <NextButton onClick={handleNextImage}>
                <FaAngleRight size={20} />
              </NextButton>
            )}
        </NextButtonWrapper>
      </ImagePreviewWrapper>

      <PaginationDotsWrapper>
        {selectedPost.imageUrls.length > 1 && (
          <PaginationDots>
            {selectedPost.imageUrls.map((_, index) => (
              <span
                key={index}
                className={currentIndex === index ? 'active' : ''}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </PaginationDots>
        )}
      </PaginationDotsWrapper>

      <UrlContainer>
        <UrlWrapper>
          <Label htmlFor="urlInput">URL 주소</Label>
          <Url>{selectedPost.productUrl}</Url>
        </UrlWrapper>
      </UrlContainer>
    </ImageContainer>
  );
};

export default PostImageSection;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 490px;
  height: 470px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px 11px;
  position: relative;
  box-sizing: border-box;
`;

const ImagePreviewWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 320px;
  position: relative;
  overflow: hidden;
`;

const ImagePreview = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const PreviousButtonWrapper = styled.div`
  flex: 0 0 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const NextButtonWrapper = styled.div`
  flex: 0 0 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const PreviousButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
`;

const NextButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
`;

const PaginationDotsWrapper = styled.div`
  width: 100%;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PaginationDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ddd;
    cursor: pointer;
  }

  span.active {
    background: #000;
  }
`;

const UrlContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 세로로 가운데 정렬 */
  width: 100%;
`;

const UrlWrapper = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center; /* Label과 Url을 같은 높이에 배치 */
  gap: 10px; /* Label과 Url 사이 간격 */
  padding: 10px;
  border: none;
`;

const Url = styled.div`
  width: 285px;
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 4px; /* Label과 텍스트 사이 간격 */
`;
