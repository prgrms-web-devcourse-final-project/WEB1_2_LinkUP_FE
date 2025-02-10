import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import WriteButton from './WriteButton';
import SearchBar from './SearchBar';
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
  const [searchTerm, setSearchTerm] = useState(''); // 입력된 검색어
  const [searchQuery, setSearchQuery] = useState(''); // 실제 검색 실행 시의 검색어

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

  // 검색 실행 핸들러
  const handleSearch = () => {
    setSearchQuery(searchTerm); // 검색어 설정
    setCurrentPage(1); // 검색 실행 시 페이지 초기화
  };

  // 카테고리 변경 시 검색 초기화 및 페이지 초기화
  useEffect(() => {
    setSearchQuery(''); // 검색 쿼리 초기화
    setSearchTerm(''); // 검색 입력 초기화
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
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSearch={handleSearch} // 검색 실행 핸들러
        />
      </ActionsContainer>

      {categoryFilteredPosts.length === 0 ? (
        <NoPostMessage>
          선택된 카테고리에 해당하는 게시글이 없습니다.
        </NoPostMessage>
      ) : currentPosts.length === 0 ? (
        <NoPostMessage>
          &apos;{searchQuery}&apos;의 검색 결과가 존재하지 않습니다.
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
              <PostTitle>{post.title}</PostTitle>
              <PostDetails>
                <PostAuthor>{post.nickname}</PostAuthor>
                <PostDate>
                  <PostCreatedAt>
                    {formatDateWithOffset(post.createdAt)}
                  </PostCreatedAt>
                  {selectedCategory !== 'NOT_APPROVED' && (
                    <>
                      {'~'}
                      <PostCloseAt>
                        {formatDateWithOffset(post.closeAt)}
                      </PostCloseAt>
                    </>
                  )}
                </PostDate>
                <PostJoinStatus>
                  참여 현황: {getParticipationCount(post.communityPostId)} /{' '}
                  {post.availableNumber}
                </PostJoinStatus>
              </PostDetails>
              <PostDescription>{post.description}</PostDescription>
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
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  max-width: 800px;
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  align-items: center;
  margin-bottom: 16px;
  gap: 20px; /* 버튼과 검색바 사이의 간격 */
`;

const PostItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 16px;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
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
  align-items: flex-start;
  height: 100%;
  padding: 4px 0;
`;

const PostTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 8px;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PostDescription = styled.p`
  font-size: 0.9rem;
  margin-bottom: 0;
  color: #555;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PostDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  font-size: 0.9rem;
  color: #777;
`;

const PostAuthor = styled.span`
  font-weight: 400;
`;

const PostDate = styled.span`
  font-weight: 400;
`;

const PostCreatedAt = styled.span`
  font-weight: 400;
  margin-right: 10px;
`;

const PostCloseAt = styled.span`
  font-weight: 400;
  margin-left: 10px;
`;

const PostJoinStatus = styled.div`
  font-weight: 400;
`;

const NoPostMessage = styled.p`
  text-align: center;
  color: #888;
  font-size: 1.2rem;
  padding: 20px;
`;

export default PostList;
