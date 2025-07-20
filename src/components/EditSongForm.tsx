import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import type { RootState } from "@/store";
import { updateSong } from "@/store/slices/songsSlice";
import type { Song, UpdateSongPayload } from "@/types";

const Form = styled.form`
  margin: ${({ theme }) => theme.spacing.xs} auto;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Label = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.muted.foreground};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  background: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.muted.foreground};
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.background};
    outline: none;
  }

  &::placeholder {
    color: #aaa;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  background-color: ${({ theme }) => theme.colors.primary.background};
  color: ${({ theme }) => theme.colors.primary.foreground};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.hover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.muted.background};
    cursor: not-allowed;
  }
`;

const Status = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-align: center;

  &.success {
    color: ${({ theme }) => theme.colors.accent.foreground};
  }

  &.error {
    color: ${({ theme }) => theme.colors.destructive.background};
  }
`;

interface Props {
  song: Song;
  onClose?: () => void;
}

export default function EditSongForm({ song, onClose }: Props) {
  const dispatch = useDispatch();
  const status = useSelector(
    (state: RootState) => state.songs.status.updateSong
  );
  const error = useSelector(
    (state: RootState) => state.songs.errors.updateSong
  );

  const [formData, setFormData] = useState<UpdateSongPayload>({
    id: song.id,
    title: song.title,
    artist: song.artist,
    album: song.album ?? "",
    year: Number(song.year) ?? undefined,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: UpdateSongPayload = {
        id: song.id,
        title: formData.title?.trim(),
        artist: formData.artist?.trim(),
        album: formData.album?.trim() || undefined,
        year: formData.year
          ? parseInt(formData.year.toString(), 10)
          : undefined,
      };
      dispatch(updateSong(payload));
      setSubmitted(true);
    } catch (err) {
      console.error("Error updating song:", err);
    }
  };

  useEffect(() => {
    if (submitted && status === "success") {
      onClose?.();
    }
  }, [submitted, status, onClose]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="artist">Artist</Label>
        <Input
          id="artist"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="album">Album (optional)</Label>
        <Input
          id="album"
          name="album"
          value={formData.album ?? ""}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="year">Year (optional)</Label>
        <Input
          id="year"
          name="year"
          type="number"
          min={1900}
          max={new Date().getFullYear()}
          step="1"
          placeholder="e.g. 2023"
          value={formData.year ?? ""}
          onChange={handleChange}
        />
      </FormGroup>

      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Updating..." : "Update Song"}
      </Button>

      {status === "success" && (
        <Status className="success">Song updated successfully!</Status>
      )}
      {status === "error" && (
        <Status className="error">{error || "Something went wrong."}</Status>
      )}
    </Form>
  );
}
