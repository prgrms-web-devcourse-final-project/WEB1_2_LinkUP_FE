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
  onSubmit: (ratings: Question[], review: string) => void;
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

  if (!isOpen) return null;

  const handleRatingClick = (questionId: number, rating: number) => {
    setQuestions(
      questions.map((q) => (q.id === questionId ? { ...q, rating } : q))
    );
  };

  const handleSubmit = () => {
    if (questions.some((q) => q.rating === null)) {
      setError('모든 질문에 답변해주세요.');
      return;
    }
    if (review.trim().length === 0) {
      setError('리뷰를 작성해주세요.');
      return;
    }

    onSubmit(questions, review);
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
          <CloseButton onClick={onClose}>✕</CloseButton>
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
          <CancelButton onClick={onClose}>취소</CancelButton>
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  width: 100%;
  max-width: 500px;
  margin: 0 16px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #333;
  }
`;

const QuestionContainer = styled.div`
  margin-bottom: 24px;
`;

const QuestionText = styled.p`
  font-weight: 500;
  margin-bottom: 8px;
`;

const RatingContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const RatingButton = styled.button<{ isSelected: boolean }>`
  width: 40px;
  height: 40px;
  border: 1px solid ${(props) => (props.isSelected ? '#3B82F6' : '#E5E7EB')};
  background-color: ${(props) => (props.isSelected ? '#3B82F6' : 'white')};
  color: ${(props) => (props.isSelected ? 'white' : '#374151')};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #3b82f6;
  }
`;

const TextAreaContainer = styled.div`
  margin-bottom: 24px;
`;

const ReviewTextArea = styled.textarea`
  width: 100%;
  height: 128px;
  padding: 8px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 14px;
  margin-bottom: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
`;

const CancelButton = styled(Button)`
  background-color: white;
  border: 1px solid #e5e7eb;

  &:hover {
    background-color: #f9fafb;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #3b82f6;
  color: white;
  border: none;

  &:hover {
    background-color: #2563eb;
  }
`;

export default ReviewModal;
