import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import {
  addComment,
  deleteComment,
  updateComment,
} from '../../community/api/postApi';

import { formatDateWithOffset } from '../../../../utils/formatDate';
import { usePostQuery } from '../../../../hooks/useGetPost';
import { QueryHandler } from '../../../../hooks/useGetProduct';
import { useQueryClient } from '@tanstack/react-query';
interface PostCommentsSectionProps {
  communityPostId: number;
}

interface CharacterCountProps {
  $overLimit: boolean;
}

const PostCommentsSection: React.FC<PostCommentsSectionProps> = ({
  communityPostId,
}) => {
  const [newCommentContent, setNewCommentContent] = useState<string>('');
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>('');
  const [replyToCommentId, setReplyToCommentId] = useState<number | null>(null);
  const userId = parseInt(sessionStorage.getItem('userid') || '0', 10);
  const { data: post, isLoading, isError } = usePostQuery(communityPostId);
  const queryClient = useQueryClient();
  const [comments, setComments] = useState(post?.comment || []);

  useEffect(() => {
    if (post) {
      setComments(post.comment || []);
    }
  }, [post]);

  const handleAddComment = async (parentId: number | null = null) => {
    if (!newCommentContent.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }
    if (newCommentContent.length > 300) {
      alert('댓글은 최대 300자까지만 입력 가능합니다.');
      return;
    }
    await addComment(communityPostId, {
      content: newCommentContent,
      parentId: parentId,
    });

    alert('댓글이 등록되었습니다.');
    queryClient.invalidateQueries({ queryKey: ['post', communityPostId] });

    setNewCommentContent('');
    setReplyToCommentId(null);
  };

  const handleDeleteComment = async (commentId: number) => {
    if (window.confirm('이 댓글을 삭제하시겠습니까?')) {
      await deleteComment(commentId);
    }
    queryClient.invalidateQueries({ queryKey: ['post', communityPostId] });
  };

  const handleEditComment = (commentId: number, content: string) => {
    setEditCommentId(commentId);
    setEditContent(content);
  };

  const handleUpdateComment = async () => {
    if (!editContent.trim()) {
      alert('수정할 댓글 내용을 입력하세요.');
      return;
    }
    if (editContent.length > 300) {
      alert('댓글은 최대 300자까지만 입력 가능합니다.');
      return;
    }
    await updateComment(editCommentId!, editContent);
    alert('댓글이 수정되었습니다.');
    queryClient.invalidateQueries({ queryKey: ['post', communityPostId] });
    setEditCommentId(null);
    setEditContent('');
  };

  return (
    <QueryHandler isLoading={isLoading} isError={isError}>
      <CommentsContainer>
        <CommentsHeader>댓글</CommentsHeader>
        <CommentsWrapper>
          {comments
            ?.filter((comment) => comment.parentId === null)
            .map((comment) => (
              <Comment
                key={comment.id}
                $isEditing={editCommentId === Number(comment.id)}
              >
                <CommentHeader>
                  <CommentAuthor>{comment.nickname}</CommentAuthor>
                  <CommentDate>
                    {formatDateWithOffset(comment.createdAt).toLocaleString()}
                  </CommentDate>
                </CommentHeader>
                {editCommentId === Number(comment.id) ? (
                  <EditCommentContainer>
                    <EditCommentInput
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      autoFocus
                    />
                    <EditActionButtonsWrapper>
                      <CharacterCount $overLimit={editContent.length > 300}>
                        ({editContent.length}/300)
                      </CharacterCount>
                      <EditActionButtons>
                        <ConfirmEditButton onClick={handleUpdateComment}>
                          수정 완료
                        </ConfirmEditButton>
                        <CancelEditButton
                          onClick={() => setEditCommentId(null)}
                        >
                          취소
                        </CancelEditButton>
                      </EditActionButtons>
                    </EditActionButtonsWrapper>
                  </EditCommentContainer>
                ) : (
                  <>
                    <CommentContent>{comment.content}</CommentContent>
                    {comment.userId === userId && (
                      <CommentActions>
                        <ActionButton
                          onClick={() =>
                            handleEditComment(comment.id, comment.content)
                          }
                        >
                          수정
                        </ActionButton>
                        <ActionButton
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          삭제
                        </ActionButton>
                      </CommentActions>
                    )}
                    <ReplyButton
                      onClick={() => setReplyToCommentId(comment.id)}
                    >
                      답글 달기
                    </ReplyButton>
                    {replyToCommentId === comment.id && (
                      <ReplyInputContainer>
                        <CommentInput
                          value={newCommentContent}
                          onChange={(e) => setNewCommentContent(e.target.value)}
                          placeholder="답글을 입력하세요."
                          maxLength={300}
                        />
                        <ActionButtonsWrapper>
                          <CharacterCount
                            $overLimit={newCommentContent.length > 300}
                          >
                            ({newCommentContent.length}/300)
                          </CharacterCount>
                          <ReplyActionButtons>
                            <CancelReplyButton
                              onClick={() => setReplyToCommentId(null)}
                            >
                              취소
                            </CancelReplyButton>
                            <SubmitCommentButton
                              onClick={() => handleAddComment(comment.id)}
                            >
                              작성
                            </SubmitCommentButton>
                          </ReplyActionButtons>
                        </ActionButtonsWrapper>
                      </ReplyInputContainer>
                    )}
                    {post?.comment &&
                      post.comment.filter(
                        (reply) => reply.parentId === comment.id
                      ).length > 0 && (
                        <RepliesContainer>
                          {post.comment
                            .filter((reply) => reply.parentId === comment.id)
                            .map((reply) => (
                              <Reply key={reply.id}>
                                <ReplyHeader>
                                  <ReplyAuthor>{reply.nickname}</ReplyAuthor>
                                  <ReplyDate>
                                    {formatDateWithOffset(
                                      reply.createdAt
                                    ).toLocaleString()}
                                  </ReplyDate>
                                </ReplyHeader>
                                <ReplyContent>{reply.content}</ReplyContent>
                              </Reply>
                            ))}
                        </RepliesContainer>
                      )}
                  </>
                )}
              </Comment>
            ))}
          <CommentInputContainer>
            <CommentInput
              value={newCommentContent}
              onChange={(e) => setNewCommentContent(e.target.value)}
              placeholder="댓글을 입력하세요."
              maxLength={300}
            />
            <ActionButtonsWrapper>
              <CharacterCount $overLimit={newCommentContent.length > 300}>
                ({newCommentContent.length}/300)
              </CharacterCount>
              <SubmitCommentButton onClick={() => handleAddComment(null)}>
                작성
              </SubmitCommentButton>
            </ActionButtonsWrapper>
          </CommentInputContainer>
        </CommentsWrapper>
      </CommentsContainer>
    </QueryHandler>
  );
};

const CommentsContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  border: 1px solid #e6f3ff;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.06);
`;

const CommentsHeader = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin: 16px 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e6f3ff;
  color: #2c3e50;
`;

const CommentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 20px 20px;
`;

const Comment = styled.li<{ $isEditing?: boolean }>`
  list-style: none;
  padding: 16px;
  border-radius: 10px;
  background-color: ${({ $isEditing }) => ($isEditing ? '#f0f7ff' : '#f8faff')};
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.2s ease;
  border: 1px solid ${({ $isEditing }) => ($isEditing ? '#007bff' : '#e6f3ff')};
  box-shadow: ${({ $isEditing }) =>
    $isEditing ? '0 2px 8px rgba(0, 123, 255, 0.15)' : 'none'};

  &:hover {
    background-color: #f0f7ff;
    box-shadow: 0 2px 6px rgba(0, 123, 255, 0.08);
  }
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const CommentAuthor = styled.div`
  font-weight: 600;
  color: #007bff;
  font-size: 0.95rem;
`;

const CommentDate = styled.div`
  font-size: 0.85rem;
  color: #6c757d;
`;

const CommentContent = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #2c3e50;
  word-break: break-word;
`;

const CommentInputContainer = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border: 1px solid #e6f3ff;
  border-radius: 10px;
  padding: 16px;
`;

const CommentInput = styled.textarea`
  width: 100%;
  min-height: 80px;
  border: 1px solid #e6f3ff;
  border-radius: 8px;
  resize: vertical;
  font-size: 0.95rem;
  color: #2c3e50;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const ActionButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`;

const CharacterCount = styled.span<CharacterCountProps>`
  font-size: 0.875rem;
  color: ${({ $overLimit }) => ($overLimit ? '#dc3545' : '#6c757d')};
  transition: color 0.2s ease;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: #0056b3;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const SubmitCommentButton = styled(ActionButton)`
  align-self: flex-end;
  min-width: 80px;

  &:disabled {
    background: #a0aec0;
    cursor: not-allowed;
    transform: none;
  }
`;

const EditCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
`;

const EditCommentInput = styled(CommentInput)`
  border-color: #007bff;
  background-color: #ffffff;
`;

const EditActionButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

const EditActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const CancelEditButton = styled(ActionButton)`
  background: #6c757d;

  &:hover {
    background: #545b62;
  }
`;

const ConfirmEditButton = styled(ActionButton)`
  background: #28a745;

  &:hover {
    background: #218838;
  }
`;

const CommentActions = styled.div`
  display: flex;
  gap: 8px;
  align-self: flex-end;
`;

const ReplyButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  font-size: 0.85rem;
  cursor: pointer;
  padding: 4px 8px;
  margin-top: 8px;
  align-self: flex-start;

  &:hover {
    text-decoration: underline;
  }
`;

const ReplyInputContainer = styled.div`
  margin-top: 12px;
  padding: 12px;
  background-color: #f8faff;
  border-radius: 8px;
  border: 1px solid #e6f3ff;
`;

const RepliesContainer = styled.div`
  margin-top: 12px;
  padding-left: 20px;
  border-left: 2px solid #e6f3ff;
`;

const Reply = styled.div`
  padding: 12px;
  background-color: #f8faff;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const ReplyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const ReplyAuthor = styled.div`
  font-weight: 600;
  color: #007bff;
  font-size: 0.9rem;
`;

const ReplyDate = styled.div`
  font-size: 0.8rem;
  color: #6c757d;
`;

const ReplyContent = styled.p`
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #2c3e50;
  word-break: break-word;
`;

const ReplyActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const CancelReplyButton = styled(ActionButton)`
  background: #6c757d;

  &:hover {
    background: #545b62;
  }
`;

export default PostCommentsSection;
