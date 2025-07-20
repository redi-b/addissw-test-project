import styled from "@emotion/styled";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { keyframes } from "@emotion/react";
import { AppTheme } from "@/theme/config";

// Animations
const slideUpAndFade = keyframes`
  from { opacity: 0; transform: translateY(2px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const slideDownAndFade = keyframes`
  from { opacity: 0; transform: translateY(-2px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const slideLeftAndFade = keyframes`
  from { opacity: 0; transform: translateX(2px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const slideRightAndFade = keyframes`
  from { opacity: 0; transform: translateX(-2px); }
  to   { opacity: 1; transform: translateX(0); }
`;

export const Root = DropdownMenu.Root;
export const Trigger = DropdownMenu.Trigger;
export const Portal = DropdownMenu.Portal;

export const Content = styled(DropdownMenu.Content)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  min-width: 200px;
  background-color: ${({ theme }) => theme.colors.popover};
  color: ${({ theme }) => theme.colors.popoverForeground};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  padding: ${({ theme }) => theme.spacing.sm};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  animation-duration: 200ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;

  &[data-side="top"] {
    animation-name: ${slideDownAndFade};
  }
  &[data-side="right"] {
    animation-name: ${slideLeftAndFade};
  }
  &[data-side="bottom"] {
    animation-name: ${slideUpAndFade};
  }
  &[data-side="left"] {
    animation-name: ${slideRightAndFade};
  }
`;

export const Item = styled(DropdownMenu.Item)`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  outline: none;
  color: ${({ theme }) => theme.colors.foreground};
  cursor: pointer;
  user-select: none;
  transition: background-color 0.15s ease;

  &[data-highlighted] {
    background-color: ${({ theme }) => theme.colors.accent.background};
    color: ${({ theme }) => theme.colors.accent.foreground};
  }

  &[data-disabled] {
    color: ${({ theme }) => theme.colors.muted.foreground};
    pointer-events: none;
  }
`;

export const Separator = styled(DropdownMenu.Separator)`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => `${theme.spacing.xs} 0`};
`;

export const Arrow = styled(DropdownMenu.Arrow)`
  fill: ${({ theme }) => theme.colors.popover};
`;

export const RightSlot = styled("div")`
  margin-left: auto;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.muted.foreground};

  [data-highlighted] & {
    color: ${({ theme }) => theme.colors.primary.foreground};
  }

  [data-disabled] & {
    color: ${({ theme }) => theme.colors.muted.foreground};
  }
`;
