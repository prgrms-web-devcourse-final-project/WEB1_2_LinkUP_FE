import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface Category {
  id: string;
  name: string;
}

interface CategoryWrapperProps {
  categories: Category[];
  selectedCategory: string; // 외부에서 전달된 선택된 카테고리
  onCategoryChange: (id: string) => void; // 카테고리 변경 핸들러
  title?: string; // 제목을 외부에서 동적으로 설정
}

const CategoryWrapper: React.FC<CategoryWrapperProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  title = '카테고리', // 기본값을 '카테고리'로 설정
}) => {
  // 내부 상태로 선택된 카테고리 관리
  const [currentCategory, setCurrentCategory] = useState(selectedCategory);

  // 외부 props로 전달된 selectedCategory가 변경될 때 상태 업데이트
  useEffect(() => {
    setCurrentCategory(selectedCategory);
  }, [selectedCategory]);

  // 카테고리 클릭 핸들러
  const handleCategoryClick = (category: string) => {
    setCurrentCategory(category);
    onCategoryChange(category);
  };

  return (
    <Wrapper>
      <HeaderTitle>{title}</HeaderTitle>
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          $active={category.id === currentCategory}
          onClick={() => handleCategoryClick(category.id)}
        >
          {category.name}
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
  justify-content: flex-start;
  align-items: center;
`;

const HeaderTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0 50px 0 0;
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
`;

const CategoryItem = styled.div<{ $active: boolean }>`
  padding: 1rem 1rem;
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
  cursor: pointer;
  position: relative;

  &::after {
    content: '';
    display: ${({ $active }) => ($active ? 'block' : 'none')};
    height: 2px;
    background-color: black;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

export default CategoryWrapper;
