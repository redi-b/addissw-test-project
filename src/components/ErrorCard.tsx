import styled from "@emotion/styled";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { css } from "@emotion/react";

type ErrorCardProps = {
  message?: string;
  onRetry?: () => void;
};

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.card.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-width: 400px;
  margin: 0 auto;
`;

const ErrorIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: ${({ theme }) => theme.colors.destructive.background};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.destructive.foreground};
`;

const ErrorContent = styled.div`
  text-align: center;
`;

const ErrorTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.card.foreground};
  margin: 0;
`;

const ErrorMessage = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.muted.foreground};
  margin: 0.5rem 0 0;
`;

const ErrorActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

export default function ErrorCard({
  message = "Failed to load song data. Please try again.",
  onRetry,
}: ErrorCardProps) {
  return (
    <ErrorContainer role="alert">
      <ErrorIconWrapper>
        <AlertTriangle size={24} aria-hidden="true" />
      </ErrorIconWrapper>
      <ErrorContent>
        <ErrorTitle>Error</ErrorTitle>
        <ErrorMessage>{message}</ErrorMessage>
      </ErrorContent>
      {onRetry && (
        <ErrorActions>
          <Button
            variant="primary"
            size="md"
            onClick={onRetry}
            title="Retry loading"
            css={css`
              font-size: 0.9rem;
            `}
          >
            Retry
          </Button>
        </ErrorActions>
      )}
    </ErrorContainer>
  );
}
