import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useLogout } from "@/features/authentication/useLogout.js";
import Button from "@/ui/Button.jsx";

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
  const { logout, isLoading } = useLogout();

  return (
    <StyledHeader>
      <Logo>MyApp</Logo>
      <Button onClick={() => logout()} disabled={isLoading}>
        logOut
      </Button>
    </StyledHeader>
  );
}

export default Header;
