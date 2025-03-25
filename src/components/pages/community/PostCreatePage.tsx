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
          <Header>
            <Title>공구 모집 및 진행</Title>
          </Header>

          <FormContainer>
            {/* 이미지 업로드 섹션 */}
            <ImageAndDetailsContainer>
              <ImageUploadContainer>
                <ImagePreviewWrapper>
                  <ButtonWrapper>
                    {/* 이미지가 있고 이미지 추가 화면(-1)일 때는 왼쪽 버튼만 */}
                    {imageUrls.length > 0 && currentIndex === -1 && (
                      <PrevButton onClick={() => handleNavigation('prev')}>
                        <FaAngleLeft size={20} />
                      </PrevButton>
                    )}

                    {/* 이미지가 있고 이미지 추가 화면이 아니고 0번이 아닐 때만 왼쪽 버튼 */}
                    {imageUrls.length > 0 &&
                      currentIndex !== -1 &&
                      currentIndex !== 0 && (
                        <NavigationButton
                          onClick={() => handleNavigation('prev')}
                        >
                          <FaAngleLeft size={20} />
                        </NavigationButton>
                      )}

                    {/* 이미지가 있고 이미지 추가 화면이 아닐 때 오른쪽 버튼 */}
                    {imageUrls.length > 0 && currentIndex !== -1 && (
                      <NextButton onClick={() => handleNavigation('next')}>
                        <FaAngleRight size={20} />
                      </NextButton>
                    )}
                  </ButtonWrapper>
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
                </ImagePreviewWrapper>

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
                    <Label>URL 주소</Label>
                    <URLInput
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
                <DetailsContainer>
                  <CategoryWrapperStyled
                    title="카테고리 선택"
                    categories={POST_CATEGORIES}
                    selectedCategory={selectedCategory}
                    onCategoryChange={(category) =>
                      setSelectedCategory(category)
                    }
                  />
                  <Detail>
                    <Label>제목</Label>
                    <TextInput
                      placeholder="제목을 입력해주세요."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      spellCheck={false}
                    />
                  </Detail>

                  {/* 모집 정보 섹션 */}
                  <InfoContainer>
                    <Row>
                      <Detail>
                        <Label>참여 필요 수량 선택</Label>
                        <SmallInput
                          type="text"
                          placeholder="수량 입력"
                          value={availableNumber}
                          onChange={(e) =>
                            handleNumberChange(e, setAvailableNumber)
                          }
                        />
                      </Detail>
                      <Detail>
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
                      </Detail>
                    </Row>
                    <Row>
                      <PriceWrapper>
                        <Detail>
                          <Label>총 가격 설정</Label>
                          <PriceDetail>
                            <PriceInput
                              type="text"
                              placeholder="총 가격 입력"
                              value={totalAmount}
                              onChange={(e) =>
                                handleNumberChange(e, setTotalAmount)
                              }
                            />
                            <CurrencyText>원</CurrencyText>
                          </PriceDetail>
                        </Detail>
                        <Detail>
                          <Label>개당 가격</Label>
                          <PriceDetail>
                            <PriceInput disabled value={unitAmount} />
                            <CurrencyText>원</CurrencyText>
                          </PriceDetail>
                        </Detail>
                      </PriceWrapper>
                    </Row>
                  </InfoContainer>
                </DetailsContainer>
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
              <Buttons>
                <Button $primary onClick={handlePostSubmit}>
                  확인
                </Button>
                <Button onClick={handleCancel}>취소</Button>
              </Buttons>
            </ButtonContainer>
          </FormContainer>
        </ContentWrapper>
      </PostCreatePageContainer>
    </div>
  );
};

const PostCreatePageContainer = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8fafc;
`;

const ContentWrapper = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
`;

const FormContainer = styled.div`
  margin-top: 20px;
`;

const ImageAndDetailsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const ImageUploadContainer = styled.div`
  flex: 1;
`;

const ImagePreviewWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 12px;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const PrevButton = styled.button`
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
const NavigationButton = styled.button`
  background-color: rgba(0, 0, 0, 0.3);
  border: none;
  padding: 8px;
  margin-right: -60px;
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
  margin-left: 264px;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const ImagePreview = styled.div`
  width: 300px;
  height: 290px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AddImageButton = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 290px;
  background-color: #f9fafb;
  border: 2px dashed #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  color: #64748b;

  transition: all 0.2s;

  &:hover {
    border-color: #2563eb;
    color: #2563eb;
  }

  input {
    display: none;
  }
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 4px;
  z-index: 1;
`;

const PaginationDotsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;
`;

const PaginationDots = styled.div`
  display: flex;
  gap: 8px;

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

const UrlInputContainer = styled.div`
  margin-top: 70px;
`;

const UrlInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const URLInput = styled.input<{ $isError: boolean }>`
  width: 100%;
  height: 40px;
  border: 1px solid ${({ $isError }) => ($isError ? '#ef4444' : '#e2e8f0')};
  border-radius: 8px;
  font-size: 0.875rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;

const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 4px;
`;

const DetailsAndInfoContainer = styled.div`
  flex: 2;
  background-color: white;
  border-radius: 12px;

  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #f9fafb;
  border-radius: 8px;
  padding: 16px;
`;
const InfoContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Row = styled.div`
  display: flex;
  gap: 16px;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 6px;
  padding: 12px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`;

const Label = styled.label`
  font-size: 0.875rem;
  color: #475569;
  font-weight: 600;
`;

const SmallInput = styled.input`
  width: 100%;
  height: 40px;
  margin-top: 5px;
  border: 1px solid #e2e8f0;
  margin-top: 5px;
  border-radius: 8px;
  font-size: 0.875rem;
  text-align: center;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }

  &:disabled {
    background-color: #f9fafb;
    cursor: not-allowed;
  }
`;
const PriceDetail = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding: 12px;
  background-color: white;
  border-radius: 8px;

  flex: 1;
  align-items: center;
`;

const PriceInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
  text-align: center;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }

  &:disabled {
    background-color: #f9fafb;
    cursor: not-allowed;
  }
`;

const CurrencyText = styled.span`
  font-size: 1rem;
  color: #2563eb;
  font-weight: 600;
  margin-left: 4px;
  display: inline-flex;
  align-items: center;
  padding-top: 2px;
  user-select: none;
`;

const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 120px;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-top: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
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

const DropdownButton = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 5px;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: #2563eb;
  }
`;

const TextInput = styled.input`
  width: 100%;
  height: 40px;

  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;

const CategoryWrapperStyled = styled(CategoryWrapper)`
  margin-top: 8px;
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

const Buttons = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button<{ $primary?: boolean }>`
  padding: 10px 20px;
  background: ${({ $primary }) => ($primary ? '#2563eb' : 'white')};
  color: ${({ $primary }) => ($primary ? 'white' : '#2563eb')};
  border: 1px solid #2563eb;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: ${({ $primary }) => ($primary ? '#1d4ed8' : '#eff6ff')};
  }
`;

export default PostCreatePage;
