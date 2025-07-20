import { useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";

import { RootState, AppDispatch } from "@/store";
import { getSongs, changePage, changePerPage } from "@/store/slices/songsSlice";
import SongCard from "@/components/SongCard";
import { css } from "@emotion/react";
import PaginationControls from "@/components/PaginationControls";
import { useSearchParams } from "react-router";
import { Header } from "@/components/Header";

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { songs, page, perPage } = useSelector(
    (state: RootState) => state.songs
  );
  const isLoading = useSelector(
    (state: RootState) => state.songs.status.getSongs === "loading"
  );
  const error = useSelector((state: RootState) => state.songs.errors.getSongs);

  const [searchParams, setSearchParams] = useSearchParams();

  useLayoutEffect(() => {
    const pageParam = Number(searchParams.get("page")) || 1;
    const perPageParam = Number(searchParams.get("perPage")) || 10;

    if (!isNaN(pageParam)) dispatch(changePage(pageParam));
    if (!isNaN(perPageParam)) dispatch(changePerPage(perPageParam));
  }, []);

  useEffect(() => {
      let params: Record<string, string> = {};
      if (page !== 1) params.page = page.toString();
      if (perPage !== 10) params.perPage = perPage.toString();
      setSearchParams(params);
  }, [page, perPage]);

  useEffect(() => {
    dispatch(getSongs());
  }, [dispatch, page, perPage]);

  if (isLoading || error) {
    return (
      <div>
        <Header />
        <Container>
          <p>{isLoading ? "Loading songs..." : `Error: ${error}`}</p>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Header />

      <Container>
        {songs.length === 0 ? (
          <p>No songs found.</p>
        ) : (
          <div>
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
            <PaginationControls />
          </div>
        )}
      </Container>
    </div>
  );
};

export default HomePage;
