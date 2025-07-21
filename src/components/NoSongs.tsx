import styled from "@emotion/styled";
import { Music } from "lucide-react";

const NoSongsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.card.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-width: 400px;
  width: 100%;
  margin: 2rem auto;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: ${({ theme }) => theme.colors.muted.background};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

const NoSongsContent = styled.div`
  text-align: center;
`;

const NoSongsTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.card.foreground};
  margin: 0;
`;

const NoSongsMessage = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.muted.foreground};
  margin: 0.5rem 0 0;
`;

export default function NoSongs() {
  return (
    <NoSongsContainer role="alert">
      <IconWrapper>
        <Music size={24} />
      </IconWrapper>
      <NoSongsContent>
        <NoSongsTitle>No Songs Found</NoSongsTitle>
        <NoSongsMessage>
          Looks like your song collection is empty. Add a new song to get started!
        </NoSongsMessage>
      </NoSongsContent>
    </NoSongsContainer>
  );
}