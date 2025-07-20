import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
`;

const SkeletonCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.card.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SkeletonImage = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.skeleton?.base || theme.colors.muted.foreground} 25%,
    ${({ theme }) => theme.colors.skeleton?.highlight || theme.colors.card.background} 50%,
    ${({ theme }) => theme.colors.skeleton?.base || theme.colors.muted.foreground} 75%
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const SkeletonContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const SkeletonText = styled.div<{ width?: string }>`
  height: 16px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.skeleton?.base || theme.colors.muted.foreground} 25%,
    ${({ theme }) => theme.colors.skeleton?.highlight || theme.colors.card.background} 50%,
    ${({ theme }) => theme.colors.skeleton?.base || theme.colors.muted.foreground} 75%
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
  margin: 0.25rem 0;
  width: ${({ width }) => width || "100%"};
`;

const SkeletonActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SkeletonButton = styled.div`
  width: 36px;
  height: 36px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.skeleton?.base || theme.colors.muted.foreground} 25%,
    ${({ theme }) => theme.colors.skeleton?.highlight || theme.colors.card.background} 50%,
    ${({ theme }) => theme.colors.skeleton?.base || theme.colors.muted.foreground} 75%
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;

export default function SongCardSkeleton() {
  return (
    <SkeletonCard>
      <SkeletonImage />
      <SkeletonContent>
        <SkeletonText width="60%" />
        <SkeletonText width="80%" />
      </SkeletonContent>
      <SkeletonActions>
        <SkeletonButton />
        <SkeletonButton />
      </SkeletonActions>
    </SkeletonCard>
  );
}
