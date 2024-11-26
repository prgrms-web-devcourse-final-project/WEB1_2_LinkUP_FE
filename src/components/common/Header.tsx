import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import cart from '../../assets/icons/icon.png';
import logo from '../../assets/icons/goodbuyus-logo.svg';
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 로컬스토리지에서 JWT 토큰을 확인하여 로그인 상태 설정
    const token = localStorage.getItem('jwt');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <HeaderContainer>
      <HeaderContent>
        {/* 로고 */}
        <Logo>
          <img src={logo} alt="로고" />
        </Logo>

        {/* 네비게이션 바 */}
        <NavBar>
          <NavList>
            <NavItem>
              <StyledLink to="/">Home</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/products">Products</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/notifications">Notifications</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/community">Community</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/mypage">My Page</StyledLink>
            </NavItem>
            {!isLoggedIn ? (
              <Login>
                <Link to="/signin">Login</Link>
              </Login>
            ) : (
              <NavItem_B>
                <StyledLink to="/signout">LogOut</StyledLink>
              </NavItem_B>
            )}
            {isLoggedIn && (
              <NavItem_B>
                <CartIcon>
                  <StyledLink to="/cart">
                    <img src={cart} alt="장바구니 아이콘" />
                  </StyledLink>
                </CartIcon>
              </NavItem_B>
            )}
          </NavList>
        </NavBar>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1120px;
  margin-left: auto;
  margin-right: auto;
`;

const Logo = styled.div`
  img {
    margin-top: -10%;
    margin-left: -25%;
    height: auto;
    width: 250px;
  }
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 10px; /* 메뉴 항목 간 간격 */
  margin: 0;
  padding: 0;
  align-items: center; /* 네비게이션 아이템을 수직으로 중앙 정렬 */
`;

const NavItem = styled.li`
  margin: 0;
  a {
    display: block;
    padding-bottom: 15px;
    text-decoration: none;
    color: #000;
    font-weight: bold;
    border-radius: 5px;
  }

  &:hover {
    background-color: #f4f4f4;
  }
`;

const Login = styled.li`
  background-color: black;
  height: 30px;
  width: 55px;
  border-radius: 5px;
  overflow: hidden;

  a {
    color: white;
    text-decoration: none;
    display: block;
    text-align: center;
    margin-top: 2px;
    font-weight: bold;
  }

  &:hover {
    background-color: #333;
  }
`;
const NavItem_B = styled.li`
  background-color: black;
  height: 30px;
  border-radius: 5px;
  overflow: hidden;

  a {
    color: white;
    text-decoration: none;
    display: block;
    text-align: center;
    margin-top: -1px;
    font-weight: bold;
  }

  &:hover {
    background-color: #333;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
  padding: 5px 12px;
  margin-top: 10px;
  transition: background-color 0.2s;
  border-radius: 5px;
`;

const CartIcon = styled.div`
  img {
    width: 20px;
    height: 20px;
  }
`;
