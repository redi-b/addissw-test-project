import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";

import { RootState, AppDispatch } from "@/store";
import { getSongs, deleteSong } from "@/store/slices/songsSlice";
import AddSongModal from "@/components/AddSongModal";

const Container = styled.main`
  max-width: 960px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
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
    <Container>
      <Header>
        <Title>Songs</Title>
        <AddSongModal />
      </Header>

      {isLoading && <p>Loading songs...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {songs.length === 0 ? (
        <p>No songs found.</p>
      ) : (
        songs.map((song) => (
          // TODO: replace with actual song card later
          <div key={song.id}>
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
          </div>
        ))
      )}
    </Container>
  );
};

export default HomePage;
