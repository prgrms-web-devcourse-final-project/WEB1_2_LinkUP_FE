import React, { useState } from 'react';
import styled from 'styled-components';

export interface Question {
  id: number;
  text: string;
  rating: number | null;
}

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (ratings: Question[], review: string) => Promise<void>;
}

const ReviewModal = ({ isOpen, onClose, onSubmit }: ReviewModalProps) => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      text: '구매자와 함께한 공동구매 상품에 대해서 만족하시나요?',
      rating: null,
    },
    { id: 2, text: '구매자의 응답은 친절했나요?', rating: null },
    { id: 3, text: '구매자와의 소통은 원활하게 진행되었나요?', rating: null },
  ]);
  const [review, setReview] = useState('');
  const [error, setError] = useState('');

  //입력값 초기화 함수
  const resetReviewState = () => {
    setQuestions([
      {
        id: 1,
        text: '구매자와 함께한 공동구매 상품에 대해서 만족하시나요?',
        rating: null,
      },
      { id: 2, text: '구매자의 응답은 친절했나요?', rating: null },
      { id: 3, text: '구매자와의 소통은 원활하게 진행되었나요?', rating: null },
    ]);
    setReview('');
    setError('');
  };
  if (!isOpen) return null;

  const handleRatingClick = (questionId: number, rating: number) => {
    setQuestions(
      questions.map((q) => (q.id === questionId ? { ...q, rating } : q))
    );
  };

  const handleSubmit = async () => {
    if (questions.some((q) => q.rating === null)) {
      setError('모든 질문에 답변해주세요.');
      return;
    }
    if (review.trim().length === 0) {
      setError('리뷰를 작성해주세요.');
      return;
    }

    try {
      await onSubmit(questions, review);
      resetReviewState();
      onClose();
    } catch {
      // 에러는 reviewApi에서 처리
    }
  };

  const handleClose = () => {
    resetReviewState();
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContainer>
        <ModalHeader>
          <Title>서비스 리뷰</Title>
          <CloseButton onClick={handleClose}>✕</CloseButton>
        </ModalHeader>

        {questions.map((question) => (
          <QuestionContainer key={question.id}>
            <QuestionText>{question.text}</QuestionText>
            <RatingContainer>
              {[1, 2, 3, 4, 5].map((rating) => (
                <RatingButton
                  key={rating}
                  isSelected={question.rating === rating}
                  onClick={() => handleRatingClick(question.id, rating)}
                >
                  {rating}
                </RatingButton>
              ))}
            </RatingContainer>
          </QuestionContainer>
        ))}

        <TextAreaContainer>
          <QuestionText>상세 리뷰를 작성해주세요</QuestionText>
          <ReviewTextArea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="리뷰를 작성해주세요"
          />
        </TextAreaContainer>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <ButtonContainer>
          <CancelButton onClick={handleClose}>취소</CancelButton>
          <SubmitButton onClick={handleSubmit}>제출하기</SubmitButton>
        </ButtonContainer>
      </ModalContainer>
    </Overlay>
  );
};
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  width: 100%;
  max-width: 450px;
  margin: 0 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: modalFadeIn 0.3s ease-out;

  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  color: #1a1a1a;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  transition: all 0.2s;

  &:hover {
    color: #333;
    transform: scale(1.1);
  }
`;

const QuestionContainer = styled.div`
  margin-bottom: 12px;
  background: #f8f9fa;
  padding: 12px;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background: #f0f2f5;
  }
`;

const QuestionText = styled.p`
  font-weight: 600;
  margin-bottom: 8px;
  color: #2d3748;
  font-size: 14px;
`;

const RatingContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const RatingButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected: boolean }>`
  width: 32px;
  height: 32px;
  border: 2px solid ${(props) => (props.isSelected ? '#3B82F6' : '#E5E7EB')};
  background-color: ${(props) => (props.isSelected ? '#3B82F6' : 'white')};
  color: ${(props) => (props.isSelected ? 'white' : '#374151')};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 600;
  font-size: 14px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const TextAreaContainer = styled.div`
  margin-bottom: 16px;
  background: #f8f9fa;
  padding: 12px;
  border-radius: 8px;
`;

const ReviewTextArea = styled.textarea`
  width: 100%;
  height: 100px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  resize: vertical;
  font-family: inherit;
  font-size: 14px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 14px;
  margin-bottom: 16px;
  padding: 8px 12px;
  background: #fee2e2;
  border-radius: 6px;
  border: 1px solid #fecaca;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 600;
  font-size: 14px;
`;

const CancelButton = styled(Button)`
  background-color: white;
  border: 2px solid #e5e7eb;
  color: #4b5563;

  &:hover {
    background-color: #f9fafb;
    border-color: #d1d5db;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #3b82f6;
  color: white;
  border: none;

  &:hover {
    background-color: #2563eb;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
  }
`;

export default ReviewModal;
