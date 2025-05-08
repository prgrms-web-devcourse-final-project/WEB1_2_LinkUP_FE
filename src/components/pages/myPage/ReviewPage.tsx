import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getMyReviews } from '../../../api/reviewApi';
import { ReviewType } from '../../../types/review';
import SideMenu from './SideMenu';
import GS from './GS';
import Pagination from '../../common/Pagination';
import { PageTitle } from './OrderListPage';

const ITEMS_PER_PAGE = 10; // 한 페이지에 표시할 카드 수
const MAX_CONTENT_LENGTH = 80; // 내용 미리보기 최대 길이 (글자수)

// 모달 컴포넌트 인터페이스 정의
interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: {
    reviewerId: number;
    nickname: string;
    reviewContent: string;
  };
}

// 모달 컴포넌트
const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  review,
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ProfileInitial>{review.nickname.charAt(0)}</ProfileInitial>
          <ReviewerName>{review.nickname}</ReviewerName>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          <FullReviewContent>{review.reviewContent}</FullReviewContent>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

// 리뷰 카드를 위한 인터페이스 정의
interface ReviewCardProps {
  review: {
    reviewerId: number;
    nickname: string;
    reviewContent: string;
  };
}

// 리뷰 카드 컴포넌트
const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 글자 수 기준으로 내용이 긴지 확인
  const isLongContent = review.reviewContent.length > MAX_CONTENT_LENGTH;

  // 표시할 내용 처리 (글자 수 제한)
  const displayContent = isLongContent
    ? `${review.reviewContent.substring(0, MAX_CONTENT_LENGTH)}...`
    : review.reviewContent;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ReviewItem>
        <ReviewHeader>
          <ProfileInitial>{review.nickname.charAt(0)}</ProfileInitial>
          <ReviewerName>{review.nickname}</ReviewerName>
        </ReviewHeader>

        <ReviewContentWrapper>
          <ReviewContent>{displayContent}</ReviewContent>

          {isLongContent && (
            <ShowMoreButton onClick={openModal}>더보기</ShowMoreButton>
          )}
        </ReviewContentWrapper>
      </ReviewItem>

      <ReviewModal isOpen={isModalOpen} onClose={closeModal} review={review} />
    </>
  );
};

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
          <PageTitle>내가 받은 리뷰</PageTitle>
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
            <ReviewGrid>
              {currentReviews?.map((review, index) => (
                <ReviewCard
                  key={`${review.reviewerId}-${index}`}
                  review={review}
                />
              ))}
            </ReviewGrid>

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

// 그리드 레이아웃
const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

// 카드 스타일
const ReviewItem = styled.div`
  width: 250px;
  aspect-ratio: 1.9 / 0.9;
  padding: 20px;
  background-color: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(59, 130, 246, 0.15);
    border-color: #bfdbfe;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 16px;
`;

const ProfileInitial = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #60a5fa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
`;

const ReviewerName = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: #1e3a8a;
  margin: 0;
`;

const ReviewContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  overflow: hidden;
`;

const ReviewContent = styled.p`
  font-size: 14px;
  color: #334155;
  line-height: 1.6;
  margin: 0;
  overflow: hidden;
  flex: 1;
`;

const ShowMoreButton = styled.button`
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 14px;
  font-weight: 500;
  padding: 0;
  cursor: pointer;
  align-self: flex-start;
  margin-top: auto;

  &:hover {
    text-decoration: underline;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

// 모달 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 0;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;
  background: none;
  border: none;
  font-size: 24px;
  color: #64748b;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;

  &:hover {
    background-color: #f1f5f9;
    color: #0f172a;
  }
`;

const ModalBody = styled.div`
  padding: 20px;
  overflow-y: auto;
  max-height: calc(80vh - 80px);
`;

const FullReviewContent = styled.p`
  font-size: 16px;
  color: #334155;
  line-height: 1.8;
  margin: 0;
  white-space: pre-wrap;
`;

export default ReviewPage;
