import { css } from "@emotion/react";
import styled from "@emotion/styled";
import AddSongModal from "./AddSongModal";
import SongFilters from "./SongFilters";
import { Button } from "./ui/Button";
import { useNavigate } from "react-router";

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

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Header = () => {
  const navigate = useNavigate();
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
          <HeaderActions>
            <AddSongModal />
            <Button
              variant="secondary"
              css={css`
                height: 36px;
              `}
              onClick={() => {
                navigate("/analytics");
              }}
            >
              View Analytics
            </Button>
          </HeaderActions>
        </div>

        <div
          css={css`
            margin: auto;
          `}
        >
          <SongFilters />
        </div>
      </HeaderContent>
    </HeaderContainer>
  );
};
