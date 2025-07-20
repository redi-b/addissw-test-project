import styled from "@emotion/styled";
import { Outlet } from "react-router";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Music } from "lucide-react";
import { css, useTheme } from "@emotion/react";
import { Toaster } from "sonner";
import { useThemeMode } from "@/contexts/ThemeContext";

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
  const theme = useTheme();
  const { themeMode } = useThemeMode();

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
      <Toaster
        theme={themeMode}
        position="top-center"
        toastOptions={{
          style: {
            background: theme.colors.card.background,
            color: theme.colors.card.foreground,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: "8px",
            padding: "12px 16px",
            fontFamily: "inherit",
            fontSize: "14px",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          },
          className: "sonner-toast",
          duration: 4000,
        }}
      />
    </Wrapper>
  );
};

export default AppLayout;
