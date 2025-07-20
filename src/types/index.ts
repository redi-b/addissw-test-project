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
