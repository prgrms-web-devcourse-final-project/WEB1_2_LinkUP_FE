import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { mockCommunityPosts } from '../../mocks/communityPosts';
import Pagination from './Pagination';

const POSTS_PER_PAGE = 6; // 한 페이지에 표시할 게시글 수

const PostList = ({ selectedCategory }: { selectedCategory: string }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // 선택된 카테고리의 게시글 필터링
  const filteredPosts = mockCommunityPosts
    .filter((post) =>
      post.categories.some((category) => category.name === selectedCategory)
    )
    .sort((a, b) => {
      // 최신순 정렬 (createdAt 기준)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  // 카테고리 변경 시 페이지를 1페이지로 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  return (
    <Container>
      {currentPosts.length > 0 ? (
        currentPosts.map((post) => (
          <PostItem key={post.postId}>
            <PostImage src={post.images[0]} alt={post.title} />
            <PostContent>
              <PostTitle>{post.title}</PostTitle>
              <PostDetails>
                <PostAuthor>{post.authorId}</PostAuthor>
                <PostCreatedAt>
                  {new Date(post.createdAt).toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}
                </PostCreatedAt>
                {'~'}
                <PostCloseAt>
                  {new Date(post.closeAt).toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}
                </PostCloseAt>
                <PostJoinStatus>
                  참여 현황: {post.currentQuantity} / {post.requiredQuantity}
                </PostJoinStatus>
              </PostDetails>
              <PostDescription>{post.content}</PostDescription>
            </PostContent>
          </PostItem>
        ))
      ) : (
        <NoPostMessage>
          선택된 카테고리에 해당하는 게시글이 없습니다.
        </NoPostMessage>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  max-width: 800px;
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

const PostCreatedAt = styled.span`
  font-weight: 400;
`;

const PostCloseAt = styled.span`
  font-weight: 400;
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
