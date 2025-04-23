import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid #e3f2fd;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(33, 150, 243, 0.15);
    border-color: #2196f3;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #f5f5f5;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

export const CardContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: white;
`;

export const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1976d2;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

export const OriginalPrice = styled.span`
  font-size: 14px;
  color: #9e9e9e;
  text-decoration: line-through;
`;

export const DiscountPrice = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #1976d2;
`;

export const DiscountRate = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #f44336;
  background-color: #ffebee;
  padding: 2px 6px;
  border-radius: 4px;
`;

export const Deadline = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;

  &::before {
    content: '⏰';
    font-size: 14px;
  }
`;

export const LikeButton = styled.button`
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;

  &:hover {
    background: white;
    transform: scale(1.1);
  }

  svg {
    width: 20px;
    height: 20px;
    color: #1976d2;
  }
`;

export const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  width: 100%;
  padding: 20px;
`;

export const CategoryContainer = styled.div<{ expanded: boolean }>`
  width: 100%;
  margin-bottom: 40px;
  display: ${({ expanded }) => (expanded ? 'block' : 'none')};
`;

export const CategoryItem = styled.div<{ selected: boolean }>`
  padding: 8px 16px;
  margin: 4px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ selected }) => (selected ? '#1976d2' : '#e3f2fd')};
  color: ${({ selected }) => (selected ? 'white' : '#1976d2')};
  font-weight: ${({ selected }) => (selected ? '600' : '500')};

  &:hover {
    background: ${({ selected }) => (selected ? '#1565c0' : '#bbdefb')};
  }
`;
