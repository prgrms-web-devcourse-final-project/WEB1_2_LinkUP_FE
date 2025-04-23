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
export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  padding: 2rem;
`;

export const BannerWrapper = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
`;

export const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    height: 280px;
  }
`;

export const BannerImageWrapper = styled.div`
  width: 100%;
  height: 220px;
  overflow: hidden;

  @media (min-width: 768px) {
    width: 40%;
    height: 100%;
  }
`;

export const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const BannerInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  flex: 1;
  background: linear-gradient(to right, #ffffff, #f8f9fa);

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

export const BannerStar = styled.div`
  margin-bottom: 1rem;

  svg {
    color: #ffc107;
    font-size: 1.2rem;
  }
`;

export const BannerHeader = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const BannerTitleArea = styled.div`
  margin-bottom: 1rem;
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 1rem;
`;

export const BannerProductName = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #343a40;
  margin: 0 0 0.5rem 0;

  @media (min-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const BannerProductCategory = styled.p`
  font-size: 0.9rem;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  margin: 0;
`;

export const BannerDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #495057;
  flex-grow: 1;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: 768px) {
    -webkit-line-clamp: 6;
  }
`;

export const BannerPriceSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

export const BannerPrice = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: #343a40;
  margin: 0;
`;

export const BannerButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0069d9;
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
