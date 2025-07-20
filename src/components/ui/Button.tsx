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
