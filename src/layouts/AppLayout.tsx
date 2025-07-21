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

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => `${theme.spacing.md}`};
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  h1 {
    font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    gap: ${({ theme }) => theme.spacing.sm};

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: ${({ theme }) => theme.typography.fontSize.xl};
    }
  }

  svg {
    width: 32px;
    height: 32px;

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      width: 24px;
      height: 24px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const AppLayout = () => {
  const theme = useTheme();
  const { themeMode } = useThemeMode();

  return (
    <Wrapper>
      <Navbar>
        <Brand>
          <Music />
          <h1>Song Manager</h1>
        </Brand>
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
