import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FaCaretDown,
  FaPlusCircle,
  FaMinusCircle,
  FaAngleLeft,
  FaAngleRight,
} from 'react-icons/fa';
import { createPost, PostData } from './api/postApi';
import CategoryWrapper from '../../common/CategoryWrapper';
import ScrollToTopButton from '../../common/ScrollToTopButton';

const PostCreatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const defaultCategory = location.state?.selectedCategory || '생활용품'; // 이전 페이지에서 전달된 카테고리

  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [requiredQuantity, setRequiredQuantity] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [deadline, setDeadline] = useState('마감 기한  ');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1); // -1: AddImageButton 상태
  const [urlInput, setUrlInput] = useState('');
  const [urlError, setUrlError] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleDeadlineSelect = (day: string) => {
    setDeadline(day);
    setDropdownVisible(false);
  };

  const handlePostSubmit = async () => {
    if (
      !title ||
      !requiredQuantity ||
      !totalPrice ||
      deadline === '마감 기한' ||
      images.length === 0 || // 최소 한 개의 이미지 추가 확인
      !urlInput ||
      !content
    ) {
      alert('모든 필수 정보를 입력하세요.');
      return;
    }
    if (!isValidUrl(urlInput)) {
      setUrlError(true);
      return;
    }

    const parsedTotalPrice = parseInt(totalPrice.replace(/,/g, ''), 10);
    const parsedRequiredQuantity = parseInt(requiredQuantity, 10);
    const createdAt = new Date(); // 현재 시각을 글 작성 시점으로 설정

    // 마감 기한 계산 (현재 시점 + 선택한 마감 기한)
    const closeAt = new Date();
    if (deadline !== '마감 기한') {
      const daysToAdd = parseInt(deadline.replace(/[^0-9]/g, ''), 10); // "1일", "2일" 등의 숫자 추출
      closeAt.setDate(createdAt.getDate() + daysToAdd); // 날짜 계산
    }

    const postData: PostData = {
      title,
      content,
      images,
      category: selectedCategory,
      createdAt: createdAt.toISOString(),
      closeAt: closeAt.toISOString(),
      requiredQuantity: parsedRequiredQuantity,
      totalPrice: parsedTotalPrice,
      unitPrice: Math.floor(parsedTotalPrice / parsedRequiredQuantity),
      url: urlInput,
    };

    try {
      const { postId } = await createPost(postData); // API 호출

      // 성공적으로 postId를 받으면 해당 포스트로 이동
      navigate(`/community/posts/${postId}`, { state: postData });
    } catch (error) {
      console.error('게시물 생성 중 오류 발생:', error);
      alert('게시물 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleRequiredQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 허용
    const numericValue = Number(value);

    if (value === '' || numericValue <= 0) {
      setRequiredQuantity(''); // 입력 중 모두 지웠거나, 음수 또는 0인 경우 초기화
    } else {
      setRequiredQuantity(value); // 유효한 값 업데이트
    }
  };

  const handleTotalPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 허용
    const numericValue = Number(value);

    if (value === '' || numericValue <= 0) {
      setTotalPrice(''); // 입력 중 모두 지웠거나, 음수 또는 0인 경우 초기화
    } else {
      setTotalPrice(formatCurrency(value)); // 통화 형식으로 변환
    }
  };

  const handleCancel = () => {
    navigate('/community', { state: { selectedCategory } }); // // CommunityPage 경로와 state 전달
  };

  const formatCurrency = (value: string) => {
    const numberValue = value.replace(/\D/g, ''); // 숫자만 남기기
    return new Intl.NumberFormat().format(Number(numberValue)); // 통화 형식으로 변환
  };

  const unitPrice =
    totalPrice && requiredQuantity
      ? formatCurrency(
          String(
            Math.floor(
              parseInt(totalPrice.replace(/,/g, ''), 10) /
                parseInt(requiredQuantity, 10)
            )
          )
        )
      : '자동 계산';

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedImages = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prev) => [...prev, ...uploadedImages]);
      setCurrentIndex(images.length); // 마지막으로 추가된 이미지로 이동
    }
  };

  const handleRemoveImage = () => {
    if (currentIndex >= 0) {
      setImages((prev) => prev.filter((_, i) => i !== currentIndex));
      setCurrentIndex((prev) => Math.max(prev - 1, -1)); // 이전 이미지로 이동
    }
  };

  const handleNextImage = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (currentIndex === images.length - 1) {
      setCurrentIndex(-1); // AddImageButton 상태로 전환
    }
  };

  const handlePreviousImage = () => {
    if (currentIndex === -1) {
      setCurrentIndex(images.length - 1); // 마지막 이미지로 이동
    } else {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const isValidUrl = (url: string) => {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|(\\d{1,3}\\.){3}\\d{1,3})' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$',
      'i'
    );
    return !!pattern.test(url);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(e.target.value);
    setUrlError(!isValidUrl(e.target.value));
  };

  return (
    <div>
      <PostCreatePageContainer>
        <ContentWrapper>
          <Title>공구 모집 및 진행</Title>
          <FormContainer>
            {/* 이미지 업로드 섹션 */}
            <ImageUploadContainer>
              <ImagePreviewWrapper>
                {currentIndex === -1 ? (
                  <AddImageButton>
                    <FaPlusCircle size={30} />
                    이미지 추가
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </AddImageButton>
                ) : (
                  <ImagePreview>
                    <img src={images[currentIndex]} alt="이미지 미리보기" />
                    <RemoveImageButton onClick={handleRemoveImage}>
                      <FaMinusCircle size={30} />
                    </RemoveImageButton>
                  </ImagePreview>
                )}
              </ImagePreviewWrapper>
              {images.length > 0 && (
                <>
                  <PaginationDots>
                    {images.map((_, index) => (
                      <span
                        key={index}
                        className={currentIndex === index ? 'active' : ''}
                        onClick={() => handleDotClick(index)}
                      />
                    ))}
                  </PaginationDots>
                  {currentIndex !== -1 && (
                    <NextButton onClick={handleNextImage}>
                      <FaAngleRight size={20} />
                    </NextButton>
                  )}
                  {(currentIndex > 0 ||
                    (currentIndex === -1 && images.length > 0)) && (
                    <PreviousButton onClick={handlePreviousImage}>
                      <FaAngleLeft size={20} />
                    </PreviousButton>
                  )}
                </>
              )}
              <UrlInputContainer>
                <Label htmlFor="urlInput">URL 주소</Label>
                <URLInput
                  id="urlInput"
                  type="text"
                  placeholder="상품 관련 URL 주소를 입력해주세요."
                  value={urlInput}
                  onChange={handleUrlChange}
                  isError={urlError}
                />
                {urlError && (
                  <ErrorMessage>올바른 URL을 입력해주세요.</ErrorMessage>
                )}
              </UrlInputContainer>
            </ImageUploadContainer>

            {/* 제목 및 카테고리 섹션 */}
            <DetailsContainer>
              <InputWrapper>
                <Label>제목</Label>
                <TextInput
                  placeholder="제목을 입력해주세요."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </InputWrapper>
              <InputWrapper>
                <Label>카테고리 선택</Label>
                <CategoryWrapper
                  selectedCategory={selectedCategory} // 현재 선택된 카테고리를 전달
                  onCategoryChange={
                    (category: string) => setSelectedCategory(category) // 카테고리 변경 시 상태 업데이트
                  }
                />
              </InputWrapper>
            </DetailsContainer>

            {/* 모집 정보 섹션 */}
            <InfoContainer>
              <InputWrapper>
                <Label>참여 필요 수량 선택</Label>
                <SmallInput
                  type="text" // 숫자만 입력되도록 onChange에서 제어
                  placeholder="수량 입력"
                  value={requiredQuantity}
                  onChange={handleRequiredQuantityChange}
                />
              </InputWrapper>
              <InputWrapper>
                <Label>모집 마감 기한 설정</Label>
                <DropdownWrapper>
                  <DropdownButton onClick={handleDropdownToggle}>
                    {deadline}
                    <FaCaretDown />
                  </DropdownButton>
                  {dropdownVisible && (
                    <DropdownMenu>
                      {Array.from({ length: 7 }, (_, index) => (
                        <DropdownItem
                          key={index}
                          onClick={() =>
                            handleDeadlineSelect(`${index + 1}일  `)
                          }
                          isSelected={deadline === `${index + 1}일  `}
                        >
                          {index + 1}일
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  )}
                </DropdownWrapper>
              </InputWrapper>
              <InputWrapper>
                <Label>총 가격 설정</Label>
                <SmallInput
                  type="text" // 숫자만 입력되도록 onChange에서 제어
                  placeholder="총 가격 입력"
                  value={totalPrice}
                  onChange={handleTotalPriceChange}
                />
                {' 원'}
              </InputWrapper>
              <InputWrapper>
                <Label>개당 가격</Label>
                <SmallInput disabled value={unitPrice} />
                {' 원'}
              </InputWrapper>
            </InfoContainer>

            {/* 내용 작성 섹션 */}
            <TextArea
              placeholder="내용을 입력해주세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            {/* 하단 버튼 섹션 */}
            <ButtonContainer>
              <Button primary onClick={handlePostSubmit}>
                확인
              </Button>
              <Button onClick={handleCancel}>취소</Button>
            </ButtonContainer>
          </FormContainer>
        </ContentWrapper>
      </PostCreatePageContainer>
      <ScrollToTopButton />
    </div>
  );
};

export default PostCreatePage;

const PostCreatePageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: left;
`;

const FormContainer = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 490px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  position: relative;
`;

const ImagePreviewWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  width: 100%;
  height: 320px;
  position: relative;
`;

const ImagePreview = styled.div`
  width: 400px;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AddImageButton = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 1.2rem;
  color: #555;
  cursor: pointer;
  margin-top: 15px;

  input {
    display: none;
  }
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 0px;
  right: 45px;
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  z-index: 1;
`;

const NextButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
`;

const PreviousButton = styled.button`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
`;

const PaginationDots = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
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

const UrlInputContainer = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    font-weight: bold;
    margin-bottom: 5px;
  }
`;

const URLInput = styled.input<{ isError: boolean }>`
  padding: 10px;
  border: 1px solid ${({ isError }) => (isError ? 'red' : '#ccc')};
  border-radius: 5px;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.8rem;
  margin-top: 5px;
`;

const DetailsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const InputWrapper = styled.div`
  flex: 1;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
`;

const TextInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const SmallInput = styled.input`
  width: 100px;
  padding: 10px 0px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  width: 120px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-weight: bold;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const DropdownMenu = styled.div`
  position: absolute;
  width: 120px;
  top: 100%;
  left: 0;
  right: 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  z-index: 1000;
`;

const DropdownItem = styled.div<{ isSelected: boolean }>`
  padding: 10px;
  text-align: center;
  cursor: pointer;
  background: ${({ isSelected }) => (isSelected ? '#f0f0f0' : '#fff')};
  font-weight: ${({ isSelected }) => (isSelected ? 'bold' : 'normal')};

  &:hover {
    background: #eaeaea;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 10px 20px;
  background: ${({ primary }) => (primary ? '#000' : '#fff')};
  color: ${({ primary }) => (primary ? '#fff' : '#000')};
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: ${({ primary }) => (primary ? '#333' : '#f4f4f4')};
  }
`;
