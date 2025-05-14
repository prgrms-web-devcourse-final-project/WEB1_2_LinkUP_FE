// PostItem.tsx
import React from 'react';
import styled from 'styled-components';
import { formatDateWithOffset } from '../../utils/formatDate';
import { getImageSrc } from '../../utils/GetImageSrc';

import { AdminPost } from '../../types/postTypes';
import { FaMedal } from 'react-icons/fa'; // 이모티콘 (배지용)

interface Props {
  post: AdminPost;
  selectedCategory: string;
  onClick: (id: number) => void;
  rating?: number;
}

const PostItem: React.FC<Props> = ({
  post,
  selectedCategory,
  onClick,
  rating,
}) => {
  // rating이 없는 경우 0으로 설정
  const normalizedRating = rating ?? 0;
  const myId = sessionStorage.getItem('userid');
  const numericMyId = Number(myId);
  const isMine = post.userId === numericMyId;
  // 높은 평점 사용자 여부 판단
  const isHighRated = normalizedRating >= 4.0;
  return (
    <Wrapper onClick={() => onClick(post.communityPostId)}>
      <PostImage src={getImageSrc(post.imageUrls[0])} alt={`post.title`} />
      <PostContent>
        <PostTitle>{post.title}</PostTitle>
        <PostDetails>
          <PostMeta>
            <PostAuthor>
              {isMine ? '내가 작성한 글' : `작성자 : ${post.nickname}`}
              {isHighRated && (
                <Badge title="평점 4.0 이상 유저">
                  <FaMedal color="#facc15" size={14} />
                </Badge>
              )}
            </PostAuthor>
            <PostDate>{formatDateWithOffset(post.createdAt)}</PostDate>
          </PostMeta>
          {selectedCategory !== 'NOT_APPROVED' && (
            <PostDate>
              <PostAuthor>
                마감 기한 : 글 작성으로부터 {post.period}일
              </PostAuthor>
            </PostDate>
          )}
          <PostJoinStatus>최대 참여 : {post.availableNumber}</PostJoinStatus>
        </PostDetails>
      </PostContent>
    </Wrapper>
  );
};

export default PostItem;

const Wrapper = styled.div`
  display: flex;
  padding: 16px;
  margin-bottom: 24px;
  border-radius: 12px;
  background-color: white;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const PostImage = styled.img`
  width: 172px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 16px;
`;

const PostContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const PostTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
`;

const PostDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #64748b;
`;

const PostDate = styled.span`
  font-size: 0.75rem;
  color: #94a3b8;
`;

const PostJoinStatus = styled.div`
  color: #2563eb;
  font-weight: 600;
`;

const PostAuthor = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Badge = styled.span`
  margin-left: 4px;
`;
