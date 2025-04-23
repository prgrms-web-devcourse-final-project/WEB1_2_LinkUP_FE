import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ProductSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  height: auto;
  margin: 0 auto;
`;

export const SectionTitle = styled.h2`
  text-decoration: underline;
  margin-left: 10px;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
  &:hover {
    cursor: pointer;
  }
`;

export const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Card = styled.div`
  position: relative;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: white;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: 100%;
  display: block;

  &:link,
  &:visited,
  &:hover,
  &:active {
    color: inherit;
    text-decoration: none;
  }
`;

export const ProductImg = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  background-color: #f5f5f5;
  border-bottom: 1px solid #eee;
`;

export const ProductWrapper = styled.div`
  padding: 12px;
`;

export const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 40px;
`;

export const ProductStar = styled.div`
  margin-bottom: 8px;
  display: flex;
  align-items: center;
`;

export const PriceWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-top: 4px;
`;

export const OriginalPrice = styled.span`
  font-size: 14px;
  color: #888;
  text-decoration: line-through;
`;

export const DiscountedPrice = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #e74c3c;
`;
export const LikeButton = styled.button<{ $likes: boolean }>`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => (props.$likes ? '#e74c3c' : 'white')};
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:before {
    content: '♥';
    color: ${(props) => (props.$likes ? 'white' : '#999')};
    font-size: 16px;
  }

  &:hover {
    background-color: ${(props) => (props.$likes ? '#c0392b' : '#f8f8f8')};
  }
`;
export const MoreButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 40px;
`;

export const StyledMoreButton = styled(Link)`
  padding: 10px 20px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 20px;
  color: #333;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background-color: #eee;
    color: #111;
  }
`;

export const CategoryWrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const CategoryContainer = styled.div<{ $expanded: boolean }>`
  display: ${(props) => (props.$expanded ? 'flex' : 'none')};
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;
export const CategoryItem = styled.div<{ $selected: boolean }>`
  padding: 6px 15px;
  border-radius: 20px;
  background-color: ${(props) => (props.$selected ? '#333' : '#f5f5f5')};
  color: ${(props) => (props.$selected ? 'white' : '#333')};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.$selected ? '#222' : '#eee')};
  }
`;
export const Recommend = ProductSection;
export const RecommendTitle = SectionTitle;

export const BannerWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export const BannerContainer = styled.div`
  height: 300px;
  width: 100%;
  display: flex;
  background-color: #f5f5f5;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: translateY(-5px);
  }

  @media (max-width: 1024px) {
    height: 250px;
  }

  @media (max-width: 767px) {
    height: 200px;
  }
`;

export const BannerImageWrapper = styled.div`
  width: 300px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;

  @media (max-width: 767px) {
    width: 200px;
  }
`;

export const BannerImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

export const BannerInfoSection = styled.div`
  background: linear-gradient(to top, rgba(155, 155, 155, 0.2), transparent);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 50px;
  position: relative;

  @media (max-width: 767px) {
    padding: 0 20px;
  }
`;

export const BannerStar = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 20px;

  @media (max-width: 767px) {
    font-size: 15px;
    top: 10px;
    right: 10px;
  }
`;

export const BannerHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const BannerTitleArea = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 15px;

  @media (max-width: 1024px) {
    flex-direction: column;
    margin-bottom: 10px;
  }
`;

export const BannerProductName = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-right: 15px;
  margin-bottom: 0;

  @media (max-width: 767px) {
    font-size: 18px;
    margin-bottom: 2px;
  }
`;

export const BannerProductCategory = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0;

  @media (max-width: 767px) {
    font-size: 12px;
  }
`;

export const BannerDescription = styled.p`
  font-size: 14px;
  color: #555;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;

  @media (max-width: 1024px) {
    -webkit-line-clamp: 2;
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

export const ContainerBox = styled.div`
  display: flex;
  margin-top: 5vh;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
