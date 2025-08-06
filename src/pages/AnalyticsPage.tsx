import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";

import { AppDispatch, RootState } from "@/store";

import {
  fetchSongsPerArtist,
  fetchSongsPerYear,
  fetchMonthlySongCreation,
  fetchTopAlbums,
} from "@/store/slices/analyticsSlice";

import ArtistChart from "@/components/ArtistChart";
import YearChart from "@/components/YearChart";
import MonthlyChart from "@/components/MonthlyChart";
import TopAlbumsChart from "@/components/TopAlbumsChart";
import { useTheme } from "@emotion/react";

const Container = styled.div`
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 95vw;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 90vw;
  }

`;

const ChartGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  grid-template-columns: 1fr;
  margin-top: ${({ theme }) => theme.spacing.lg};

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Section = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.card.background};
  color: ${({ theme }) => theme.colors.card.foreground};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.foreground};
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.destructive.foreground};
  background: ${({ theme }) => theme.colors.destructive.background};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: bold;
`;

const LoadingMessage = styled.p`
  color: ${({ theme }) => theme.colors.muted.foreground};
  padding: ${({ theme }) => theme.spacing.sm};
`;

const AnalyticsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { songsPerArtist, songsPerYear, monthlySongCreation, topAlbums } =
    useSelector((state: RootState) => state.analytics);

  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchSongsPerArtist());
    dispatch(fetchSongsPerYear());
    dispatch(fetchMonthlySongCreation());
    dispatch(fetchTopAlbums());
  }, [dispatch]);

  return (
    <Container>
      <Title>Analytics Dashboard</Title>
      <ChartGrid>
        <Section>
          {songsPerArtist.status === "loading" ? (
            <LoadingMessage>Loading...</LoadingMessage>
          ) : songsPerArtist.error ? (
            <ErrorMessage>{songsPerArtist.error}</ErrorMessage>
          ) : (
            <ArtistChart data={songsPerArtist.data} theme={theme} />
          )}
        </Section>

        <Section>
          {songsPerYear.status === "loading" ? (
            <LoadingMessage>Loading...</LoadingMessage>
          ) : songsPerYear.error ? (
            <ErrorMessage>{songsPerYear.error}</ErrorMessage>
          ) : (
            <YearChart data={songsPerYear.data} theme={theme} />
          )}
        </Section>

        <Section>
          {monthlySongCreation.status === "loading" ? (
            <LoadingMessage>Loading...</LoadingMessage>
          ) : monthlySongCreation.error ? (
            <ErrorMessage>{monthlySongCreation.error}</ErrorMessage>
          ) : (
            <MonthlyChart data={monthlySongCreation.data} theme={theme} />
          )}
        </Section>

        <Section>
          {topAlbums.status === "loading" ? (
            <LoadingMessage>Loading...</LoadingMessage>
          ) : topAlbums.error ? (
            <ErrorMessage>{topAlbums.error}</ErrorMessage>
          ) : (
            <TopAlbumsChart data={topAlbums.data} theme={theme} />
          )}
        </Section>
      </ChartGrid>
    </Container>
  );
};

export default AnalyticsPage;
