import React, { useState } from 'react';
import styled from 'styled-components';
import CategoryWrapper from '../../common/CategoryWrapper';
import PostList from '../../common/PostList';
import { POST_CATEGORIES } from './postCategories';

const CategoryBasedPostsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    POST_CATEGORIES[0].id // 초기 카테고리 설정
  );

  // 카테고리 변경 핸들러
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <CommunityPageContainer>
      <ContentWrapper>
        <Title>공구 모집 및 진행</Title>
        <Wrapper>
          <CategoryWrapper
            categories={POST_CATEGORIES}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </Wrapper>
        <PostList selectedCategory={selectedCategory} />
      </ContentWrapper>
    </CommunityPageContainer>
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

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: 50px;
`;
