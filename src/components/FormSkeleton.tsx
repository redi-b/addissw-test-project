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

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 0.5rem;
`;

const SkeletonLabel = styled.div`
  width: 100px;
  height: 20px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: linear-gradient(
    90deg,
    ${({ theme }) =>
        theme.colors.skeleton?.base || theme.colors.muted.foreground}
      25%,
    ${({ theme }) =>
        theme.colors.skeleton?.highlight || theme.colors.card.background}
      50%,
    ${({ theme }) =>
        theme.colors.skeleton?.base || theme.colors.muted.foreground}
      75%
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const SkeletonInput = styled.div`
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: linear-gradient(
    90deg,
    ${({ theme }) =>
        theme.colors.skeleton?.base || theme.colors.muted.foreground}
      25%,
    ${({ theme }) =>
        theme.colors.skeleton?.highlight || theme.colors.card.background}
      50%,
    ${({ theme }) =>
        theme.colors.skeleton?.base || theme.colors.muted.foreground}
      75%
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
`;

const SkeletonButton = styled.div`
  width: 100%;
  height: 36px;
  align-self: flex-end;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: linear-gradient(
    90deg,
    ${({ theme }) =>
        theme.colors.skeleton?.base || theme.colors.muted.foreground}
      25%,
    ${({ theme }) =>
        theme.colors.skeleton?.highlight || theme.colors.card.background}
      50%,
    ${({ theme }) =>
        theme.colors.skeleton?.base || theme.colors.muted.foreground}
      75%
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
`;

export default function FormSkeleton() {
  return (
    <SkeletonWrapper>
      <div>
        <SkeletonLabel />
        <SkeletonInput />
      </div>
      <div>
        <SkeletonLabel />
        <SkeletonInput />
      </div>
      <div>
        <SkeletonLabel />
        <SkeletonInput />
      </div>
      <SkeletonButton />
    </SkeletonWrapper>
  );
}
