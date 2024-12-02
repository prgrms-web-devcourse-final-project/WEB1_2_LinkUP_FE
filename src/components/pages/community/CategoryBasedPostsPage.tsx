import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import CategoryWrapper from '../../common/CategoryWrapper';
import PostList from '../../common/PostList';
import ScrollToTopButton from '../../common/ScrollToTopButton';
import { POST_CATEGORIES } from './postCategories';

const CategoryBasedPostsPage = () => {
  const location = useLocation();
  const initialCategory = location.state?.selectedCategory || '생활용품'; // 전달받은 상태 또는 기본값
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  return (
    <div>
      <CommunityPageContainer>
        <ContentWrapper>
          <Title>공구 모집 및 진행</Title>
          <CategoryWrapper
            categories={POST_CATEGORIES}
            selectedCategory={selectedCategory} // 현재 선택된 카테고리를 전달
            onCategoryChange={
              (categoryId: string) => setSelectedCategory(categoryId) // 카테고리 변경 시 상태 업데이트
            }
          />
          <PostList selectedCategory={selectedCategory} posts={[]} />
        </ContentWrapper>
      </CommunityPageContainer>
      <ScrollToTopButton />
    </div>
  );
};

export default CategoryBasedPostsPage;

const CommunityPageContainer = styled.div`
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
