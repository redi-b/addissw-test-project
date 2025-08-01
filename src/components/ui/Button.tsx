import styled from "@emotion/styled";

type Variant = "primary" | "secondary" | "destructive";
type Size = "sm" | "md";

type Props = {
  variant?: Variant;
  size?: Size;
};

export const Button = styled.button<Props>(
  ({ theme, variant = "primary", size = "md" }) => {
    const v = theme.colors[variant];
    const padding = size === "sm" ? "4px 10px" : "8px 16px";

    return {
      backgroundColor: v.background,
      color: v.foreground,
      border: "none",
      borderRadius: theme.borderRadius.md,
      padding,
      fontWeight: 500,
      cursor: "pointer",
      fontSize: size === "sm" ? "0.875rem" : "1rem",
      transition: "background-color 0.2s",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "&:hover": {
        backgroundColor: v.hover,
      },
      "&:active": {
        backgroundColor: v.active,
      },
      "&:disabled": {
        opacity: 0.6,
        cursor: "not-allowed",
      },
    };
  }
);

export const ActionButton = styled.button`
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.secondary.background};
  color: ${({ theme }) => theme.colors.secondary.foreground};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-weight: 700;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary.hover};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    span {
      display: none;
    }
  }
`;
