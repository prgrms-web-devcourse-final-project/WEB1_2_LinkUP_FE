import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface CategoryWrapperProps {
  selectedCategory: string; // 외부에서 전달된 선택된 카테고리
  onCategoryChange: (name: string) => void; // 카테고리 변경 핸들러
}

const CategoryWrapper: React.FC<CategoryWrapperProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  // 내부 상태로 선택된 카테고리 관리
  const [currentCategory, setCurrentCategory] = useState(selectedCategory);

  // 외부 props로 전달된 selectedCategory가 변경될 때 상태 업데이트
  useEffect(() => {
    setCurrentCategory(selectedCategory);
  }, [selectedCategory]);

  // 카테고리 목록
  const categories = [
    '생활용품',
    '식료품',
    '패션/의류',
    '전자제품',
    '가구/인테리어',
    '유아/아동용품',
    '스포츠',
  ];

  // 카테고리 클릭 핸들러
  const handleCategoryClick = (categoryName: string) => {
    setCurrentCategory(categoryName);
    onCategoryChange(categoryName);
  };

  return (
    <Wrapper>
      {categories.map((category) => (
        <CategoryItem
          key={category}
          active={category === currentCategory}
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
  flex-wrap: wrap;
  gap: 5px 10px;
  width: 100%;
  justify-content: center;
`;
const CategoryItem = styled.div<{ active: boolean }>`
  padding: 1rem 1rem;
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
