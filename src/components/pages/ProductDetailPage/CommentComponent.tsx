import React, { useState } from 'react';
import styled from 'styled-components';
import { addComment, deleteComment, editComment } from './api/commentApi';
import { QueryHandler, useProductQuery } from '../../../hooks/useGetProduct';
import { useQueryClient } from '@tanstack/react-query';

interface CommentProps {
  productId: number;
}

const CommentComponent: React.FC<CommentProps> = ({ productId }) => {
  const queryClient = useQueryClient();
  const { data: product, isLoading, isError } = useProductQuery(productId || 0);
  const [newComment, setNewComment] = useState('');
  const [newCommentStar, setNewCommentStar] = useState(5);
  const [visibleCount, setVisibleCount] = useState(10);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');
  const [editingRating, setEditingRating] = useState(5);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addComment(productId, {
        content: newComment,
        rate: newCommentStar,
      });
      alert('댓글이 등록되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['product', productId] });

      setNewComment('');
      setNewCommentStar(5);
    } catch {
      alert('현재 댓글을 작성할 수 없습니다.');
    }
  };

  const handleEditComment = (
    commentId: number,
    text: string,
    rating: number
  ) => {
    setEditingId(commentId);
    setEditingText(text);
    setEditingRating(rating);
  };

  const handleUpdateComment = async (reviewId: number) => {
    try {
      await editComment(reviewId, {
        content: editingText,
        rate: editingRating,
      });
      alert('댓글이 수정되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['product', productId] });

      setEditingId(null);
      setEditingText('');
      setEditingRating(5);
    } catch {
      alert('현재 댓글을 수정할 수 없습니다.');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText('');
    setEditingRating(5);
  };

  const handleDeleteComment = async (reviewId: number) => {
    try {
      if (window.confirm('이 댓글을 삭제하시겠습니까?')) {
        await deleteComment(reviewId);
      }
      queryClient.invalidateQueries({ queryKey: ['product', productId] });
    } catch {
      alert('현재 댓글을 삭제할 수 없습니다.');
    }
  };

  return (
    <QueryHandler isLoading={isLoading} isError={isError}>
      <CommentSection>
        <CommentForm onSubmit={handleCommentSubmit}>
          <CommentInputWrapper>
            <CommentInput
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력하세요"
            />
            <StarSelector
              value={newCommentStar}
              onChange={(e) => setNewCommentStar(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {'⭐'.repeat(num)}
                </option>
              ))}
            </StarSelector>
            <CommentSubmitButton type="submit">댓글 달기</CommentSubmitButton>
          </CommentInputWrapper>
        </CommentForm>
        <div>
          {product?.reviews
            .filter((review) => review.using) // 'using'이 true인 것만 필터링
            .slice(0, visibleCount)
            .map((review, activeIndex) => (
              <Comment key={review.reviewId}>
                {editingId === activeIndex ? (
                  <EditCommentForm>
                    <EditInput
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                    />
                    <StarSelector
                      value={editingRating}
                      onChange={(e) => setEditingRating(Number(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {'⭐'.repeat(num)}
                        </option>
                      ))}
                    </StarSelector>
                    <EditActions>
                      <ActionButton
                        onClick={() => handleUpdateComment(review.reviewId)}
                        color="primary"
                      >
                        저장
                      </ActionButton>
                      <ActionButton
                        onClick={handleCancelEdit}
                        color="secondary"
                      >
                        취소
                      </ActionButton>
                    </EditActions>
                  </EditCommentForm>
                ) : (
                  <>
                    <CommentContent>
                      <CommentText>{review.content}</CommentText>
                      <CommentStars>{'⭐'.repeat(review.rating)}</CommentStars>
                    </CommentContent>
                    <CommentActions>
                      <ActionButton
                        onClick={() =>
                          handleEditComment(
                            activeIndex,
                            review.content,
                            review.rating
                          )
                        }
                      >
                        수정
                      </ActionButton>
                      <ActionButton
                        onClick={() => handleDeleteComment(review.reviewId)}
                      >
                        삭제
                      </ActionButton>
                    </CommentActions>
                  </>
                )}
              </Comment>
            ))}

          <ButtonContainer>
            {visibleCount <
              product!.reviews.filter((review) => review.using).length && (
              <ViewMore onClick={handleShowMore}>더보기</ViewMore>
            )}
          </ButtonContainer>
        </div>
      </CommentSection>
    </QueryHandler>
  );
};

const CommentForm = styled.form`
  margin-bottom: 20px;
`;

const CommentInputWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const StarSelector = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
`;

const CommentSubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
const CommentActions = styled.div`
  margin-left: 10px;
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
`;
const Comment = styled.div`
  margin-top: 10px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover ${CommentActions} {
    opacity: 1;
  }
`;

const CommentContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
`;

const CommentText = styled.span`
  flex: 1;
`;

const ActionButton = styled.button`
  padding: 4px 8px;
  font-size: 12px;
  background: transparent;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #2563eb;
    border-color: #2563eb;
    color: white;
  }
`;

const CommentStars = styled.div`
  font-size: 16px;
  color: #ffaa00;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ViewMore = styled.button`
  margin-top: 20px;
  border: 1px solid black;
  background-color: transparent;
  border-radius: 8px;
  width: 200px;
  height: 40px;
  font-size: 14px;
  &:hover {
    cursor: pointer;
    background-color: #2563eb;
    color: white;
  }
`;
const EditCommentForm = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  align-items: center;
`;

const EditInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;

const EditActions = styled.div`
  display: flex;
  gap: 4px;
`;
const CommentSection = styled.div`
  margin-top: 40px;
  border-top: 1px solid #eee;
  padding-top: 20px;
`;
export default CommentComponent;
