import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { ADMIN_CATEGORIES } from './adminCategories';
import CategoryWrapper from '../../../components/common/CategoryWrapper';
import PostList from '../../../components/common/PostList';
import { Post } from '../community/api/postApi';
import { fetchAdminPosts } from './api/adminApi';
import ScrollToTopButton from '../../common/ScrollToTopButton';

const PostManagementPage = () => {
  const location = useLocation();
  const initialCategory = location.state?.selectedCategory || 'NOT_APPROVED';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetchAdminPosts(selectedCategory);

        // '작성글 게시 승인 대기 목록' 카테고리에서는 'NOT_APPROVED' 또는 'REJECTED' 상태의 포스트만 표시
        if (selectedCategory === 'NOT_APPROVED') {
          setPosts(
            response.filter(
              (post) =>
                post.status === 'NOT_APPROVED' || post.status === 'REJECTED'
            )
          );
        } else {
          setPosts(response); // 다른 카테고리는 전체 포스트 표시
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, [selectedCategory]);

  return (
    <div>
      <PageContainer>
        <ContentWrapper>
          <Title>관리자 페이지</Title>
          <Header>
            <CategoryWrapper
              categories={ADMIN_CATEGORIES}
              selectedCategory={selectedCategory}
              onCategoryChange={(id: string) => setSelectedCategory(id)}
              title="게시글 관리" // 제목 변경
            />
          </Header>
          <PostList
            posts={posts}
            selectedCategory={selectedCategory}
            hideWriteButton
          />
        </ContentWrapper>
      </PageContainer>
      <ScrollToTopButton />
    </div>
  );
};

export default PostManagementPage;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center; /* 세로 가운데 정렬 */
  justify-content: flex-start;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: left;
`;
