import React, { useState } from 'react';
import CategoryWrapper from '../../common/CategoryWrapper';
import PostList from '../../common/PostList';
import ScrollToTopButton from '../../common/ScrollToTopButton';

const CommunityPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('생활용품'); // 기본값: 생활용품

  return (
    <div>
      <h1>공구 모집 및 진행</h1>
      <CategoryWrapper
        onCategoryChange={(categoryName) => setSelectedCategory(categoryName)}
      />
      <PostList selectedCategory={selectedCategory} />
      <ScrollToTopButton />
    </div>
  );
};

export default CommunityPage;
