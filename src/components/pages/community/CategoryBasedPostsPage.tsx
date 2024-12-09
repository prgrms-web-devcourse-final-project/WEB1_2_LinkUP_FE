import React, { useState } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import {
  postsAtom,
  selectedPostIdAtom,
  realTimeDataAtom,
} from '../../../store/postStore';
import CategoryWrapper from '../../common/CategoryWrapper';
import PostList from '../../common/PostList';
import { POST_CATEGORIES } from './postCategories';
import { Post, SSEEvent } from '../../../types/postTypes';

const CategoryBasedPostsPage = () => {
  const [postsAtomState] = useAtom(postsAtom); // 전체 포스트 상태
  const posts = postsAtomState?.data || []; // Query 결과에서 data 추출
  const [realTimeData] = useAtom(realTimeDataAtom); // 실시간 데이터 상태
  const [selectedCategory, setSelectedCategory] = useState<string>(
    POST_CATEGORIES[0].id // 초기 카테고리 설정
  );
  const [, setSelectedPostId] = useAtom(selectedPostIdAtom); // 선택된 포스트 ID 설정 함수

  // `realTimeData`를 안전하게 변환
  const formattedRealTimeData: Record<number, SSEEvent> =
    typeof realTimeData === 'object' && realTimeData !== null
      ? (realTimeData as unknown as Record<number, SSEEvent>)
      : {};

  // 카테고리 변경 핸들러
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  // 포스트 선택 핸들러
  const handlePostSelect = (postId: number) => {
    setSelectedPostId(postId);
  };

  return (
    <div>
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
          <PostList
            selectedCategory={selectedCategory}
            posts={posts as Post[]} // 데이터 형식을 명시적으로 지정
            realTimeData={formattedRealTimeData} // 변환된 realTimeData 전달
            onPostSelect={handlePostSelect}
          />
        </ContentWrapper>
      </CommunityPageContainer>
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

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: 50px;
`;
