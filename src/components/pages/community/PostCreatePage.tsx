import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCaretDown } from 'react-icons/fa';
import CategoryWrapper from '../../common/CategoryWrapper';
import ScrollToTopButton from '../../common/ScrollToTopButton';

const PostCreatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const defaultCategory = location.state?.selectedCategory || '생활용품'; // 이전 페이지에서 전달된 카테고리

  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [quantity, setQuantity] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [deadline, setDeadline] = useState('마감 기한  ');
  const [content, setContent] = useState('');

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleDeadlineSelect = (day: string) => {
    setDeadline(day);
    setDropdownVisible(false);
  };

  const handlePostSubmit = () => {
    const parsedTotalPrice = parseInt(totalPrice.replace(/,/g, ''), 10);
    const parsedQuantity = parseInt(quantity, 10);
    const createdAt = new Date(); // 현재 시각을 글 작성 시점으로 설정

    // 마감 기한 계산 (현재 시점 + 선택한 마감 기한)
    const closeAt = new Date();
    if (deadline !== '마감 기한') {
      const daysToAdd = parseInt(deadline.replace(/[^0-9]/g, ''), 10); // "1일", "2일" 등의 숫자 추출
      closeAt.setDate(createdAt.getDate() + daysToAdd); // 날짜 계산
    }

    const postData = {
      category: selectedCategory,
      quantity: parsedQuantity,
      totalPrice: parsedTotalPrice,
      unitPrice: Math.floor(parsedTotalPrice / parsedQuantity),
      createdAt: createdAt.toISOString(),
      closeAt: closeAt.toISOString(),
      content,
    };

    // 서버 요청 후 상세 페이지로 이동 (mocking)
    console.log('POST request:', postData);

    // 이 부분은 아마 postId로 받지 않을까 싶음(추후 수정 필요)
    navigate(`/community/posts/${Date.now()}`, { state: postData });
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 허용
    const numericValue = Number(value);

    if (value === '' || numericValue <= 0) {
      setQuantity(''); // 입력 중 모두 지웠거나, 음수 또는 0인 경우 초기화
    } else {
      setQuantity(value); // 유효한 값 업데이트
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
    totalPrice && quantity
      ? formatCurrency(
          String(
            Math.floor(
              parseInt(totalPrice.replace(/,/g, ''), 10) /
                parseInt(quantity, 10)
            )
          )
        )
      : '자동 계산';

  return (
    <div>
      <PostCreatePageContainer>
        <ContentWrapper>
          <Title>공구 모집 및 진행</Title>
          <FormContainer>
            {/* 이미지 업로드 섹션 */}
            <ImageUploadContainer>
              <ImagePreview>
                <AddImage>+</AddImage>
              </ImagePreview>
              <URLInput placeholder="상품 관련 URL 주소를 입력해주세요." />
            </ImageUploadContainer>

            {/* 제목 및 카테고리 섹션 */}
            <DetailsContainer>
              <InputWrapper>
                <Label>제목</Label>
                <TextInput placeholder="제목을 입력해주세요." />
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
                  value={quantity}
                  onChange={handleQuantityChange}
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
  margin-bottom: 20px;
`;

const ImagePreview = styled.div`
  width: 100%;
  height: 200px;
  border: 1px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const AddImage = styled.div`
  font-size: 2rem;
  color: #777;
`;

const URLInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
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
  font-weight: ${({ isSelected }) => (isSelected ? 'bold' : '')};

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
