import { css } from "@emotion/react";
import styled from "@emotion/styled";
import AddSongModal from "./AddSongModal";

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  margin-top: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
  z-index: 10;
`;

const HeaderContent = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md} 0;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
`;

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <Title>Songs</Title>
          <AddSongModal />
        </div>

        {/* TODO: Add Filters Here */}
      </HeaderContent>
    </HeaderContainer>
  );
};
