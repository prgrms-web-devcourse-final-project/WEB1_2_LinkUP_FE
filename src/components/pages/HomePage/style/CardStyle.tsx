import styled from 'styled-components';
import Heart from '../../../../assets/icons/heart.png';
import FilledHeart from '../../../../assets/icons/filled-heart.png';
import { Link } from 'react-router-dom';

export const Recommend = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  height: auto;
  margin: 0 auto;
`;

export const RecommendTitle = styled.h2`
  margin-left: 10px;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
`;
export const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  gap: 20px;
  margin-top: 20px;
  @media (min-width: 768px) and (max-width: 1024px) {
    gap: 5px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    gap: 10px;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  margin: 10px;
  width: 200px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  align-items: center;
  position: relative;
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.4);
    transform: translateY(-5px);
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 130px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    width: 80px;
  }
`;
export const StyledLink = styled(Link)`
  text-decoration: none;
  &:link {
    color: inherit;
  }
  &:visited {
    color: inherit;
  }
  &:active {
    color: inherit;
  }
`;
export const ProductImg = styled.img`
  width: 90%;
  height: 200px;
  background-color: #e0e0e0;
  border-radius: 8px;
  object-fit: cover;
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 130px;
    height: 140px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    width: 100px;
    height: 100px;
  }
`;

export const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`;

export const ProductName = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  text-align: left;
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 12px;
  }
`;

export const ProductStar = styled.div`
  font-size: 20px;
  color: #ffaa00;
  text-align: left;
  margin-left: -5px;
  margin-top: 5px;
  @media (min-width: 576px) and (max-width: 767px) {
    display: none;
  }
`;

export const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 30px;
  text-align: left;
`;

export const OriginalPrice = styled.div`
  text-decoration: line-through;
  color: #999;
  font-size: 14px;
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 10px;
    position: absolute;
    bottom: 25px;
  }
`;

export const DiscountedPrice = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #ff4d4f;
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 12px;
    position: absolute;
    bottom: 10px;
  }
`;

export const LikeButton = styled.img<{ likes: boolean }>`
  position: absolute;
  bottom: 20px;
  right: 30px;
  width: 25px;
  height: 25px;
  cursor: pointer;
  content: ${({ likes }) => `url(${likes ? FilledHeart : Heart})`};
  color: ${({ likes }) => (likes ? 'red ' : 'transparent')};

  &:hover {
    cursor: pointer;
    transform: scale(1.2);
    transition: transform 0.2s ease-in-out;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    bottom: 10px;
    right: 10px;
    width: 18px;
    height: 18px;
  }
`;
export const CategoryWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
`;

export const CategoryContainer = styled.div<{ isExpanded: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  position: absolute;
  top: 15px;
  left: 190px;
  padding: 10px 20px;
  z-index: 10;
  visibility: ${(props) => (props.isExpanded ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isExpanded ? 1 : 0)};
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
`;

export const CategoryItem = styled.div<{ isSelected: boolean }>`
  padding: 5px 10px;
  border-radius: 5px;
  width: 120px;
  font-weight: ${(props) => (props.isSelected ? 'bold' : 'normal')};
  text-decoration: ${(props) => (props.isSelected ? 'underline' : 'none')};
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
export const MoreButtonWrapper = styled.div`
  position: relative;
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const StyledMoreButton = styled(Link)`
  position: absolute;
  right: 20px;
  display: inline-block;
  padding: 10px 30px;
  background-color: black;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    cursor: pointer;
    background-color: gray;
  }
`;
