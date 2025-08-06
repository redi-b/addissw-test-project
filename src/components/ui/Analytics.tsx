import styled from "@emotion/styled";

export const ChartContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.card.background};
  color: ${({ theme }) => theme.colors.card.foreground};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.foreground};
  @media (max-width: 640px) {
    font-size: 1.125rem;
  }
`;

export const CustomTooltip = styled.div`
  background: ${({ theme }) => theme.colors.popover.background};
  color: ${({ theme }) => theme.colors.popover.foreground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing.xs};
  font-size: 0.85rem;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  line-height: 1.4;

  .label {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.accent.foreground};
    margin-bottom: 2px;
  }
  .value {
    color: ${({ theme }) => theme.colors.foreground};
    font-weight: 400;
  }
`;