import { useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";

import { RootState, AppDispatch } from "@/store";
import { getSongs, changePage, changePerPage } from "@/store/slices/songsSlice";
import SongCard from "@/components/SongCard";
import PaginationControls from "@/components/PaginationControls";
import { useSearchParams } from "react-router";
import { Header } from "@/components/Header";
import SongCardSkeleton from "@/components/SongCardSkeleton";
import ErrorCard from "@/components/ErrorCard";
import NoSongs from "@/components/NoSongs";

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
    const perPageParam = Number(searchParams.get("perPage")) || 5;

    if (!isNaN(pageParam)) dispatch(changePage(pageParam));
    if (!isNaN(perPageParam)) dispatch(changePerPage(perPageParam));
  }, []);

  useEffect(() => {
    if (page && perPage) {
      let params: Record<string, string> = {};
      if (page !== 1) params.page = page.toString();
      if (perPage !== 5) params.perPage = perPage.toString();
      setSearchParams(params);
    }
  }, [page, perPage]);

  useEffect(() => {
    dispatch(getSongs());
  }, [dispatch, page, perPage]);

  if (isLoading || error) {
    return (
      <div>
        <Header />
        <Container>
          {isLoading ? (
            <CardList>
              {Array.from({ length: perPage ?? 5 }).map((_, index) => (
                <SongCardSkeleton key={index} />
              ))}
            </CardList>
          ) : error ? (
            <ErrorCard message={error} onRetry={() => dispatch(getSongs())} />
          ) : (
            <p>Unexpected error occurred.</p>
          )}
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Header />

      <Container>
        {songs.length === 0 ? (
          <NoSongs />
        ) : (
          <div>
            <CardList>
              {songs.map((song) => (
                <SongCard
                  song={song}
                  key={song.id}
                  onEdit={(id) => console.log(`Edit song ${id}`)}
                  onDelete={(id) => console.log(`Delete song ${id}`)}
                />
              ))}
            </CardList>
            <PaginationControls />
          </div>
        )}
      </Container>
    </div>
  );
};

export default HomePage;
