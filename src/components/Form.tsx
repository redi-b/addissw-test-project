import styled from "@emotion/styled";

export const Form = styled.form`
  margin: ${({ theme }) => theme.spacing.xs} auto;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
`;

export const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Label = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.muted.foreground};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  background: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.muted.foreground};
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.background};
    outline: none;
  }

  &::placeholder {
    color: #aaa;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  background-color: ${({ theme }) => theme.colors.primary.background};
  color: ${({ theme }) => theme.colors.primary.foreground};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme.colors.primary.hover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const FormCard = styled.div`
  background: ${({ theme }) => theme.colors.card.background};
  padding: 1rem 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  min-width: 340px;
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const FormIcon = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: center;

  svg {
    width: 32px;
    height: 32px;

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      width: 24px;
      height: 24px;
    }
  }
`;

export const FormFooter = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.muted.foreground};
  text-align: center;
  margin-top: 1.5rem;

  a {
    color: ${({ theme }) => theme.colors.primary.foreground};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const FormError = styled.p`
  color: ${({ theme }) => theme.colors.destructive.background};
  font-size: 0.85rem;
  margin-top: -0.5rem;
  margin-bottom: 0.75rem;
`;