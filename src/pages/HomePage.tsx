import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";

import { RootState, AppDispatch } from "@/store";
import { getSongs, deleteSong } from "@/store/slices/songsSlice";
import AddSongModal from "@/components/AddSongModal";
import SongCard from "@/components/SongCard";
import { css } from "@emotion/react";

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  margin-top: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
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

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { songs, status, errors } = useSelector(
    (state: RootState) => state.songs
  );

  const page = Number(1);
  const perPage = Number(10);

  useEffect(() => {
    dispatch(getSongs({ page, perPage }));
  }, [dispatch, page, perPage]);

  const isLoading = status.getSongs === "loading";
  const error = errors.getSongs;

  return (
    <div>
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

      <Container>
        {isLoading && <p>Loading songs...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        {songs.length === 0 ? (
          <p>No songs found.</p>
        ) : (
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 1rem;
            `}
          >
            {songs.map((song) => (
              <SongCard
                song={song}
                key={song.id}
                onEdit={(id) => console.log(`Edit song ${id}`)}
                onDelete={(id) => console.log(`Delete song ${id}`)}
              />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default HomePage;
