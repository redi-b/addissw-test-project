import styled from "@emotion/styled";
import { Frown } from "lucide-react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/Button";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 68px); /* Adjust for header height */
  background: ${({ theme }) => theme.colors.background};
  padding: 2rem;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.card.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-width: 500px;
  width: 100%;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: ${({ theme }) => theme.colors.muted.background};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

const ErrorTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.card.foreground};
  margin: 0;
  text-align: center;
`;

const ErrorMessage = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.muted.foreground};
  margin: 0.5rem 0 0;
  text-align: center;
`;

const ErrorActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <ErrorContainer role="alert">
        <IconWrapper>
          <Frown size={32} aria-hidden="true" />
        </IconWrapper>
        <ErrorTitle>404 Not Found</ErrorTitle>
        <ErrorMessage>
          Oops! The page you're looking for doesn't exist or has been moved.
        </ErrorMessage>
        <ErrorActions>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate("/")}
            title="Go back to home"
          >
            Back to Home
          </Button>
        </ErrorActions>
      </ErrorContainer>
    </PageContainer>
  );
}