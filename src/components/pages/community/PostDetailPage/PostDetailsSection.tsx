import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { POST_STATUS } from '../../../../types/postTypes';
import { formatDateWithOffset } from '../../../../utils/formatDate';
import RefundFormPage from '../../Payment/RefundFormPage';

interface PostDetailsSectionProps {
  postId: number;
  remainQuantity: number | undefined;
  isWriter: boolean | undefined;
  selectedPost: {
    title: string;
    nickname: string;
    createdAt: string;
    category: string;
    availableNumber: number;
    totalAmount: number;
    unitAmount: number;
    status: string;
  } | null;
  quantity: number;
  isParticipant: boolean;
  isNotParticipant: boolean;
  remainingTime: string;
  paymentRemainingTime: string;
  handleQuantityChange: (change: number) => void;
  handleJoin: () => void;
  handleCancel: () => void;
  handleDelete: () => void;
  handlePayment: () => void;
}

const PostDetailsSection: React.FC<PostDetailsSectionProps> = ({
  postId,
  isWriter,
  remainQuantity,
  selectedPost,
  quantity,
  isParticipant,
  isNotParticipant,
  remainingTime,
  paymentRemainingTime,
  handleQuantityChange,
  handleCancel,
  handleJoin,
  handleDelete,
  handlePayment,
}) => {
  if (!selectedPost) return null;
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <DetailsAndInfoContainer>
      <DetailsContainer>
        <Detail>
          <Label>제목</Label>
          <DetailText>{selectedPost.title}</DetailText>
        </Detail>
        <DoubleWrapper>
          <AuthorDetail>
            <Label>작성자</Label>
            <AuthorNickname>{selectedPost.nickname}</AuthorNickname>
          </AuthorDetail>
          <Detail>
            <Label>참여 현황</Label>{' '}
            {selectedPost.availableNumber - (remainQuantity ?? 0)}
            {' / '}
            {selectedPost.availableNumber}
          </Detail>
          <Detail>
            <Label>개당 가격</Label>{' '}
            {selectedPost?.unitAmount?.toLocaleString() ?? '0'} 원
          </Detail>
          <Detail>
            <Label>총 가격</Label>{' '}
            {selectedPost?.totalAmount.toLocaleString() ?? '0'} 원
          </Detail>
          <Detail>
            <Label>수량</Label>
            <Quantity>
              {selectedPost.status === POST_STATUS.APPROVED &&
              isNotParticipant ? (
                <>
                  <FaMinusCircle onClick={() => handleQuantityChange(-1)} />
                  <span>{quantity}</span>
                  <FaPlusCircle onClick={() => handleQuantityChange(1)} />
                </>
              ) : (selectedPost.status === POST_STATUS.APPROVED &&
                  isParticipant) ||
                selectedPost.status === POST_STATUS.PAYMENT_STANDBY ? (
                <span>{quantity}</span>
              ) : null}
            </Quantity>
          </Detail>

          <CreatedAtDetail>
            <Label>작성일</Label>
            <Date>
              {formatDateWithOffset(selectedPost.createdAt).toLocaleString()}
            </Date>
          </CreatedAtDetail>
        </DoubleWrapper>
        <DoubleWrapper>
          <Detail>
            <Label>카테고리</Label> {selectedPost.category}
          </Detail>
          <Detail>
            <Label>모집 마감</Label> {remainingTime}
          </Detail>
          {selectedPost.status === 'PAYMENT_STANDBY' && (
            <Detail>
              <Label>결제 마감</Label>
              <DetailText>{paymentRemainingTime}</DetailText>
            </Detail>
          )}
          {isParticipant && (
            <Detail>
              <Label>결제 금액</Label>
              <PaymentAmount>
                {(quantity * selectedPost.unitAmount).toLocaleString()} 원
              </PaymentAmount>
            </Detail>
          )}
        </DoubleWrapper>
      </DetailsContainer>
      <ButtonContainer>
        <ActionButtons>
          {selectedPost.status === POST_STATUS.PAYMENT_COMPLETED ? (
            <ActionButton
              $primary
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              환불
            </ActionButton>
          ) : selectedPost.status === POST_STATUS.PAYMENT_STANDBY ? (
            <>
              <ActionButton $primary onClick={handlePayment}>
                결제
              </ActionButton>
              <ActionButton onClick={handleCancel}>취소</ActionButton>
            </>
          ) : (
            selectedPost.status === POST_STATUS.APPROVED &&
            remainingTime !== '마감되었습니다.' && (
              <>
                {!isParticipant ? (
                  <>
                    <ActionButton $primary onClick={handleJoin}>
                      참여
                    </ActionButton>
                    {isWriter && (
                      <ActionButton onClick={handleDelete}>삭제</ActionButton>
                    )}
                  </>
                ) : (
                  <>
                    <ActionButton $primary onClick={handlePayment}>
                      결제
                    </ActionButton>
                    <ActionButton onClick={handleCancel}>
                      {isWriter ? '취소(삭제)' : '취소'}
                    </ActionButton>
                  </>
                )}
              </>
            )
          )}
        </ActionButtons>
      </ButtonContainer>

      <RefundFormPage
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        postId={postId}
      />
    </DetailsAndInfoContainer>
  );
};

export default PostDetailsSection;
const DetailsAndInfoContainer = styled.div`
  flex: 2;
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #f9fafb;
  border-radius: 8px;
  padding: 16px;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`;

const DoubleWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const Label = styled.label`
  font-size: 0.875rem;
  color: #475569;
  font-weight: 600;
`;

const DetailText = styled.span`
  font-size: 1rem;
  color: #1e293b;
  font-weight: 500;
  line-height: 1.5;
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;

  svg {
    cursor: pointer;
    color: #2563eb;

    &:hover {
      color: #1d4ed8;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 16px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button<{ $primary?: boolean }>`
  padding: 10px 20px;
  background: ${({ $primary }) => ($primary ? '#2563eb' : 'white')};
  color: ${({ $primary }) => ($primary ? 'white' : '#2563eb')};
  border: 1px solid #2563eb;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: ${({ $primary }) => ($primary ? '#1d4ed8' : '#eff6ff')};
  }
`;
const AuthorDetail = styled.div`
  flex: 1;
  background-color: white;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const AuthorNickname = styled.span`
  margin-top: 5px;
  color: #2563eb;
  font-weight: 600;
  font-size: 1rem;
`;

const CreatedAtDetail = styled.div`
  flex: 1;
  background-color: white;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Date = styled.span`
  margin-top: 5px;
  font-size: 1rem;
  color: #4b5563;
`;

const PaymentAmount = styled.span`
  color: #334155;
  font-weight: 600;
`;
