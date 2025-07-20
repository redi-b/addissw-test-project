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
