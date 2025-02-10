import React, { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  FaAngleLeft,
  FaAngleRight,
  FaCaretDown,
  FaMinusCircle,
  FaPlusCircle,
} from 'react-icons/fa';
import { createPost } from './api/postApi';
import CategoryWrapper from '../../common/CategoryWrapper';
import { POST_CATEGORIES } from './postCategories';
import { CreatePostData } from '../../../types/postTypes';
import { getImageSrc } from '../../../utils/GetImageSrc';

const PostCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const defaultCategory = useMemo(
    () => location.state?.selectedCategory || POST_CATEGORIES[0].id,
    [location.state]
  );

  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [availableNumber, setAvailableNumber] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [deadline, setDeadline] = useState('마감 기한  ');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrls, setImageUrls] = useState<Array<File>>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [urlInput, setUrlInput] = useState('');
  const [urlError, setUrlError] = useState(false);

  const createPostMutation = useMutation({
    mutationFn: (payload: CreatePostData) => createPost(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postList'] });
      alert('포스트가 작성되었습니다. 관리자의 승인을 대기 중입니다.');
      navigate('/community/post');
    },
    onError: () => {
      alert('포스트 생성에 실패했습니다.');
    },
  });

  const handleDropdownToggle = useCallback(() => {
    setDropdownVisible((prev) => !prev);
  }, []);

  const handleDeadlineSelect = useCallback((day: string) => {
    setDeadline(day);
    setDropdownVisible(false);
  }, []);

  const isValidUrl = useCallback((productUrl: string) => {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|(\\d{1,3}\\.){3}\\d{1,3})' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$',
      'i'
    );
    return !!pattern.test(productUrl);
  }, []);

  const formatCurrency = useCallback((value: string) => {
    const numberValue = value.replace(/\D/g, '');
    return new Intl.NumberFormat().format(Number(numberValue));
  }, []);

  const handlePostSubmit = useCallback(() => {
    if (
      !title ||
      !availableNumber ||
      !totalAmount ||
      deadline === '마감 기한' ||
      !imageUrls.length ||
      !urlInput ||
      !description
    ) {
      alert('모든 필수 정보를 입력하세요.');
      return;
    }

    if (!isValidUrl(urlInput)) {
      setUrlError(true);
      return;
    }

    const parsedTotalAmount = parseInt(totalAmount.replace(/,/g, ''), 10);
    const parsedAvailableNumber = parseInt(availableNumber, 10);
    const period = parseInt(deadline.replace(/[^0-9]/g, ''), 10);

    if (period <= 0) {
      alert('마감 기한을 올바르게 설정하세요.');
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      imageUrls: imageUrls,
      category: selectedCategory,
      availableNumber: parsedAvailableNumber,
      totalAmount: parsedTotalAmount,
      unitAmount: Math.floor(parsedTotalAmount / parsedAvailableNumber),
      productUrl: urlInput.trim(),
      period,
    };

    createPostMutation.mutate(payload);
  }, [
    title,
    availableNumber,
    totalAmount,
    deadline,
    imageUrls,
    urlInput,
    description,
    selectedCategory,
    isValidUrl,
    createPostMutation,
  ]);

  const handleNumberChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      setter: React.Dispatch<React.SetStateAction<string>>
    ) => {
      const value = e.target.value.replace(/[^0-9]/g, '');
      const numericValue = Number(value);

      setter(value === '' || numericValue <= 0 ? '' : value);
    },
    []
  );

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const uploadedFiles = Array.from(e.target.files).filter(
          (file) => file instanceof File
        );

        setImageUrls((prev) => [...prev, ...uploadedFiles]);
        setCurrentIndex((prev) =>
          uploadedFiles.length > 0 ? prev + uploadedFiles.length : prev
        );
      }
    },
    []
  );

  const handleRemoveImage = useCallback(() => {
    if (currentIndex >= 0) {
      setImageUrls((prev) => {
        const updatedImages = prev.filter((_, i) => i !== currentIndex);
        setCurrentIndex(
          updatedImages.length > 0
            ? currentIndex >= updatedImages.length
              ? currentIndex - 1
              : currentIndex
            : -1
        );
        return updatedImages;
      });
    }
  }, [currentIndex]);

  const handleNavigation = useCallback(
    (direction: 'next' | 'prev') => {
      const lastIndex = imageUrls.length - 1;

      if (direction === 'next') {
        setCurrentIndex((prev) =>
          prev < lastIndex ? prev + 1 : prev === lastIndex ? -1 : prev
        );
      } else {
        setCurrentIndex((prev) =>
          prev === -1 ? lastIndex : prev > 0 ? prev - 1 : 0
        );
      }
    },
    [imageUrls.length]
  );

  const unitAmount = useMemo(() => {
    return totalAmount && availableNumber
      ? formatCurrency(
          String(
            Math.floor(
              parseInt(totalAmount.replace(/,/g, ''), 10) /
                parseInt(availableNumber, 10)
            )
          )
        )
      : '자동 계산';
  }, [totalAmount, availableNumber, formatCurrency]);

  const handleCancel = useCallback(() => {
    navigate('/community/post', { state: { selectedCategory } });
  }, [navigate, selectedCategory]);

  const handleUrlChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setUrlInput(value);
      setUrlError(!isValidUrl(value));
    },
    [isValidUrl]
  );

  return (
    <div>
      <PostCreatePageContainer>
        <ContentWrapper>
          <Title>공구 모집 및 진행</Title>
          <FormContainer>
            <ImageAndDetailsContainer>
              {/* 이미지 업로드 섹션 */}
              <ImageUploadContainer>
                <ImagePreviewWrapper>
                  <PreviousButtonWrapper>
                    {imageUrls.length > 0 &&
                      (currentIndex > 0 || currentIndex === -1) && (
                        <PreviousButton
                          onClick={() => handleNavigation('prev')}
                        >
                          <FaAngleLeft size={20} />
                        </PreviousButton>
                      )}
                  </PreviousButtonWrapper>

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
                      <img
                        src={getImageSrc(imageUrls[currentIndex])}
                        alt="이미지 미리보기"
                      />
                      <RemoveImageButton onClick={handleRemoveImage}>
                        <FaMinusCircle size={30} />
                      </RemoveImageButton>
                    </ImagePreview>
                  )}

                  <NextButtonWrapper>
                    {imageUrls.length > 0 && currentIndex !== -1 && (
                      <NextButton onClick={() => handleNavigation('next')}>
                        <FaAngleRight size={20} />
                      </NextButton>
                    )}
                  </NextButtonWrapper>
                </ImagePreviewWrapper>

                {/* PaginationDots */}
                <PaginationDotsWrapper>
                  {imageUrls.length > 0 && (
                    <PaginationDots>
                      {imageUrls.map((_, index) => (
                        <span
                          key={index}
                          className={currentIndex === index ? 'active' : ''}
                          onClick={() => setCurrentIndex(index)}
                        />
                      ))}
                    </PaginationDots>
                  )}
                </PaginationDotsWrapper>

                <UrlInputContainer>
                  <UrlInputWrapper>
                    <Label htmlFor="urlInput">URL 주소</Label>
                    <URLInput
                      id="urlInput"
                      type="text"
                      placeholder="상품 관련 URL 주소를 입력해주세요."
                      value={urlInput}
                      onChange={handleUrlChange}
                      $isError={urlError}
                      spellCheck={false}
                    />
                  </UrlInputWrapper>
                  {urlError && (
                    <ErrorMessage>올바른 URL을 입력해주세요.</ErrorMessage>
                  )}
                </UrlInputContainer>
              </ImageUploadContainer>

              <DetailsAndInfoContainer>
                {/* 제목 및 카테고리 섹션 */}
                <DetailsContainer>
                  <InputWrapper>
                    <Label>제목</Label>
                    <TextInput
                      placeholder="제목을 입력해주세요."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      spellCheck={false}
                    />
                  </InputWrapper>
                  <CategoryInputWrapper>
                    <CategoryWrapperStyled
                      title="카테고리 선택"
                      categories={POST_CATEGORIES}
                      selectedCategory={selectedCategory}
                      onCategoryChange={(category: string) =>
                        setSelectedCategory(category)
                      }
                    />
                  </CategoryInputWrapper>
                </DetailsContainer>

                {/* 모집 정보 섹션 */}
                <InfoContainer>
                  <InputWrapper>
                    <Label>참여 필요 수량 선택</Label>
                    <SmallInput
                      type="text"
                      placeholder="수량 입력"
                      value={availableNumber}
                      onChange={(e) =>
                        handleNumberChange(e, setAvailableNumber)
                      }
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
                              $isSelected={deadline === `${index + 1}일  `}
                            >
                              {index + 1}일
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      )}
                    </DropdownWrapper>
                  </InputWrapper>
                  <PriceWrapper>
                    <InputWrapper>
                      <Label>총 가격 설정</Label>
                      <SmallInput
                        type="text"
                        placeholder="총 가격 입력"
                        value={totalAmount}
                        onChange={(e) => handleNumberChange(e, setTotalAmount)}
                      />
                      {' 원'}
                    </InputWrapper>
                    <InputWrapper>
                      <Label>개당 가격</Label>
                      <SmallInput disabled value={unitAmount} />
                      {' 원'}
                    </InputWrapper>
                  </PriceWrapper>
                </InfoContainer>
              </DetailsAndInfoContainer>
            </ImageAndDetailsContainer>

            {/* 내용 작성 섹션 */}
            <TextAreaWrapper>
              <TextArea
                placeholder="내용을 입력해주세요."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                spellCheck={false}
              />
            </TextAreaWrapper>

            {/* 하단 버튼 섹션 */}
            <ButtonContainer>
              <Button onClick={handlePostSubmit}>확인</Button>
              <Button onClick={handleCancel}>취소</Button>
            </ButtonContainer>
          </FormContainer>
        </ContentWrapper>
      </PostCreatePageContainer>
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
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ImageAndDetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 490px;
  height: 495px;
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
  height: 310px;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const AddImageButton = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #555;
  cursor: pointer;
  border-radius: 10px;
  width: 400px;
  height: 100%;
  background-color: #ececec;

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

const UrlInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const UrlInputWrapper = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: none;
`;

const URLInput = styled.input<{ $isError: boolean }>`
  width: 285px;
  flex: 1;
  padding: 10px;
  background-color: #ececec;
  border: 1px solid ${({ $isError }) => ($isError ? 'red' : '#ccc')};
  border-radius: 5px;
`;

const ErrorMessage = styled.span`
  margin-left: 125px;
  color: red;
  font-size: 0.8rem;
  margin-top: 5px;
`;

const DetailsAndInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 490px;
  height: 495px;
  flex-grow: 1;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  gap: 20px;
  box-sizing: border-box;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
  flex-shrink: 0;
  text-align: left;
`;

const TextInput = styled.input`
  width: 80%;
  padding: 10px;
  background-color: #ececec;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const CategoryInputWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const CategoryWrapperStyled = styled(CategoryWrapper)`
  display: flex;
  margin-left: 50px;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px 0;

  div {
    padding: 12px !important;
    flex: 1 1 calc(25% - 8px);
    box-sizing: border-box;

    &:hover {
      background-color: #f0f0f0 !important;
    }

    &.active {
      font-weight: bold !important;
      border-bottom: 2px solid black !important;
    }
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const SmallInput = styled.input`
  width: 100px;
  padding: 10px 0px;
  text-align: center;
  background-color: #ececec;
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
  box-sizing: border-box;
`;

const DropdownMenu = styled.div`
  position: absolute;
  width: 120px;
  top: 100%;
  left: 0;
  right: 0;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  z-index: 1000;
  box-sizing: border-box;
`;

const DropdownItem = styled.div<{ $isSelected: boolean }>`
  padding: 10px;
  text-align: center;
  cursor: pointer;
  background: ${({ $isSelected }) => ($isSelected ? '#f0f0f0' : '#fff')};
  font-weight: ${({ $isSelected }) => ($isSelected ? 'bold' : 'normal')};

  &:hover {
    background: #eaeaea;
  }
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  align-items: center;
`;

const TextAreaWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 460px;
  background-color: #ececec;
  border: none;
  border-radius: 10px;
  padding: 20px;
  outline: none;
  resize: none;
  font-size: 1rem;
  line-height: 1.5;
  color: #333;
  box-sizing: border-box;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #000;
  color: #fff;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #333;
  }
`;
