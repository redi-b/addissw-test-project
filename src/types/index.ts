export type Song = {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: string;
};

export type SongsData = {
  songs: Song[];
  total: number;
};

export type CreateSongPayload = {
  title: string;
  artist: string;
  album?: string;
  year?: number;
};

export type UpdateSongPayload = {
  id: string;
  title?: string;
  artist?: string;
  album?: string;
  year?: number;
};

export type UserData = {
  id: string;
  username: string;
};

export type ArtistCount = {
  artist: string;
  count: number;
};

export type YearCount = {
  year: number;
  count: number;
};

export type MonthlyCount = {
  year: number;
  month: number;
  count: number;
};

export type AlbumCount = {
  album: string;
  count: number;
};

export type SongsPerArtistPayload = ArtistCount[];
export type SongsPerYearPayload = YearCount[];
export type MonthlySongCreationPayload = MonthlyCount[];
export type TopAlbumsPayload = AlbumCount[];
