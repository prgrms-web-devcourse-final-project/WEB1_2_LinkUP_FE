import React, { useState } from 'react';
import styled from 'styled-components';
import CategoryWrapper from '../../common/CategoryWrapper';
import PostList from '../../common/PostList';
import ScrollToTopButton from '../../common/ScrollToTopButton';

const CommunityPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('생활용품'); // 기본값: 생활용품

  return (
    <div>
      <CommunityPageContainer>
        <ContentWrapper>
          <h1>공구 모집 및 진행</h1>
          <CategoryWrapper
            onCategoryChange={(categoryName) =>
              setSelectedCategory(categoryName)
            }
          />
          <PostList selectedCategory={selectedCategory} />
        </ContentWrapper>
      </CommunityPageContainer>
      <ScrollToTopButton />
    </div>
  );
};

export default CommunityPage;

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
