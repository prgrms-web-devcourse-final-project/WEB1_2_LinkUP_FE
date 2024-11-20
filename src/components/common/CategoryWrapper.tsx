import React, { useState } from 'react';
import styled from 'styled-components';

const CategoryWrapper = ({
  onCategoryChange,
}: {
  onCategoryChange: (name: string) => void;
}) => {
  // 카테고리 목록을 컴포넌트 내부에 정의
  const categories = [
    '생활용품',
    '식료품',
    '패션/의류',
    '전자제품',
    '가구/인테리어',
    '유아/아동용품',
    '스포츠',
  ];

  // 선택된 카테고리를 관리하는 상태
  const [selectedCategory, setSelectedCategory] = useState('생활용품'); // 기본값: 생활용품

  // 카테고리 클릭 핸들러
  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    onCategoryChange(categoryName);
  };

  return (
    <Wrapper>
      {categories.map((category) => (
        <CategoryItem
          key={category}
          active={category === selectedCategory}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </CategoryItem>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  padding: 0.5rem 0;
`;

const CategoryItem = styled.div<{ active: boolean }>`
  padding: 1rem 2rem;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  cursor: pointer;
  position: relative;

  &::after {
    content: '';
    display: ${({ active }) => (active ? 'block' : 'none')};
    height: 2px;
    background-color: black;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

export default CategoryWrapper;
