import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
const MenuLink = styled(NavLink)`
  padding: 0.8rem 1.6rem;
  border-radius: 0.4rem;
  color: var(--color-grey-900);
  text-decoration: none;

  &.active {
    background-color: var(--color-primary);
    color: #fff;
  }

  &:hover {
    background-color: var(--color-grey-200);
  }
`;


function Sidebar() {
  return (
      <StyledSidebar>
        <MenuLink to="/dashboard">일정 보기</MenuLink>
        <MenuLink to="/add">일정 추가</MenuLink>
        <MenuLink to="/important">중요 일정</MenuLink>
        <MenuLink to="/categories">카테고리</MenuLink>
        <MenuLink to="/settings">설정</MenuLink>
        <MenuLink to="/help">도움말/지원</MenuLink>
        <MenuLink to="/logout">로그아웃</MenuLink>
      </StyledSidebar>
  );
}

export default Sidebar;
