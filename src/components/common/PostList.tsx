import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import WriteButton from './WriteButton';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';
import { usePostsQuery } from '../../hooks/useGetPost';
import { QueryHandler } from '../../hooks/useGetProduct';
import { AdminPost } from '../../types/postTypes';
import PostItem from './PostItem';
import { getMyReviews } from '../../api/reviewApi';
import SearchPostBar from './SearchPostBar';

interface PostListProps {
  selectedCategory: string;
}

const POSTS_PER_PAGE = 6; // 한 페이지에 표시할 게시글 수

const PostList: React.FC<PostListProps> = ({ selectedCategory }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const { data: posts, isLoading, isError } = usePostsQuery();
  const [ratingsMap, setRatingsMap] = useState<Record<number, number>>({}); // userId -> rating
  const myId = sessionStorage.getItem('userid');
  const numericMyId = Number(myId);

  // 리뷰 데이터 fetch
  useEffect(() => {
    const fetchRatings = async () => {
      if (!posts) return;

      const userIds = [
        ...new Set(
          posts
            .filter((post) => post.userId !== numericMyId)
            .map((post) => post.userId)
        ),
      ];

      const results = await Promise.all(
        userIds.map(async (userId) => {
          try {
            const data = await getMyReviews(userId);
            return { userId, rating: data.rating ?? 0 };
          } catch {
            return { userId, rating: 0 };
          }
        })
      );

      const newRatingsMap: Record<number, number> = {};
      results.forEach(({ userId, rating }) => {
        newRatingsMap[userId] = rating;
      });

      setRatingsMap(newRatingsMap);
    };

    fetchRatings();
  }, [posts]);

  // 검색어에 따라 필터링
  const filteredPosts = posts
    ? posts
        .filter((post: AdminPost) => {
          if (!post) return false;
          // 카테고리 필터링
          const categoryMatch =
            selectedCategory === 'NOT_APPROVED'
              ? post.status === 'NOT_APPROVED' || post.status === 'REJECTED'
              : post.category === selectedCategory &&
                post.status !== 'NOT_APPROVED' &&
                post.status !== 'REJECTED';

          // 검색어 필터링 (대소문자 구분 없이)
          const searchMatch =
            searchTerm === '' ||
            post.title.toLowerCase().includes(searchTerm.toLowerCase());

          return categoryMatch && searchMatch;
        })
        .sort((a, b) => {
          const aIsMine = a.userId === numericMyId;
          const bIsMine = b.userId === numericMyId;

          // 내 게시글이면 무조건 앞으로
          if (aIsMine && !bIsMine) return -1;
          if (!aIsMine && bIsMine) return 1;

          // 둘 다 내 글 or 둘 다 다른 글이면 평점순
          const aRating = ratingsMap[a.userId] ?? 0;
          const bRating = ratingsMap[b.userId] ?? 0;
          return bRating - aRating;
        })
    : [];

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  // 검색어 또는 카테고리 변경 시 페이지 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  // 글 작성 버튼 클릭 핸들러
  const handleWriteButtonClick = () => {
    navigate('/community/post/create', { state: { selectedCategory } }); // 카테고리 정보 전달
  };

  // 포스트 클릭 핸들러
  const handlePostClick = (communityPostId: number) => {
    navigate(`/community/post/${communityPostId}`);
  };

  return (
    <QueryHandler isLoading={isLoading} isError={isError}>
      <Container>
        <TopActionsContainer>
          <SearchPostBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            placeholder="제목으로 검색"
          />
          <WriteButton onClick={handleWriteButtonClick} />
        </TopActionsContainer>

        {filteredPosts.length === 0 ? (
          <NoPostMessage>
            {searchTerm
              ? `"${searchTerm}" 검색 결과가 없습니다.`
              : '선택된 카테고리에 해당하는 게시글이 없습니다.'}
          </NoPostMessage>
        ) : (
          currentPosts.map((post) => (
            <PostItem
              key={post.communityPostId}
              post={post}
              selectedCategory={selectedCategory}
              onClick={() => handlePostClick(post.communityPostId)}
              rating={ratingsMap[post.userId]}
            />
          ))
        )}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </Container>
    </QueryHandler>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f8fafc;
`;

const TopActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;
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
