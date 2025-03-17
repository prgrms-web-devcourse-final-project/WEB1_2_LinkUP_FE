import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiShoppingCart } from 'react-icons/fi';
import logo from '../../assets/icons/goodbuyus-logo.svg';
import menu from '../../assets/icons/menu.svg';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { isLoggedIn, isAdmin, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        {/* 로고 */}
        <Logo>
          <Link to="/">
            <img src={logo} alt="로고" />
          </Link>
        </Logo>

        <MobileMenuToggle onClick={toggleMobileMenu}>
          <img src={menu} alt="메뉴버튼" />
        </MobileMenuToggle>

        {/* 네비게이션 바 */}
        <NavBar $isOpen={isMobileMenuOpen}>
          <NavList>
            <NavItem>
              <StyledLink to="/" onClick={toggleMobileMenu}>
                Home
              </StyledLink>
            </NavItem>
            {/* 관리자 아닐 때만 일반 메뉴 표시 */}
            {!isAdmin && (
              <>
                <NavItem>
                  <StyledLink to="/products" onClick={toggleMobileMenu}>
                    Products
                  </StyledLink>
                </NavItem>
                <NavItem>
                  <StyledLink
                    to="/mypage/notification"
                    onClick={toggleMobileMenu}
                  >
                    Notifications
                  </StyledLink>
                </NavItem>
                <NavItem>
                  <StyledLink to="/community/post" onClick={toggleMobileMenu}>
                    Community
                  </StyledLink>
                </NavItem>
              </>
            )}

            {/* 로그인 시 표시되는 메뉴 */}
            {isLoggedIn && (
              <NavItem>
                <StyledLink to={isAdmin ? '/admin/post' : '/mypage/setting'}>
                  {isAdmin ? 'Admin Page' : 'My Page'}
                </StyledLink>
              </NavItem>
            )}

            {/* 비로그인 시 로그인 버튼 */}
            {!isLoggedIn ? (
              <Login>
                <Link to="/signin" onClick={toggleMobileMenu}>
                  Login
                </Link>
              </Login>
            ) : (
              <>
                <LogOut onClick={logout}>
                  <a>LogOut</a>
                </LogOut>
                {/* 관리자가 아닐 때만 장바구니 표시 */}
                {!isAdmin && (
                  <LogOut>
                    <CartIcon>
                      <StyledLink
                        to="/mypage/wishlist"
                        onClick={toggleMobileMenu}
                      >
                        <FiShoppingCart size={22} color="white" />
                      </StyledLink>
                    </CartIcon>
                  </LogOut>
                )}
              </>
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
  position: relative;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1120px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
`;

const Logo = styled.div`
  img {
    margin-top: -10%;
    margin-left: -25%;
    height: auto;
    width: 250px;
  }

  @media (min-width: 576px) and (max-width: 767px) {
    img {
      margin-top: 0;
      margin-left: 0;
      width: 150px;
    }
  }
`;

const MobileMenuToggle = styled.button`
  display: none;

  @media (min-width: 576px) and (max-width: 767px) {
    display: block;
    background: none;
    border: none;
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 20;
  }
`;

const NavBar = styled.nav<{ $isOpen: boolean }>`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;

  @media (min-width: 576px) and (max-width: 767px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: white;
    z-index: 10;
    display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
    align-items: center;
    justify-content: center;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 10px;
  margin: 0;
  padding: 0;
  align-items: center;

  @media (min-width: 576px) and (max-width: 767px) {
    flex-direction: column;
    gap: 20px;
    width: 100%;
    align-items: center;
  }
`;

const SubMenu = styled.ul`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 5px 0;
  margin: 0;
  z-index: 1000;

  @media (min-width: 576px) and (max-width: 767px) {
    position: static;
    box-shadow: none;
    border: none;
    padding: 0;
    background: transparent;
  }
`;

const NavItem = styled.li`
  margin: 0;
  position: relative;
  a {
    display: block;
    padding-bottom: 15px;
    text-decoration: none;
    color: #000;
    font-weight: bold;
    border-radius: 5px;
  }
  &:hover > ${SubMenu} {
    display: block;
  }
  &:hover {
    background-color: #f4f4f4;
    border-radius: 8px;
  }

  @media (min-width: 576px) and (max-width: 767px) {
    width: 100%;
    text-align: center;
    &:hover > ${SubMenu} {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
    a {
      padding: 10px;
      width: 100%;
    }
  }
`;

const Login = styled.li`
  background-color: black;
  height: 30px;
  width: 70px;
  border-radius: 5px;
  overflow: hidden;

  a {
    color: white;
    text-decoration: none;
    display: block;
    text-align: center;
    margin-top: 5px;
    font-weight: bold;
  }

  &:hover {
    background-color: #333;
  }

  @media (min-width: 576px) and (max-width: 767px) {
    width: 130px;
    height: 40px;
    margin-left: 10px;
    a {
      margin-top: 10px;
      font-size: 16px;
    }
  }
`;

const LogOut = styled.li`
  background-color: black;
  height: 30px;
  border-radius: 5px;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  padding: 0px 10px;

  a {
    font-size: 15px;
    color: white;
    text-decoration: none;
    display: block;
    text-align: center;
    font-weight: bold;
  }

  &:hover {
    background-color: #333;
  }

  @media (min-width: 576px) and (max-width: 767px) {
    width: 130px;
    height: 40px;
    margin-left: 10px;

    a {
      margin-top: -1px;
      margin-left: -8px;
      font-size: 16px;
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
  padding: 5px;
  margin-top: 7px;
  transition: background-color 0.2s;
  border-radius: 5px;

  @media (min-width: 576px) and (max-width: 767px) {
    color: black;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
`;

const CartIcon = styled.div`
  img {
    margin-top: -4px;
    width: 22px;
    height: 22px;
  }

  @media (min-width: 576px) and (max-width: 767px) {
    img {
      width: 25px;
      height: 25px;
    }
  }
`;
