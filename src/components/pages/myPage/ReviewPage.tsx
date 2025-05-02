import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getMyReviews } from '../../../api/reviewApi';
import { ReviewType } from '../../../types/review';
import SideMenu from './SideMenu';
import GS from './GS';
import Pagination from '../../common/Pagination';
import StarRating from '../../common/StarRating';

const ITEMS_PER_PAGE = 5;

const ReviewPage = () => {
  const [reviewData, setReviewData] = useState<ReviewType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const userId = sessionStorage.getItem('userid');
        setIsLoading(true);
        const data = await getMyReviews(Number(userId));
        setReviewData(data);
      } catch (error) {
        console.error('리뷰를 불러오는데 실패했습니다.', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const totalPages = reviewData
    ? Math.ceil(reviewData.reviews.length / ITEMS_PER_PAGE)
    : 0;
  const currentReviews = reviewData?.reviews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // 페이지 변경 시 상단으로 스크롤
  };

  return (
    <GS.Wrapper>
      <SideMenu />
      <GS.Content>
        <PageHeader>
          <Title>내가 받은 리뷰</Title>
          <SubTitle>
            다른 사용자들이 나에게 남긴 리뷰 내역을 확인해보세요.
          </SubTitle>
        </PageHeader>

        {isLoading ? (
          <LoadingState>
            <Spinner />
            리뷰를 불러오는 중...
          </LoadingState>
        ) : !reviewData || reviewData.reviews.length === 0 ? (
          <EmptyState>
            <EmptyIcon>📝</EmptyIcon>
            <EmptyText>아직 받은 리뷰가 없습니다.</EmptyText>
            <EmptyDescription>
              공동구매에 더 활발히 참여하시면 다른 사용자들로부터 리뷰를 받을 수
              있습니다.
            </EmptyDescription>
          </EmptyState>
        ) : (
          <>
            <AverageRatingCard>
              <AverageRatingHeader>
                <AverageLabel>평균 평점</AverageLabel>
                <Badge>{reviewData.reviews.length}개의 리뷰</Badge>
              </AverageRatingHeader>
              <AverageRatingContent>
                <BigRatingValue>{reviewData.rating.toFixed(1)}</BigRatingValue>
                <BigStarsContainer>
                  <StarRating rating={reviewData.rating} />
                </BigStarsContainer>
              </AverageRatingContent>
            </AverageRatingCard>

            <ReviewList>
              {currentReviews?.map((review, index) => (
                <ReviewItem key={`${review.reviewerId}-${index}`}>
                  <ReviewLeft>
                    <ReviewerProfile>
                      <ProfileInitial>
                        {review.nickname.charAt(0)}
                      </ProfileInitial>
                    </ReviewerProfile>
                    <ReviewerName>{review.nickname}</ReviewerName>
                  </ReviewLeft>
                  <ReviewRight>
                    <ReviewContent>{review.reviewContent}</ReviewContent>
                  </ReviewRight>
                </ReviewItem>
              ))}
            </ReviewList>

            {totalPages > 1 && (
              <PaginationWrapper>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </PaginationWrapper>
            )}
          </>
        )}
      </GS.Content>
    </GS.Wrapper>
  );
};

const PageHeader = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 8px;
`;

const SubTitle = styled.p`
  font-size: 16px;
  color: #64748b;
`;

const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  color: #64748b;
  font-size: 16px;
  gap: 12px;
`;

const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid rgba(59, 130, 246, 0.2);
  border-radius: 50%;
  border-top-color: #3b82f6;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  background-color: #f0f7ff;
  border-radius: 12px;
  border: 1px dashed #bfdbfe;
`;

const EmptyIcon = styled.div`
  font-size: 32px;
  margin-bottom: 12px;
`;

const EmptyText = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 8px;
`;

const EmptyDescription = styled.p`
  font-size: 14px;
  color: #64748b;
  text-align: center;
  max-width: 400px;
`;

const AverageRatingCard = styled.div`
  background: linear-gradient(145deg, #60a5fa, #93c5fd);
  color: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
`;

const AverageRatingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const AverageLabel = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const Badge = styled.span`
  background-color: rgba(255, 255, 255, 0.2);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
`;

const AverageRatingContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const BigRatingValue = styled.span`
  font-size: 48px;
  font-weight: 700;
  line-height: 1;
`;

const BigStarsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
`;

const ReviewItem = styled.div`
  padding: 16px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
  display: flex;
  gap: 20px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.08);
    border-color: #bfdbfe;
  }
`;

const ReviewLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100px;
  border-right: 1px solid #e5e7eb;
  padding-right: 16px;
`;

const ReviewerProfile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #60a5fa;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

const ProfileInitial = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
`;

const ReviewerName = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #3b82f6;
  margin-bottom: 6px;
  text-align: center;
`;

const ReviewRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ReviewContent = styled.p`
  font-size: 14px;
  color: #334155;
  line-height: 1.5;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

export default ReviewPage;
