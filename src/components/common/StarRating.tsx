import React from 'react';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';

interface StarRatingProps {
  rating: number;
  size?: number;
  color?: string;
  emptyColor?: string;
  maxStars?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = 20,
  color = '#FFD700',
  emptyColor = '#e0e0e0',
  maxStars = 5,
}) => {
  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < maxStars; i++) {
      // 각 별의 채워진 비율 계산 (0부터 1 사이)
      const fillPercentage = Math.max(0, Math.min(1, rating - i));

      stars.push(
        <StarWrapper key={i}>
          {/* 비어있는 별 (배경) */}
          <EmptyStar $size={size} $color={emptyColor}>
            <FaStar size={size} />
          </EmptyStar>

          {/* 채워진 별 (오버레이) */}
          <FilledStar
            $size={size}
            $color={color}
            $fillPercentage={fillPercentage * 100}
          >
            <FaStar size={size} />
          </FilledStar>
        </StarWrapper>
      );
    }

    return stars;
  };

  return <StarContainer>{renderStars()}</StarContainer>;
};

const StarContainer = styled.div`
  display: inline-flex;
  align-items: center;
`;

const StarWrapper = styled.div`
  position: relative;
  margin-right: 2px;
`;

const EmptyStar = styled.div<{ $size: number; $color: string }>`
  color: ${(props) => props.$color};
  height: ${(props) => props.$size}px;
  width: ${(props) => props.$size}px;
`;

const FilledStar = styled.div<{
  $size: number;
  $color: string;
  $fillPercentage: number;
}>`
  position: absolute;
  top: 0;
  left: 0;
  color: ${(props) => props.$color};
  height: ${(props) => props.$size}px;
  width: ${(props) => props.$fillPercentage}%;
  overflow: hidden;
`;

export default StarRating;
