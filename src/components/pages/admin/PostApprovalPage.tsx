import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { handleSSEUpdate } from '../community/api/postApi';
import { approvePost, rejectPost } from './api/adminApi';
import { FaBackspace, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import { getImageSrc } from '../../../utils/GetImageSrc';
import { formatDateWithOffset } from '../../../utils/formatDate';
import { usePostQuery } from '../../../hooks/useGetPost';
import { QueryHandler } from '../../../hooks/useGetProduct';

const PostApprovalPage = () => {
  const { communityPostId } = useParams<{ communityPostId: string }>();
  const navigate = useNavigate();
  const postId = Number(communityPostId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: post, isLoading, isError } = usePostQuery(postId);

  const handleNextImage = () => {
    if (post)
      setCurrentIndex(
        (prev) => (prev + 1) % post.communityPost.imageUrls.length
      );
  };

  const handlePreviousImage = () => {
    if (post)
      setCurrentIndex(
        (prev) =>
          (prev - 1 + post.communityPost.imageUrls.length) %
          post.communityPost.imageUrls.length
      );
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleApprove = async () => {
    if (!post) return;
    try {
      // 제목에서 '(수정요망)' 제거
      const updatedTitle = post.communityPost.title.startsWith('(수정요망)')
        ? post.communityPost.title.replace(/^\(수정요망\)\s*/, '')
        : post.communityPost.title;
      handleSSEUpdate(postId);
      await approvePost(postId, { title: updatedTitle });
      alert('게시물이 승인되었습니다.');
      navigate('/admin/post'); // 승인 후 관리자 페이지로 리다이렉트
    } catch {
      alert('승인 처리 중 오류가 발생했습니다.');
    }
  };

  const handleReject = async () => {
    if (!post) return;
    try {
      // 제목에 '(수정요망)' 추가
      const updatedTitle = post.communityPost.title.startsWith('(수정요망) ')
        ? post.communityPost.title // 이미 '(수정요망)'이 있으면 그대로 유지
        : `(수정요망) ${post.communityPost.title}`;
      handleSSEUpdate(postId);
      await rejectPost(postId, { title: updatedTitle });
      alert('게시물이 거절 처리되었습니다.');
      navigate('/admin/post'); // 거절 후 관리자 페이지로 리다이렉트
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert('거절 처리 중 오류가 발생했습니다.');
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }
  console.log(post.communityPost.imageUrls);
  return (
    <QueryHandler isLoading={isLoading} isError={isError}>
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
                    {post.communityPost.imageUrls.length > 1 &&
                      currentIndex > 0 && (
                        <PreviousButton onClick={handlePreviousImage}>
                          <FaAngleLeft size={20} />
                        </PreviousButton>
                      )}
                  </PreviousButtonWrapper>

                  <ImagePreview>
                    <img
                      src={getImageSrc(
                        post?.communityPost.imageUrls[currentIndex]
                      )}
                      alt="이미지 미리보기"
                    />
                  </ImagePreview>

                  <NextButtonWrapper>
                    {post.communityPost.imageUrls.length > 1 &&
                      currentIndex <
                        post.communityPost.imageUrls.length - 1 && (
                        <NextButton onClick={handleNextImage}>
                          <FaAngleRight size={20} />
                        </NextButton>
                      )}
                  </NextButtonWrapper>
                </ImagePreviewWrapper>

                {/* PaginationDots는 이미지 아래에 위치 */}
                <PaginationDotsWrapper>
                  {post.communityPost.imageUrls.length > 1 && (
                    <PaginationDots>
                      {post.communityPost.imageUrls.map((_, index) => (
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
                    <Url>{post.communityPost.productUrl}</Url>
                  </UrlWrapper>
                </UrlContainer>
              </ImageContainer>

              <DetailsAndInfoContainer>
                {/* 상세 정보 섹션 */}
                <DetailsContainer>
                  <Detail>
                    <Label>제목</Label>
                    <DetailText>{post.communityPost.title}</DetailText>
                  </Detail>
                  <DoubleWrapper>
                    <AuthorDetail>
                      <Label>작성자</Label>
                      <AuthorNickname>
                        {post.communityPost.nickname}
                      </AuthorNickname>
                    </AuthorDetail>
                    <CreatedAtDetail>
                      <Label>작성일</Label>{' '}
                      {formatDateWithOffset(
                        post.communityPost.createdAt
                      ).toLocaleString()}
                    </CreatedAtDetail>
                  </DoubleWrapper>
                  <DoubleWrapper>
                    <Detail>
                      <Label>카테고리</Label> {post.communityPost.category}
                    </Detail>
                    <Detail>
                      <Label>참여 필요 수량</Label>
                      {post.communityPost.availableNumber}
                    </Detail>
                  </DoubleWrapper>

                  <DoubleWrapper>
                    <Detail>
                      <Label>모집 기간</Label> {post.communityPost.period}일
                    </Detail>
                  </DoubleWrapper>
                  <DoubleWrapper>
                    <Detail>
                      <Label>총 가격</Label>{' '}
                      {post.communityPost.totalAmount.toLocaleString()} 원
                    </Detail>
                    <Detail>
                      <Label>개당 가격</Label>{' '}
                      {post.communityPost.unitAmount.toLocaleString()} 원
                    </Detail>
                  </DoubleWrapper>
                </DetailsContainer>
              </DetailsAndInfoContainer>
            </ImageAndDetailsContainer>

            {/* 내용 섹션 */}
            <TextAreaWrapper>
              <TextArea readOnly value={post.communityPost.description} />
            </TextAreaWrapper>

            <ActionButtons>
              <ApproveButton onClick={handleApprove}>승인</ApproveButton>
              <RejectButton onClick={handleReject}>거절</RejectButton>
            </ActionButtons>
          </FormContainer>
        </ContentWrapper>
      </PageContainer>
    </QueryHandler>
  );
};
const PageContainer = styled.div`
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

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
  background-color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #2563eb;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const FormContainer = styled.div`
  margin-top: 20px;
`;
const ImagePreviewWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 12px;
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

const ImagePreview = styled.div`
  width: 100%;
  height: 100%;
  object-fit: cover;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageAndDetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;
`;
const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #f8fafc;
  border-radius: 8px;
  padding: 16px;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  background-color: white;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
`;

const DetailText = styled.span`
  font-size: 1rem;
  color: #1e293b;
  font-weight: 500;
  word-break: break-word;
  line-height: 1.5;
`;

const DoubleWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const Label = styled.label`
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
`;

const AuthorDetail = styled.div`
  flex: 1;
  background-color: white;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
`;

const AuthorNickname = styled.span`
  color: #2563eb;
  font-weight: 600;
  font-size: 1rem;
`;

const CreatedAtDetail = styled.div`
  flex: 1;
  background-color: white;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
`;

const DetailsAndInfoContainer = styled.div`
  flex: 2;
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;
const ImageContainer = styled.div`
  flex: 1;
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

const TextAreaWrapper = styled.div`
  margin-top: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 12px;
  font-size: 0.875rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  resize: vertical;
  background-color: #f9fafb;
  color: #475569;
  transition: border-color 0.2s;

  &:focus {
    border-color: #2563eb;
    outline: none;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  width: 120px;
`;

const ApproveButton = styled(Button)`
  background-color: #2563eb;
  color: white;
  border: none;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const RejectButton = styled(Button)`
  background-color: white;
  border: 1px solid #e2e8f0;
  color: #475569;

  &:hover {
    background-color: #f3f4f6;
  }
`;

export default PostApprovalPage;
