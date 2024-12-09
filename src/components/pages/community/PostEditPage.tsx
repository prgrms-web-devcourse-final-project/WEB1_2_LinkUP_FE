import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import { selectedPostAtom, selectedPostIdAtom } from '../../../store/postStore';
import styled from 'styled-components';
import {
  FaCaretDown,
  FaPlusCircle,
  FaMinusCircle,
  FaAngleLeft,
  FaAngleRight,
} from 'react-icons/fa';
import { fetchPostById, updatePost, deletePostById } from './api/postApi';
import CategoryWrapper from '../../common/CategoryWrapper';
import { POST_CATEGORIES } from './postCategories';
import { Post, PostDetailResponse } from '../../../types/postTypes';
import { getImageSrc } from '../../../hooks/GetImageSrc';

const PostEditPage = () => {
  const { communityPostId } = useParams<{ communityPostId: string }>();
  const navigate = useNavigate();

  const [selectedPost] = useAtom(selectedPostAtom);
  const [, setSelectedPostId] = useAtom(selectedPostIdAtom);
  const [post, setPost] = useState<Post | undefined>({} as Post);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [availableNumber, setAvailableNumber] = useState<number | undefined>();
  const [totalAmount, setTotalAmount] = useState<number | undefined>();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [title, setTitle] = useState<string | undefined>('');
  const [description, setDescription] = useState<string | undefined>('');
  const [imageUrls, setImageUrls] = useState<Array<File>>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [urlInput, setUrlInput] = useState<string | undefined>('');
  const [urlError, setUrlError] = useState(false);
  const [period, setPeriod] = useState<number | undefined>();

  const communityPostIdNumber = Number(communityPostId);
  const queryKey = ['post', communityPostIdNumber];

  if (!communityPostIdNumber) {
    alert('유효하지 않은 게시물 ID입니다.');
    return;
  }

  // 게시물 ID 설정 및 초기화
  useEffect(() => {
    if (communityPostIdNumber) {
      setSelectedPostId(communityPostIdNumber);
    } else {
      alert('잘못된 게시물 ID입니다.');
      navigate('/community/post');
    }
  }, [communityPostIdNumber, setSelectedPostId, navigate]);

  // 게시물 데이터 가져오기
  const { data, isError } = useQuery<PostDetailResponse>({
    queryKey,
    queryFn: async (): Promise<PostDetailResponse> =>
      fetchPostById(communityPostIdNumber),
  });

  useEffect(() => {
    if (data) {
      setPost(selectedPost.data?.communityPost);
      setTitle(selectedPost.data?.communityPost.title);
      setDescription(selectedPost.data?.communityPost.description);
      setImageUrls(selectedPost.data?.communityPost.imageUrls || []);
      setSelectedCategory(
        selectedPost.data?.communityPost.category || '생활용품'
      );
      setAvailableNumber(selectedPost.data?.communityPost.availableNumber);
      setTotalAmount(selectedPost.data?.communityPost.totalAmount);
      setUrlInput(selectedPost.data?.communityPost.productUrl);
      setPeriod(selectedPost.data?.communityPost.period);
    }
  }, [data]);

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handlePeriodSelect = (period: number) => {
    setPeriod(period); // DropdownItem에서 선택된 값을 바로 설정
    setDropdownVisible(false); // Dropdown 메뉴 닫기
  };

  const handlePostUpdate = async () => {
    if (
      !title ||
      !availableNumber ||
      !totalAmount ||
      !period ||
      imageUrls.length === 0 || // 최소 한 개의 이미지 추가 확인
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

    // 오류 처리
    useEffect(() => {
      if (isError) {
        alert('게시물을 불러오는 데 실패했습니다.');
        navigate('/community/post');
      }
    }, [isError, navigate]);

    const updatedPost: Partial<Post> = {
      ...post,
      title,
      description,
      imageUrls,
      category: selectedCategory || '생활용품',
      availableNumber: availableNumber,
      totalAmount: totalAmount,
      unitAmount: Math.floor(totalAmount / availableNumber),
      productUrl: urlInput,
    };

    try {
      await updatePost(Number(communityPostId), updatedPost); // 게시글 수정 API 호출
      alert('게시글이 성공적으로 수정되었습니다.');
      navigate(`/mypage/post/${communityPostId}`);
    } catch (error) {
      console.error('게시글 수정 중 오류 발생:', error);
      alert('게시글 수정에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleAvailableNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 허용
    const numericValue = Number(value);

    if (value === '' || numericValue <= 0) {
      setAvailableNumber(undefined); // 입력 중 모두 지웠거나, 음수 또는 0인 경우 초기화
    } else {
      setAvailableNumber(numericValue); // 유효한 값 업데이트
    }
  };

  const handleTotalAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 허용
    const numericValue = Number(value);

    if (value === '' || numericValue <= 0) {
      setTotalAmount(undefined); // 입력 중 모두 지웠거나, 음수 또는 0인 경우 초기화
    } else {
      setTotalAmount(numericValue); // 통화 형식으로 변환
    }
  };

  const handleCancel = () => {
    navigate(`/mypage/post/${communityPostId}`);
  };

  const formatCurrency = (value: string) => {
    const numberValue = value.replace(/\D/g, ''); // 숫자만 남기기
    return new Intl.NumberFormat().format(Number(numberValue)); // 통화 형식으로 변환
  };

  const unitAmount =
    totalAmount && availableNumber
      ? formatCurrency(String(Math.floor(totalAmount / availableNumber)))
      : '자동 계산';

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedFiles = Array.from(e.target.files).filter(
        (file) => file instanceof File
      );
      setImageUrls((prev) => [...prev, ...uploadedFiles]);
    }
  };

  const handleRemoveImage = () => {
    if (currentIndex >= 0) {
      setImageUrls((prev) => {
        const updatedImages = prev.filter((_, i) => i !== currentIndex);

        // 다음 이미지 또는 이전 이미지로 이동
        if (updatedImages.length > 0) {
          const nextIndex =
            currentIndex >= updatedImages.length
              ? currentIndex - 1
              : currentIndex;
          setCurrentIndex(nextIndex); // 다음 이미지가 없으면 이전 이미지로 이동
        } else {
          setCurrentIndex(-1); // 모든 이미지가 제거되었을 때 AddImageButton으로 이동
        }

        return updatedImages;
      });
    }
  };

  const handleNextImage = () => {
    if (currentIndex < imageUrls.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (currentIndex === imageUrls.length - 1) {
      setCurrentIndex(-1); // AddImageButton 상태로 전환
    }
  };

  const handlePreviousImage = () => {
    if (currentIndex === -1) {
      setCurrentIndex(imageUrls.length - 1); // 마지막 이미지로 이동
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

  const handlePostDelete = async () => {
    // post가 null인 경우 처리
    if (!post) {
      alert('삭제할 게시글이 존재하지 않습니다.');
      return;
    }

    const confirmDelete = window.confirm('정말 이 게시글을 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      await deletePostById(Number(communityPostId)); // 삭제 API 호출
      alert('게시글이 성공적으로 삭제되었습니다.');
      navigate('/mypage/post');
    } catch (error) {
      console.error('게시글 삭제 중 오류 발생:', error);
      alert('게시글 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

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
                        <PreviousButton onClick={handlePreviousImage}>
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
                      <NextButton onClick={handleNextImage}>
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
                          onClick={() => handleDotClick(index)}
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
                      isError={urlError}
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
                    <CategoryLabel>카테고리 선택</CategoryLabel>
                    <CategoryWrapperStyled
                      categories={POST_CATEGORIES}
                      selectedCategory={selectedCategory} // 현재 선택된 카테고리를 전달
                      onCategoryChange={
                        (id: string) => setSelectedCategory(id) // 카테고리 변경 시 상태 업데이트
                      }
                    />
                  </CategoryInputWrapper>
                </DetailsContainer>

                {/* 모집 정보 섹션 */}
                <InfoContainer>
                  <InputWrapper>
                    <Label>참여 필요 수량 선택</Label>
                    <SmallInput
                      type="text" // 숫자만 입력되도록 onChange에서 제어
                      placeholder="수량 입력"
                      value={availableNumber}
                      onChange={handleAvailableNumberChange}
                    />
                  </InputWrapper>
                  <InputWrapper>
                    <Label>모집 마감 기한 설정</Label>
                    <DropdownWrapper>
                      <DropdownButton onClick={handleDropdownToggle}>
                        {period}
                        <FaCaretDown />
                      </DropdownButton>
                      {dropdownVisible && (
                        <DropdownMenu>
                          {Array.from({ length: 7 }, (_, index) => (
                            <DropdownItem
                              key={index}
                              onClick={() => handlePeriodSelect(index + 1)}
                              isSelected={period === index + 1}
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
                        type="text" // 숫자만 입력되도록 onChange에서 제어
                        placeholder="총 가격 입력"
                        value={formatCurrency(`totalAmount`)}
                        onChange={handleTotalAmountChange}
                      />
                      {' 원'}
                    </InputWrapper>
                    <InputWrapper>
                      <Label>개당 가격</Label>
                      <SmallInput disabled value={formatCurrency(unitAmount)} />
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
              <Button onClick={handlePostUpdate}>확인</Button>
              <Button onClick={handleCancel}>취소</Button>
              <Button onClick={handlePostDelete}>삭제</Button>
            </ButtonContainer>
          </FormContainer>
        </ContentWrapper>
      </PostCreatePageContainer>
    </div>
  );
};

export default PostEditPage;

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
  flex-direction: column; /* 내부 요소를 세로로 정렬 */
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ImageAndDetailsContainer = styled.div`
  display: flex; /* 가로 정렬 */
  flex-direction: row; /* 기본값이므로 명시적으로 추가 */
  align-items: stretch; /* 양쪽 요소의 높이를 동일하게 */
  justify-content: center; /* 양쪽 여백 균등 배치 */
  gap: 20px; /* 두 컨테이너 사이 간격 */
  margin-bottom: 20px; /* 아래 요소와의 간격 */
`;

const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 490px;
  height: 495px; /* 고정된 높이 설정 */
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px 11px;
  position: relative;
  box-sizing: border-box; /* 패딩과 보더 포함한 크기 계산 */
`;

const ImagePreviewWrapper = styled.div`
  display: flex;
  justify-content: space-between; /* 좌우 버튼 공간 확보 */
  align-items: center; /* 수직 중앙 정렬 */
  width: 100%;
  height: 320px; /* 기준 높이 */
  position: relative; /* 자식 요소 위치 기준 */
  overflow: hidden; /* 높이를 벗어난 콘텐츠 숨김 */
`;

const ImagePreview = styled.div`
  flex: 1; /* 이미지 영역이 버튼 사이에 위치 */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden; /* 콘텐츠가 영역을 벗어나지 않도록 */

  img {
    max-width: 100%; /* 부모 너비를 넘지 않도록 */
    max-height: 100%; /* 부모 높이를 넘지 않도록 */
    object-fit: contain; /* 비율을 유지하며 부모 크기 안에 맞춤 */
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
  width: 400px; /* img의 크기와 동일하게 설정 */
  height: 100%; /* img의 높이와 동일하게 설정 */
  background-color: #ececec; /* 요구된 배경색 추가 */

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
  flex: 0 0 32px; /* 버튼 고정 너비 */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* PreviewWrapper의 높이에 맞춤 */
`;

const NextButtonWrapper = styled.div`
  flex: 0 0 32px; /* 버튼 고정 너비 */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* PreviewWrapper의 높이에 맞춤 */
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
  height: 54px; /* 높이 설정 */
  display: flex; /* 플렉스 박스로 변경 */
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */
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
  align-items: flex-start; /* 세로로 가운데 정렬 */
  width: 100%;
`;

const UrlInputWrapper = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center; /* Label과 Url을 같은 높이에 배치 */
  gap: 10px; /* Label과 Url 사이 간격 */
  padding: 10px;
  border: none;
`;

const URLInput = styled.input<{ isError: boolean }>`
  width: 285px;
  flex: 1;
  padding: 10px;
  background-color: #ececec;
  border: 1px solid ${({ isError }) => (isError ? 'red' : '#ccc')};
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
  flex-direction: column; /* 세로 정렬 */
  align-items: flex-start; /* 왼쪽 정렬 */
  justify-content: space-between; /* 위아래 요소 간격 균등 */
  width: 490px;
  height: 495px; /* ImageUploadContainer와 동일한 고정 높이 */
  flex-grow: 1; /* 가로 공간을 균등 분배 */
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  gap: 50px; /* 컴포넌트 간 간격 */
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row; /* 가로 배치 */
  align-items: center; /* 세로 중앙 정렬 */
  gap: 10px; /* 컴포넌트 간 간격 */
  width: 100%;
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
  flex-shrink: 0; /* 라벨 크기를 고정 */
  text-align: left; /* 라벨 텍스트 왼쪽 정렬 */
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
  flex-direction: column; /* 라벨과 카테고리를 세로로 배치 */
`;

const CategoryLabel = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px; /* 라벨과 카테고리 사이 간격 */
`;

const CategoryWrapperStyled = styled(CategoryWrapper)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px 0;

  div {
    padding: 12px !important; /* 강제로 적용 */
    flex: 1 1 calc(25% - 8px);
    box-sizing: border-box;

    &:hover {
      background-color: #f0f0f0 !important; /* 호버 스타일도 강제 */
    }

    &.active {
      font-weight: bold !important; /* 활성 상태 스타일 강제 */
      border-bottom: 2px solid black !important;
    }
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  gap: 20px; /* 컴포넌트 간 간격 */
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

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: row; /* 가로 배치 */
  gap: 20px; /* 두 요소 간 간격 */
  width: 100%; /* 부모 컨테이너에 맞게 확장 */
  align-items: center; /* 세로 중앙 정렬 */
`;

const TextAreaWrapper = styled.div`
  width: 100%; /* Wrapper 크기는 기존 유지 */
  max-width: 1100px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px; /* 내부 여백 */
  margin-bottom: 20px;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 460px; /* 고정된 높이 */
  background-color: #ececec;
  border: none; /* 테두리 제거 */
  border-radius: 10px;
  padding: 20px;
  outline: none; /* 포커스 시 외곽선 제거 */
  resize: none; /* 크기 조절 비활성화 */
  font-size: 1rem; /* 텍스트 크기 */
  line-height: 1.5;
  color: #333; /* 텍스트 색상 */
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
