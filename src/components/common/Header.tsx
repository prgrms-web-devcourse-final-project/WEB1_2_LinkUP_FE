import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import cart from '../../assets/icons/icon.png';
import logo from '../../assets/icons/goodbuyus-logo.svg';
import menu from '../../assets/icons/menu.svg';
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    setIsLoggedIn(!!token);

    // 관리자 여부 확인 (예: localStorage에서 'role'의 ADMIN 여부 확인)
    const adminStatus = localStorage.getItem('role') === 'ROLE_ADMIN';
    const userStatus = localStorage.getItem('role') === 'ROLE_USER';
    setIsAdmin(adminStatus);
    setIsUser(userStatus);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleAdminDropdown = () => {
    setIsAdminDropdownOpen((prev) => !prev);
  };

  const handleCommunityClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!isUser && !isAdmin) {
      e.preventDefault();
      alert('로그인 후 이용할 수 있는 페이지입니다.');
      setIsMobileMenuOpen(!isMobileMenuOpen);
    }
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
            <NavItem>
              <StyledLink to="/products" onClick={toggleMobileMenu}>
                Products
              </StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/mypage/notification" onClick={toggleMobileMenu}>
                Notifications
              </StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/community/post" onClick={handleCommunityClick}>
                Community
              </StyledLink>
            </NavItem>
            {isAdmin ? (
              <NavItem>
                <StyledLink
                  to="#"
                  onMouseEnter={toggleAdminDropdown}
                  onMouseLeave={toggleAdminDropdown}
                >
                  Admin Page
                </StyledLink>
                {isAdminDropdownOpen && (
                  <AdminMenu
                    onMouseEnter={toggleAdminDropdown}
                    onMouseLeave={toggleAdminDropdown}
                  >
                    <AdminDropdown>
                      <DropdownItem>
                        <StyledLink to="/admin/post">게시물 관리</StyledLink>
                      </DropdownItem>
                      <DropdownItem>
                        <StyledLink to="/admin/chatlist">
                          채팅방 관리
                        </StyledLink>
                      </DropdownItem>
                    </AdminDropdown>
                  </AdminMenu>
                )}
              </NavItem>
            ) : (
              <NavItem>
                <StyledLink to="/mypage/setting" onClick={toggleMobileMenu}>
                  My Page
                </StyledLink>
              </NavItem>
            )}
            {!isLoggedIn ? (
              <Login>
                <Link to="/signin" onClick={toggleMobileMenu}>
                  Login
                </Link>
              </Login>
            ) : (
              <>
                <LogOut>
                  <StyledLink to="/signout" onClick={toggleMobileMenu}>
                    LogOut
                  </StyledLink>
                </LogOut>
                <LogOut>
                  <CartIcon>
                    <StyledLink to="/cart" onClick={toggleMobileMenu}>
                      <img src={cart} alt="장바구니 아이콘" />
                    </StyledLink>
                  </CartIcon>
                </LogOut>
              </>
            )}{' '}
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
    border-radius: 8px;
  }

  @media (min-width: 576px) and (max-width: 767px) {
    width: 100%;
    text-align: center;

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
    margin-top: 4px;
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
  padding: 5px 12px;
  margin-top: 10px;
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
    width: 20px;
    height: 20px;
  }

  @media (min-width: 576px) and (max-width: 767px) {
    img {
      width: 25px;
      height: 25px;
    }
  }
`;

const AdminMenu = styled.li`
  position: relative;
  margin-left: 12.5px;
  a {
    font-weight: bold;
    padding: 5px 5px;
    border-radius: 5px;
    text-decoration: none;
    color: black;
  }

  &:hover {
    background-color: #f4f4f4;
  }
`;

const AdminDropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  list-style: none;
  margin: 0;
  padding: 10px 0;
  border-radius: 5px;
  transform: translateY(-10%); /* 추가로 위치 조정 */
  z-index: 10; /* 다른 요소 위로 표시 */
`;

const DropdownItem = styled.li`
  font-size: 0.9rem;

  a {
    text-decoration: none;
    color: black;
    display: block;
  }
`;
