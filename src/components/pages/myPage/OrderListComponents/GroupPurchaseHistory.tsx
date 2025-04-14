import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getCommunity, GroupPurchaseType } from '../../../../api/mypageApi';
import ReviewModal, { Question } from '../../../common/ReviewModal';
import { reviewUser } from '../../../../api/reviewApi';
import { getImageSrc } from '../../../../utils/GetImageSrc';

const GroupPurchaseHistory = () => {
  const [groupPurchaseList, setGroupPurchaseList] = useState<
    GroupPurchaseType[]
  >([]);

  //사용자 리뷰 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 리뷰 제출
  const handleSubmit = async (ratings: Question[], review: string) => {
    const reviewContent = {
      reviewerId: 2,
      hostId: 2,
      question1Score: ratings[0]?.rating ?? null,
      question2Score: ratings[1]?.rating ?? null,
      question3Score: ratings[2]?.rating ?? null,
      content: review,
    };

    try {
      await reviewUser(reviewContent);
      alert('리뷰가 성공적으로 제출되었습니다.');
      setIsModalOpen(false); // 모달 닫기
    } catch {
      alert('리뷰 제출에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroupPurchaseHistory = async () => {
      try {
        const response = await getCommunity();
        setGroupPurchaseList(response);
      } catch (error) {
        console.error('failed', error);
      }
    };
    fetchGroupPurchaseHistory();
  }, []);

  const getStatusLabel = (status: string): string => {
    return STATUS_MAP[status] || '알 수 없는 상태';
  };

  return (
    <Container>
      <OrderList>
        {groupPurchaseList.map((groupPurchase, idx) => (
          <GroupPurchaseItem key={idx}>
            <GroupPurchaseWrapper>
              <ImageContainer>
                {groupPurchase.imageUrls[0] !== '' ? (
                  <img
                    src={getImageSrc(groupPurchase.imageUrls[0])}
                    width={60}
                    height={60}
                  />
                ) : (
                  <ImagePlaceholder />
                )}
              </ImageContainer>
              <GroupPurchaseDetails>
                <ProductName>{groupPurchase.title}</ProductName>
                <ProductInfo>
                  Quantity: {groupPurchase.availableNumber}
                </ProductInfo>
                <StatusBadge status={groupPurchase.status}>
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
                groupPurchase.status === 'PAYMENT_COMPLETED') && (
                <>
                  <QRCodeButton>QR 코드 확인</QRCodeButton>
                  <ReviewLink onClick={() => setIsModalOpen(true)}>
                    <ReviewIcon src="/images/qricon.png" alt="review icon" />
                    <span>리뷰 작성하기</span>
                  </ReviewLink>
                </>
              )}

              {groupPurchase.status === 'NOT_APPROVED' && (
                <>
                  <CancelButton>주문 취소하기</CancelButton>
                </>
              )}
            </Actions>
          </GroupPurchaseItem>
        ))}
        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      </OrderList>
    </Container>
  );
};

const STATUS_MAP: { [key: string]: string } = {
  NOT_APPROVED: '승인대기',
  APPROVED: '승인완료',
  PAYMENT_STANDBY: '결제 대기',
  PAYMENT_COMPLETED: '결제 완료',
  REJECTED: '승인 거절',
  DELETED: '글 삭제',
};

const GroupPurchaseWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  width: 400px;
`;

const Container = styled.div`
  width: 97%;
  margin: 20px 0;
  background-color: #f5f9ff;
  padding: 20px;
  border-radius: 12px;
`;

const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const GroupPurchaseItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid #e0e8f7;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 83, 219, 0.05);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 83, 219, 0.1);
  }
`;

const ImageContainer = styled.div`
  flex-shrink: 0;

  img {
    border-radius: 10px;
    object-fit: cover;
    border: 1px solid #e0e8f7;
  }
`;

const ImagePlaceholder = styled.div`
  width: 100px;
  height: 100px;
  background-color: #e8f0fe;
  border-radius: 10px;
  border: 1px dashed #a0c0ff;
`;

const GroupPurchaseDetails = styled.div`
  margin-left: 20px;
`;

const ProductName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #1a3b7a;
`;

const ProductInfo = styled.div`
  font-size: 14px;
  color: #5b7aac;
  margin-top: 4px;
`;

const StatusBadge = styled.div<{ status: string }>`
  margin-top: 10px;
  font-size: 12px;
  font-weight: bold;
  display: inline-block;
  padding: 4px 10px;
  border-radius: 20px;

  ${({ status }) => {
    if (status === 'APPROVED' || status === 'PAYMENT_COMPLETED') {
      return `
        color: #0062ff;
        background-color: rgba(0, 98, 255, 0.1);
        border: 1px solid rgba(0, 98, 255, 0.3);
      `;
    } else if (status === 'REJECTED' || status === 'DELETED') {
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
  color: #1a3b7a;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ActionButton = styled.div`
  background: #fff;
  color: #0053db;
  border: 1px solid #0053db;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0053db;
    color: #fff;
  }
`;

const CancelButton = styled.div`
  background: #fff;
  color: #ff3a4c;
  border: 1px solid #ff3a4c;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: #ff3a4c;
    color: #fff;
  }
`;

const ReviewLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  margin-top: 8px;
  color: #0053db;
  transition: color 0.2s ease;

  span {
    border-bottom: 1px solid #0053db;
  }

  &:hover {
    color: #003ca0;

    span {
      border-bottom: 1px solid #003ca0;
    }
  }
`;

const ReviewIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const QRCodeButton = styled.div`
  background: #0053db;
  color: #fff;
  border: 1px solid #0053db;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: #003ca0;
    border-color: #003ca0;
  }
`;

export default GroupPurchaseHistory;
