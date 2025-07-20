import styled from "@emotion/styled";
import * as Dialog from "@radix-ui/react-dialog";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`;

const fadeOut = keyframes`
  from { opacity: 1 }
  to { opacity: 0 }
`;

const scaleIn = keyframes`
  from { transform: translate(-50%, -48%) scale(0.95); opacity: 0 }
  to { transform: translate(-50%, -50%) scale(1); opacity: 1 }
`;

const scaleOut = keyframes`
  from { transform: translate(-50%, -50%) scale(1); opacity: 1 }
  to { transform: translate(-50%, -48%) scale(0.95); opacity: 0 }
`;

export const Overlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
  animation: ${fadeIn} 200ms ease-out;
  &[data-state="closed"] {
    animation: ${fadeOut} 150ms ease-in;
  }
`;

export const Content = styled(Dialog.Content)`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  position: fixed;
  top: 50%;
  left: 50%;
  width: 90%;
  max-width: 500px;
  transform: translate(-50%, -50%);
  animation: ${scaleIn} 200ms ease-out;
  &[data-state="closed"] {
    animation: ${scaleOut} 150ms ease-in;
  }
`;

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  font-size: 1.25rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.muted.foreground};

  &:hover {
    color: ${({ theme }) => theme.colors.foreground};
  }
`;

export const Title = styled(Dialog.Title)`
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: bold;
`;

export const Description = styled(Dialog.Description)`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.muted.foreground};
`;
