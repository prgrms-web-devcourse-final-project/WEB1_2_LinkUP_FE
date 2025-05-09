import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getCommunity, GroupPurchaseType } from '../../../../api/mypageApi';
import ReviewModal, { Question } from '../../../common/ReviewModal';
import { reviewUser } from '../../../../api/reviewApi';
import { getImageSrc } from '../../../../utils/GetImageSrc';
import DEFAULT_IMG from '../../../../assets/icons/default-featured-image.png.jpg';
import Pagination from '../../../common/Pagination';

const GroupPurchaseHistory = () => {
  const [groupPurchaseList, setGroupPurchaseList] = useState<
    GroupPurchaseType[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const myId = sessionStorage.getItem('userid');
  //사용자 리뷰 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroupPurchase, setSelectedGroupPurchase] =
    useState<GroupPurchaseType | null>(null);
  const handleSubmit = async (ratings: Question[], review: string) => {
    if (!selectedGroupPurchase) return;

    const reviewContent = {
      reviewerId: Number(myId),
      hostId: selectedGroupPurchase.userId,
      question1Score: ratings[0]?.rating ?? null,
      question2Score: ratings[1]?.rating ?? null,
      question3Score: ratings[2]?.rating ?? null,
      content: review,
    };

    try {
      await reviewUser(reviewContent);
      setIsModalOpen(false);
    } catch {
      // 에러는 reviewApi에서 처리
    }
  };

  const handleReviewClick = (groupPurchase: GroupPurchaseType) => {
    setSelectedGroupPurchase(groupPurchase);
    setIsModalOpen(true);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroupPurchaseHistory = async () => {
      try {
        const response = await getCommunity();
        // 작성일자가 최신순으로 정렬
        const sortedGroupPurchases = response.sort(
          (a: GroupPurchaseType, b: GroupPurchaseType) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setGroupPurchaseList(sortedGroupPurchases);
      } catch (error) {
        console.error('failed', error);
      }
    };
    fetchGroupPurchaseHistory();
  }, []);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusLabel = (status: string): string => {
    return STATUS_MAP[status] || '알 수 없는 상태';
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedGroupPurchases = groupPurchaseList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container>
      <OrderList>
        {paginatedGroupPurchases.map((groupPurchase, idx) => (
          <GroupPurchaseItem key={idx}>
            <GroupPurchaseWrapper>
              <ImageContainer>
                <ProductImage
                  src={
                    groupPurchase.imageUrls[0]
                      ? getImageSrc(groupPurchase.imageUrls[0])
                      : DEFAULT_IMG
                  }
                  alt={groupPurchase.title}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = DEFAULT_IMG;
                  }}
                />
              </ImageContainer>
              <GroupPurchaseDetails>
                <ProductName>
                  공동구매 글 제목 : {groupPurchase.title}
                </ProductName>
                <ProductInfo>수량: {groupPurchase.availableNumber}</ProductInfo>
                <ProductInfo>
                  작성일: {formatDate(groupPurchase.createdAt)}
                </ProductInfo>
                <StatusBadge $status={groupPurchase.status}>
                  {getStatusLabel(groupPurchase.status)}
                </StatusBadge>
              </GroupPurchaseDetails>
            </GroupPurchaseWrapper>
            <Price>{groupPurchase.unitAmount}원</Price>
            <Actions>
              <ActionButton
                onClick={() => {
                  navigate(`/community/post/${groupPurchase.communityPostId}`);
                }}
              >
                상품 페이지 이동
              </ActionButton>
              {(groupPurchase.status === 'APPROVED' ||
                groupPurchase.status === 'PAYMENT_COMPLETED') &&
                Number(groupPurchase.userId) !== Number(myId) && (
                  <ReviewLink onClick={() => handleReviewClick(groupPurchase)}>
                    <ReviewIcon src="/images/qricon.png" alt="review icon" />
                    <span>리뷰 작성하기</span>
                  </ReviewLink>
                )}

              {groupPurchase.status === 'NOT_APPROVED' && (
                <CancelButton>주문 취소하기</CancelButton>
              )}
            </Actions>
          </GroupPurchaseItem>
        ))}
      </OrderList>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(groupPurchaseList.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedGroupPurchase(null);
        }}
        onSubmit={handleSubmit}
      />
    </Container>
  );
};

const STATUS_MAP: { [key: string]: string } = {
  NOT_APPROVED: '승인대기',
  APPROVED: '승인완료',
  PAYMENT_STANDBY: '결제 대기 중',
  PAYMENT_COMPLETED: '결제 완료',
  REJECTED: '승인 거절',
  DELETED: '글 삭제',
};

const Container = styled.div`
  width: 97%;
  margin: 20px auto;
  background-color: #f5f9ff;
  padding: 24px;
  border-radius: 12px;
`;

const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const GroupPurchaseItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border: 1px solid #e0e8f7;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 83, 219, 0.05);
  transition: transform 0.2s ease;
  gap: 24px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 83, 219, 0.1);
  }
`;

const GroupPurchaseWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 16px;
  flex: 1;
`;

const ImageContainer = styled.div`
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e0e8f7;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const GroupPurchaseDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const ProductName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #1a3b7a;
`;

const ProductInfo = styled.div`
  font-size: 14px;
  color: #5b7aac;
`;

const StatusBadge = styled.div<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 20px;
  width: 100px;
  box-sizing: border-box;

  ${({ $status }) => {
    if ($status === 'APPROVED' || $status === 'PAYMENT_COMPLETED') {
      return `
        color: #0062ff;
        background-color: rgba(0, 98, 255, 0.1);
        border: 1px solid rgba(0, 98, 255, 0.3);
      `;
    } else if ($status === 'REJECTED' || $status === 'DELETED') {
      return `
        color: #ff3a4c;
        background-color: rgba(255, 58, 76, 0.1);
        border: 1px solid rgba(255, 58, 76, 0.3);
      `;
    } else {
      return `
        color: #ff8a00;
        background-color: rgba(255, 138, 0, 0.1);
        border: 1px solid rgba(255, 138, 0, 0.3);
      `;
    }
  }}
`;

const Price = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #2a5985;
  margin-right: 30%;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 140px;
`;

const ActionButton = styled.button`
  background: #fff;
  color: #3b7fc4;
  border: 1px solid #3b7fc4;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: #3b7fc4;
    color: #fff;
  }
`;

const CancelButton = styled.button`
  background: #fff;
  color: #d35858;
  border: 1px solid #d35858;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: #d35858;
    color: #fff;
  }
`;

const ReviewLink = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  margin-top: 6px;
  font-size: 14px;
  color: #3b7fc4;
  padding: 4px 0;

  span {
    border-bottom: 1px solid #3b7fc4;
    font-weight: 500;
  }

  &:hover {
    color: #2d6cae;

    span {
      border-bottom: 1px solid #2d6cae;
    }
  }
`;

const ReviewIcon = styled.img`
  width: 16px;
  height: 16px;
`;

export default GroupPurchaseHistory;
