import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { ADMIN_CATEGORIES } from './adminCategories';
import CategoryWrapper from '../../../components/common/CategoryWrapper';
import PostList from '../../../components/common/PostList';
import { useAtom } from 'jotai';
import { realTimeDataAtom, selectedPostIdAtom } from '../../../store/postStore';
import { POST_STATUS, SSEEvent } from '../../../types/postTypes';
import { usePendingPostsQuery } from '../../../hooks/useGetPage';
import { QueryHandler } from '../../../hooks/useGetProduct';

const PostManagementPage = () => {
  const location = useLocation();
  const initialCategory = location.state?.selectedCategory || 'NOT_APPROVED';
  const [selectedCategory, setSelectedCategory] =
    useState<POST_STATUS>(initialCategory);
  const [, setSelectedPostId] = useAtom(selectedPostIdAtom); // 선택된 포스트 ID 설정 함수
  const [realTimeData] = useAtom(realTimeDataAtom); // 실시간 데이터 상태

  // `realTimeData`를 안전하게 변환
  const formattedRealTimeData: Record<number, SSEEvent> =
    typeof realTimeData === 'object' && realTimeData !== null
      ? (realTimeData as unknown as Record<number, SSEEvent>)
      : {};

  const { data: posts, isLoading, isError } = usePendingPostsQuery();

  // 포스트 선택 핸들러
  const handlePostSelect = (postId: number) => {
    setSelectedPostId(postId);
  };

  return (
    <QueryHandler isLoading={isLoading} isError={isError}>
      <PageContainer>
        <ContentWrapper>
          <Title>관리자 페이지</Title>
          <Header>
            <Wrapper>
              <CategoryWrapper
                categories={ADMIN_CATEGORIES}
                selectedCategory={selectedCategory}
                onCategoryChange={(id: string) =>
                  setSelectedCategory(id as POST_STATUS)
                }
                title="게시글 관리"
              />
            </Wrapper>
          </Header>
          <PostList
            selectedCategory={selectedCategory}
            posts={posts || []}
            hideWriteButton
            realTimeData={formattedRealTimeData} // 변환된 realTimeData 전달
            onPostSelect={handlePostSelect}
          />
        </ContentWrapper>
      </PageContainer>
    </QueryHandler>
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

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: 50px;
`;
