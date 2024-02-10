import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 2rem;
  color: var(--color-primary);
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
`;

const StyledNavLink = styled(NavLink)`
  color: var(--color-grey-900);
  text-decoration: none;

  &.active {
    font-weight: bold;
  }
`;

function Header() {
  return (
      <StyledHeader>
        <Logo>MyApp</Logo>
        <Nav>
          <StyledNavLink to="/home">홈</StyledNavLink>
          <StyledNavLink to="/schedule">일정 보기</StyledNavLink>
          <StyledNavLink to="/settings">설정</StyledNavLink>
        </Nav>
        <StyledNavLink to="/logout">로그아웃</StyledNavLink>
      </StyledHeader>
  );
}

export default Header;
