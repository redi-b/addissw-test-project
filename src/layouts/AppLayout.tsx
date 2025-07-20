import styled from "@emotion/styled";
import { Outlet } from "react-router";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Music } from "lucide-react";
import { css } from "@emotion/react";

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};
  min-height: 100vh;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const AppLayout = () => {
  return (
    <Wrapper>
      <Navbar>
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 1rem;
          `}
        >
          <Music size={32} />
          <h1>Song Manager</h1>
        </div>
        <ThemeSwitcher />
      </Navbar>
      <Outlet />
    </Wrapper>
  );
};

export default AppLayout;
