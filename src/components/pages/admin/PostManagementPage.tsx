import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { ADMIN_CATEGORIES } from './adminCategories';
import CategoryWrapper from '../../../components/common/CategoryWrapper';
import PostList from '../../../components/common/PostList';
import { fetchPendingPosts } from './api/adminApi';
import { useAtom } from 'jotai';
import { realTimeDataAtom, selectedPostIdAtom } from '../../../store/postStore';
import { Post, POST_STATUS, SSEEvent } from '../../../types/postTypes';

const PostManagementPage = () => {
  const location = useLocation();
  const initialCategory = location.state?.selectedCategory || 'NOT_APPROVED';
  const [selectedCategory, setSelectedCategory] =
    useState<POST_STATUS>(initialCategory);
  const [posts, setPosts] = useState<Post[]>([]);
  const [, setSelectedPostId] = useAtom(selectedPostIdAtom); // 선택된 포스트 ID 설정 함수
  const [realTimeData] = useAtom(realTimeDataAtom); // 실시간 데이터 상태

  // `realTimeData`를 안전하게 변환
  const formattedRealTimeData: Record<number, SSEEvent> =
    typeof realTimeData === 'object' && realTimeData !== null
      ? (realTimeData as unknown as Record<number, SSEEvent>)
      : {};

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetchPendingPosts();
      setPosts(response);
    };

    fetchPosts();
  }, [selectedCategory]);

  // 포스트 선택 핸들러
  const handlePostSelect = (postId: number) => {
    setSelectedPostId(postId);
  };

  return (
    <div>
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
            posts={posts}
            hideWriteButton
            realTimeData={formattedRealTimeData} // 변환된 realTimeData 전달
            onPostSelect={handlePostSelect}
          />
        </ContentWrapper>
      </PageContainer>
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

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: 50px;
`;
