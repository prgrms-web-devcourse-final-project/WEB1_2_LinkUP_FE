import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import WriteButton from './WriteButton';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';
import { SSEEvent, AdminPost } from '../../types/postTypes';
import { formatDateWithOffset } from '../../utils/formatDate';
import { getImageSrc } from '../../utils/GetImageSrc';

interface PostListProps {
  selectedCategory: string;
  posts: AdminPost[];
  onPostSelect?: (postId: number) => void; // onPostSelect 추가
  realTimeData: Record<number, SSEEvent>; // 실시간 데이터 매핑 추가
}

const POSTS_PER_PAGE = 6; // 한 페이지에 표시할 게시글 수

const PostList: React.FC<PostListProps & { hideWriteButton?: boolean }> = ({
  selectedCategory,
  posts,
  realTimeData,
  onPostSelect,
  hideWriteButton,
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  // 선택된 카테고리에 따른 게시글 필터링
  const categoryFilteredPosts = posts
    .filter((post) => {
      if (!post) return false;
      if (selectedCategory === 'NOT_APPROVED') {
        return post.status === 'NOT_APPROVED' || post.status === 'REJECTED';
      }
      return (
        post.category === selectedCategory &&
        post.status !== 'NOT_APPROVED' &&
        post.status !== 'REJECTED'
      );
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ); // 최신순 정렬

  // 페이지네이션 계산
  const totalPages = Math.ceil(categoryFilteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = categoryFilteredPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  // 카테고리 변경 시 페이지 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // 글 작성 버튼 클릭 핸들러
  const handleWriteButtonClick = () => {
    navigate('/community/post/create', { state: { selectedCategory } }); // 카테고리 정보 전달
  };

  // 포스트 클릭 핸들러
  const handlePostClick = (communityPostId: number) => {
    if (onPostSelect) {
      onPostSelect(communityPostId); // 부모 컴포넌트에 선택 이벤트 전달
    }

    if (selectedCategory === 'NOT_APPROVED') {
      navigate(`/admin/post/approval/${communityPostId}`, {
        state: { communityPostId },
      }); // 승인 대기 페이지로 이동
    } else {
      navigate(`/community/post/${communityPostId}`); // 일반 포스트 상세 페이지로 이동
    }
  };

  // 특정 포스트의 현재 참여 수 계산
  const getParticipationCount = (postId: number): number => {
    return realTimeData[postId]?.participationCount || 0;
  };

  return (
    <Container>
      <ActionsContainer>
        {!hideWriteButton && <WriteButton onClick={handleWriteButtonClick} />}
      </ActionsContainer>

      {categoryFilteredPosts.length === 0 ? (
        <NoPostMessage>
          선택된 카테고리에 해당하는 게시글이 없습니다.
        </NoPostMessage>
      ) : (
        currentPosts.map((post) => (
          <PostItem
            key={post.communityPostId}
            onClick={() => handlePostClick(post.communityPostId)}
          >
            <PostImage
              src={getImageSrc(post.imageUrls[0])}
              alt={`post.title`}
            />
            <PostContent>
              <PostTitle>글 제목 : {post.title}</PostTitle>
              <PostDetails>
                <PostMeta>
                  <PostAuthor>작성자 : {post.nickname}</PostAuthor>
                  <PostDate>{formatDateWithOffset(post.createdAt)}</PostDate>
                </PostMeta>
                {selectedCategory !== 'NOT_APPROVED' && (
                  <PostDate>
                    <PostAuthor>
                      마감 기한 : 글 작성으로부터 {post.period}일
                    </PostAuthor>
                  </PostDate>
                )}
                <PostJoinStatus>
                  참여 현황: {getParticipationCount(post.communityPostId)} /{' '}
                  {post.availableNumber}
                </PostJoinStatus>
              </PostDetails>
            </PostContent>
          </PostItem>
        ))
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f8fafc;
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 24px;
`;

const PostItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 24px;
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const PostImage = styled.img`
  width: 172px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 16px;
`;
const PostContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 6px; /* 요소 간 간격 */
`;

const PostTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 4px;
`;

const PostAuthor = styled.span`
  color: #475569;
`;

const PostDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between; /* 작성자 & 날짜 한 줄 배치 */
  align-items: center;
  font-size: 0.875rem;
  color: #64748b;
`;

const PostDate = styled.span`
  font-size: 0.75rem;
  color: #94a3b8;
`;

const PostJoinStatus = styled.div`
  color: #2563eb;
  font-weight: 600;
`;

const NoPostMessage = styled.p`
  text-align: center;
  padding: 48px 20px;
  color: #94a3b8;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;
export default PostList;
