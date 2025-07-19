import { css, Global, useTheme } from "@emotion/react";
import { AppTheme } from "./config";

export const ThemeStyles = () => {
  const theme = useTheme() as AppTheme;
  return (
    <Global
      styles={css`
        body {
          background-color: ${theme.colors.background};
          color: ${theme.colors.foreground};
        }
      `}
    />
  );
};
