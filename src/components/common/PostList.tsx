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

interface PostListProps {
  selectedCategory: string;
}

const POSTS_PER_PAGE = 6; // 한 페이지에 표시할 게시글 수

const PostList: React.FC<PostListProps> = ({ selectedCategory }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const { data: posts, isLoading, isError } = usePostsQuery();
  const [ratingsMap, setRatingsMap] = useState<Record<number, number>>({}); // userId -> rating
  // 리뷰 데이터 fetch
  useEffect(() => {
    const fetchRatings = async () => {
      if (!posts) return;

      const userIds = [...new Set(posts.map((post) => post.userId))];

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

  // 선택된 카테고리에 따른 게시글 필터링
  const categoryFilteredPosts = posts
    ? posts
        .filter((post: AdminPost) => {
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
        )
    : []; // 최신순 정렬

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
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
    navigate(`/community/post/${communityPostId}`);
  };

  return (
    <QueryHandler isLoading={isLoading} isError={isError}>
      <Container>
        <ActionsContainer>
          {<WriteButton onClick={handleWriteButtonClick} />}
        </ActionsContainer>

        {categoryFilteredPosts.length === 0 ? (
          <NoPostMessage>
            선택된 카테고리에 해당하는 게시글이 없습니다.
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

const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 24px;
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
