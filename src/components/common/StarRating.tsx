import styled from 'styled-components';
import React from 'react';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const renderStars = () => {
    // rating이 0이면 빈 별 5개 표시
    if (rating === 0) {
      return Array(5)
        .fill(null)
        .map((_, i) => <EmptyStar key={`empty-${i}`}>⭐</EmptyStar>);
    }

    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.3 && rating % 1 <= 0.7;
    const hasQuarterStar = rating % 1 < 0.3 && rating % 1 > 0;
    const hasThreeQuarterStar = rating % 1 > 0.7;

    // 꽉 찬 별
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FullStar key={`full-${i}`}>⭐</FullStar>);
    }

    // 부분 별
    if (hasQuarterStar) {
      stars.push(<QuarterStar key="quarter">⭐</QuarterStar>);
    } else if (hasHalfStar) {
      stars.push(<HalfStar key="half">⭐</HalfStar>);
    } else if (hasThreeQuarterStar) {
      stars.push(<ThreeQuarterStar key="three-quarter">⭐</ThreeQuarterStar>);
    }

    // 빈 별
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<EmptyStar key={`empty-${i}`}>⭐</EmptyStar>);
    }

    return stars;
  };

  return <StarContainer>{renderStars()}</StarContainer>;
};

const StarContainer = styled.div`
  display: inline-flex;
  align-items: center;
`;

const StarBase = styled.span`
  font-size: 20px;
  position: relative;
`;

const FullStar = styled(StarBase)`
  color: #ffd700;
`;

const EmptyStar = styled(StarBase)`
  background: linear-gradient(90deg, #e0e0e0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const QuarterStar = styled(StarBase)`
  background: linear-gradient(90deg, #ffd700 25%, #e0e0e0 25%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const HalfStar = styled(StarBase)`
  background: linear-gradient(90deg, #ffd700 50%, #e0e0e0 50%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ThreeQuarterStar = styled(StarBase)`
  background: linear-gradient(90deg, #ffd700 75%, #e0e0e0 75%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default StarRating;
