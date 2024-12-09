import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchPostById } from '../community/api/postApi';
import { approvePost, rejectPost } from './api/adminApi';
import { FaBackspace, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Post } from '../../../types/postTypes';

const PostApprovalPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { postId } = location.state || {}; // PostList에서 전달된 postId
  const [post, setPost] = useState<Post | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) {
        navigate('/admin/posts'); // postId가 없을 경우 관리자 페이지로 리다이렉트
        return;
      }
      try {
        const postDetails = await fetchPostById(postId); // 포스트 세부 정보 가져오기
        setPost(postDetails.communityPost);
      } catch (error) {
        console.error('Failed to fetch post details:', error);
      }
    };
    fetchPost();
  }, [postId, navigate]);

  const handleNextImage = () => {
    if (post) setCurrentIndex((prev) => (prev + 1) % post.imageUrls.length);
  };

  const handlePreviousImage = () => {
    if (post)
      setCurrentIndex(
        (prev) => (prev - 1 + post.imageUrls.length) % post.imageUrls.length
      );
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleApprove = async () => {
    if (!post) return;
    try {
      // 제목에서 '(수정요망)' 제거
      const updatedTitle = post.title.startsWith('(수정요망)')
        ? post.title.replace(/^\(수정요망\)\s*/, '')
        : post.title;

      await approvePost(postId, updatedTitle); // 포스트 상태를 APPROVED로 변경
      alert('게시물이 승인되었습니다.');
      navigate('/admin/posts'); // 승인 후 관리자 페이지로 리다이렉트
    } catch (error) {
      console.error('Failed to approve post:', error);
      alert('승인 처리 중 오류가 발생했습니다.');
    }
  };

  const handleReject = async () => {
    if (!post) return;
    try {
      // 제목에 '(수정요망)' 추가
      const updatedTitle = post.title.startsWith('(수정요망)')
        ? post.title // 이미 '(수정요망)'이 있으면 그대로 유지
        : `(수정요망) ${post.title}`;

      await rejectPost(postId, updatedTitle); // 포스트 상태를 REJECTED로 변경
      alert('게시물이 거절 처리되었습니다.');
      navigate('/admin/posts'); // 거절 후 관리자 페이지로 리다이렉트
    } catch (error) {
      console.error('Failed to reject post:', error);
      alert('거절 처리 중 오류가 발생했습니다.');
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer>
      <ContentWrapper>
        <Header>
          <Title>작성글 게시 승인 대기</Title>
          <HeaderWrapper>
            <BackButton onClick={() => navigate(-1)}>
              <FaBackspace size={24} />
            </BackButton>
          </HeaderWrapper>
        </Header>

        <FormContainer>
          <ImageAndDetailsContainer>
            {/* 이미지 섹션 */}
            <ImageContainer>
              <ImagePreviewWrapper>
                <PreviousButtonWrapper>
                  {post.imageUrls.length > 1 && currentIndex > 0 && (
                    <PreviousButton onClick={handlePreviousImage}>
                      <FaAngleLeft size={20} />
                    </PreviousButton>
                  )}
                </PreviousButtonWrapper>

                <ImagePreview>
                  <img
                    src={URL.createObjectURL(post.imageUrls[currentIndex])}
                    alt={`이미지 ${currentIndex + 1}`}
                  />
                </ImagePreview>

                <NextButtonWrapper>
                  {post.imageUrls.length > 1 &&
                    currentIndex < post.imageUrls.length - 1 && (
                      <NextButton onClick={handleNextImage}>
                        <FaAngleRight size={20} />
                      </NextButton>
                    )}
                </NextButtonWrapper>
              </ImagePreviewWrapper>

              {/* PaginationDots는 이미지 아래에 위치 */}
              <PaginationDotsWrapper>
                {post.imageUrls.length > 1 && (
                  <PaginationDots>
                    {post.imageUrls.map((_, index) => (
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
                  <Url>{post.productUrl}</Url>
                </UrlWrapper>
              </UrlContainer>
            </ImageContainer>

            <DetailsAndInfoContainer>
              {/* 상세 정보 섹션 */}
              <DetailsContainer>
                <Detail>
                  <Label>제목</Label>
                  <DetailText>{post.title}</DetailText>
                </Detail>
                <DoubleWrapper>
                  <AuthorDetail>
                    <Label>작성자</Label>
                    <AuthorNickname>{post.nickname}</AuthorNickname>
                  </AuthorDetail>
                  <CreatedAtDetail>
                    <Label>작성일</Label>{' '}
                    {new Date(post.createdAt).toLocaleString()}
                  </CreatedAtDetail>
                </DoubleWrapper>
                <DoubleWrapper>
                  <Detail>
                    <Label>카테고리</Label> {post.category}
                  </Detail>
                  <Detail>
                    <Label>참여 필요 수량</Label>
                    {post.availableNumber}
                  </Detail>
                </DoubleWrapper>

                <DoubleWrapper>
                  <Detail>
                    <Label>모집 마감 기간</Label> {post.period}일
                  </Detail>
                </DoubleWrapper>
                <DoubleWrapper>
                  <Detail>
                    <Label>총 가격</Label> {post.totalAmount.toLocaleString()}{' '}
                    원
                  </Detail>
                  <Detail>
                    <Label>개당 가격</Label> {post.unitAmount.toLocaleString()}{' '}
                    원
                  </Detail>
                </DoubleWrapper>
              </DetailsContainer>
            </DetailsAndInfoContainer>
          </ImageAndDetailsContainer>

          {/* 내용 섹션 */}
          <TextAreaWrapper>
            <TextArea readOnly value={post.description} />
          </TextAreaWrapper>

          <ActionButtons>
            <ApproveButton onClick={handleApprove}>승인</ApproveButton>
            <RejectButton onClick={handleReject}>거절</RejectButton>
          </ActionButtons>
        </FormContainer>
      </ContentWrapper>
    </PageContainer>
  );
};

export default PostApprovalPage;

const PageContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column; /* Title과 HeaderWrapper를 세로로 배치 */
  gap: 10px; /* Title과 HeaderWrapper 사이 간격 */
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  text-align: left;
  margin: 0; /* Title의 기본 마진 제거 */
`;

const HeaderWrapper = styled.div`
  width: 1000px;
  margin: 30px auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
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
  display: flex; /* 가로 정렬 */
  flex-direction: row; /* 기본값이므로 명시적으로 추가 */
  align-items: stretch; /* 양쪽 요소의 높이를 동일하게 */
  justify-content: center; /* 양쪽 여백 균등 배치 */
  gap: 20px; /* 두 컨테이너 사이 간격 */
  margin-bottom: 20px; /* 아래 요소와의 간격 */
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 490px;
  height: 470px; /* 고정된 높이 설정 */
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

const DetailsAndInfoContainer = styled.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: flex-start; /* 왼쪽 정렬 */
  justify-content: space-between; /* 위아래 요소 간격 균등 */
  width: 490px;
  max-width: 490px; /* 최대 너비 고정 */
  height: 470px; /* ImageUploadContainer와 동일한 고정 높이 */
  flex-grow: 1; /* 가로 공간을 균등 분배 */
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; /* 컴포넌트 간 간격 */
  width: 100%;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 4px; /* Label과 텍스트 사이 간격 */
`;

const DetailText = styled.span`
  display: -webkit-box; /* Flexbox 기반으로 동작 */
  -webkit-line-clamp: 2; /* 두 줄까지만 표시 */
  -webkit-box-orient: vertical; /* 수직 방향 박스 정렬 */
  overflow: hidden; /* 넘치는 텍스트 숨김 */
  text-overflow: ellipsis; /* 넘치는 텍스트에 ... 표시 */
  white-space: normal; /* 줄바꿈 허용 */
  color: #333; /* 텍스트 색상 */
`;

const DoubleWrapper = styled.div`
  display: flex; /* 한 줄로 배치 */
  align-items: center; /* 세로 가운데 정렬 */
  justify-content: space-between; /* 양쪽 여백 균등 배치 */
  width: 100%; /* 부모 컨테이너 너비 */

  & > div {
    flex: 1; /* 내부 요소들이 동일한 크기로 영역 나눔 */
  }
`;

const AuthorDetail = styled.div`
  display: flex; /* 가로 배치 */
  flex-direction: column; /* 내부 요소가 한 줄씩 배치되도록 */
  gap: 5px; /* 내부 요소 간 간격 */
`;

const AuthorNickname = styled.div`
  display: flex; /* 한 줄로 배치 */
  align-items: center; /* 세로로 가운데 정렬 */
  font-size: 1rem; /* 텍스트 크기 설정 */
`;

const CreatedAtDetail = styled.div`
  display: flex; /* 가로 배치 */
  flex-direction: column; /* 내부 요소가 한 줄씩 배치되도록 */
  gap: 5px; /* 내부 요소 간 간격 */
`;

const TextAreaWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 460px; /* 고정된 높이 */
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

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px;
`;

const ApproveButton = styled.button`
  padding: 10px 20px;
  background-color: #000;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #484848;
  }
`;

const RejectButton = styled.button`
  padding: 10px 20px;
  background-color: #ff0000;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ff1e1b;
  }
`;
