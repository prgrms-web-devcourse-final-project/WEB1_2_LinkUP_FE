import React from 'react';
import styled from 'styled-components';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { getImageSrc } from '../../../../utils/GetImageSrc';

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
    <FormContainer>
      <ImageAndDetailsContainer>
        {/* 이미지 섹션 */}
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

          {/* PaginationDots는 이미지 아래에 위치 */}
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
      </ImageAndDetailsContainer>
    </FormContainer>
  );
};

export default PostImageSection;

const ImagePreviewWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 12px;
`;

const ImagePreview = styled.div`
  width: 300px;
  height: 290px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PaginationDotsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;
`;

const PaginationDots = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #e2e8f0;
    cursor: pointer;

    &.active {
      background-color: #2563eb;
    }
  }
`;

const UrlContainer = styled.div`
  margin-top: 20px;
`;

const UrlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const FormContainer = styled.div`
  margin-top: 20px;
`;

const PreviousButtonWrapper = styled.div`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
`;

const NextButtonWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
`;

const PreviousButton = styled.button`
  background-color: rgba(0, 0, 0, 0.3);
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const NextButton = styled.button`
  background-color: rgba(0, 0, 0, 0.3);
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const ImageAndDetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;
`;

const ImageContainer = styled.div`
  flex: 1;
`;

const Url = styled.a`
  font-size: 0.875rem;
  color: #2563eb;
  text-decoration: none;
  cursor: pointer;
  word-wrap: break-word;

  &:hover {
    text-decoration: underline;
  }
`;
const Label = styled.label`
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
`;
