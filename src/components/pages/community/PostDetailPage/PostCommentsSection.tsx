import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addComment,
  deleteComment,
  updateComment,
} from '../../community/api/postApi';

import { formatDateWithOffset } from '../../../../utils/formatDate';

interface PostCommentsSectionProps {
  communityPostId: number;
  comments: {
    commentId: number;
    userId: number;
    userNickname: string;
    content: string;
    createdAt: string;
  }[];
}

interface CharacterCountProps {
  $overLimit: boolean;
}

const PostCommentsSection: React.FC<PostCommentsSectionProps> = ({
  communityPostId,
  comments,
}) => {
  const queryClient = useQueryClient();

  const [newCommentContent, setNewCommentContent] = useState<string>('');
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>('');

  const queryKey = ['postDetail', communityPostId];
  const userId = parseInt(localStorage.getItem('userid') || '0', 10);

  const addCommentMutation = useMutation({
    mutationFn: () =>
      addComment(communityPostId, {
        parentId: userId,
        content: newCommentContent,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      setNewCommentContent('');
    },
    onError: () => {
      alert('댓글 작성에 실패했습니다.');
    },
  });

  const handleAddComment = () => {
    if (!newCommentContent.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }
    addCommentMutation.mutate();
  };

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: number) =>
      deleteComment(communityPostId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onError: () => {
      alert('댓글 삭제에 실패했습니다.');
    },
  });

  const handleDeleteComment = (commentId: number) => {
    if (window.confirm('이 댓글을 삭제하시겠습니까?')) {
      deleteCommentMutation.mutate(commentId);
    }
  };

  const handleEditComment = (commentId: number, content: string) => {
    setEditCommentId(commentId);
    setEditContent(content);
  };

  const updateCommentMutation = useMutation({
    mutationFn: () =>
      updateComment(communityPostId, editCommentId!, editContent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      setEditCommentId(null);
      setEditContent('');
    },
    onError: () => {
      alert('댓글 수정에 실패했습니다.');
    },
  });

  const handleUpdateComment = () => {
    if (!editContent.trim()) {
      alert('수정할 댓글 내용을 입력하세요.');
      return;
    }
    if (editContent.length > 300) {
      alert('댓글은 최대 300자까지만 입력 가능합니다.');
      return;
    }
    updateCommentMutation.mutate();
  };

  return (
    <CommentsContainer>
      <CommentsHeader>댓글</CommentsHeader>
      <CommentsWrapper>
        {comments.map((comment) => (
          <Comment key={comment.commentId}>
            <CommentHeader>
              <CommentAuthor>{comment.userNickname}</CommentAuthor>
              <CommentDate>
                {formatDateWithOffset(comment.createdAt).toLocaleString()}
              </CommentDate>
            </CommentHeader>
            {editCommentId === comment.commentId ? (
              <EditCommentContainer>
                <EditCommentInput
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <ActionButtonsWrapper>
                  <CharacterCount $overLimit={editContent.length > 300}>
                    ({editContent.length}/300)
                  </CharacterCount>
                  <ActionButton onClick={handleUpdateComment}>
                    확인
                  </ActionButton>
                  <ActionButton onClick={() => setEditCommentId(null)}>
                    취소
                  </ActionButton>
                </ActionButtonsWrapper>
              </EditCommentContainer>
            ) : (
              <>
                <CommentContent>{comment.content}</CommentContent>
                {comment.userId === userId && (
                  <CommentActions>
                    <ActionButton
                      onClick={() =>
                        handleEditComment(comment.commentId, comment.content)
                      }
                    >
                      수정
                    </ActionButton>
                    <ActionButton
                      onClick={() => handleDeleteComment(comment.commentId)}
                    >
                      삭제
                    </ActionButton>
                  </CommentActions>
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
            maxLength={300} // 브라우저에서 강제 제한
          />
          <ActionButtonsWrapper>
            <CharacterCount $overLimit={newCommentContent.length > 300}>
              ({newCommentContent.length}/300)
            </CharacterCount>
            <SubmitCommentButton onClick={handleAddComment}>
              작성
            </SubmitCommentButton>
          </ActionButtonsWrapper>
        </CommentInputContainer>
      </CommentsWrapper>
    </CommentsContainer>
  );
};

export default PostCommentsSection;

const CommentsContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  border: 1px solid #f0f8ff;
  border-radius: 10px;
`;

const CommentsHeader = styled.h3`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 20px;
  margin-left: 10px;
`;

const CommentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Comment = styled.li`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px;
  border-radius: 8px;
  background-color: #e3f2fd;
  display: flex;
  flex-direction: column;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const CommentAuthor = styled.div`
  font-weight: bold;
  color: #007bff;
`;

const CommentDate = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const CommentContent = styled.p`
  margin: 0;
  font-size: 1rem;
`;

const CommentInputContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const CommentInput = styled.textarea`
  flex: 1;
  margin: 10px;
  padding: 10px;
  border: 1px solid #f0f8ff;
  border-radius: 8px;
  resize: none;
`;

const ActionButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const CharacterCount = styled.span<CharacterCountProps>`
  font-size: 0.875rem;
  color: ${({ $overLimit }) => ($overLimit ? '#ff0000' : '#666')};
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  background: #007bff;
  color: #fff;
  border: 1px solid #007bff;
  border-radius: 5px;
  cursor: pointer;
`;

const SubmitCommentButton = styled.button`
  padding: 10px 20px;
  background: #007bff;
  color: #fff;
  border: 1px solid #007bff;
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-end;
`;

const EditCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const EditCommentInput = styled.textarea`
  padding: 10px;
  border: 1px solid #00b0ff;
  border-radius: 8px;
  resize: none;
`;

const CommentActions = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;
`;
